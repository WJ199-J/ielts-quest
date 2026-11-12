/* Account-scoped progress synchronization with local-first fallback. */
(function () {
  "use strict";
  const STORAGE_KEY = "ieltsQuestV1";
  const CURRENT_KEY = "ieltsQuestCurrentMission";
  const TABLE = "user_progress";
  const USER_CONFIRMED_COMPLETIONS = new Set([2, 3]);
  let timer = 0;
  let syncing = false;
  let queued = false;

  function emptyState() { return { missions: {}, words: {}, units: {} }; }
  function restoreConfirmedCompletion(id, state = {}) {
    if (USER_CONFIRMED_COMPLETIONS.has(Number(id)) && Number(state.bestScore) === 100 && !state.completionRuleVersion && !state.completionMethod) {
      state.completed = true;
      state.completionMethod = "user-confirmed-legacy-completion";
    }
    return state;
  }
  function isFormalCompletion(state = {}) {
    return state.completed === true && ["first-submit-100", "user-confirmed-legacy-completion"].includes(state.completionMethod);
  }
  function readState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const state = value && typeof value === "object"
        ? { missions: value.missions || {}, words: value.words || {}, units: value.units || {} }
        : emptyState();
      Object.entries(state.missions).forEach(([id, mission]) => restoreConfirmedCompletion(id, mission));
      return state;
    } catch (_) { return emptyState(); }
  }
  function writeState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function mergeMission(id, local = {}, remote = {}) {
    restoreConfirmedCompletion(id, local);
    restoreConfirmedCompletion(id, remote);
    const localAttempts = Number(local.attempts) || 0;
    const remoteAttempts = Number(remote.attempts) || 0;
    const localComplete = isFormalCompletion(local);
    const remoteComplete = isFormalCompletion(remote);
    const completed = localComplete || remoteComplete;
    const completedAt = String(local.completedAt || "") >= String(remote.completedAt || "")
      ? (localComplete ? local.completedAt || null : remoteComplete ? remote.completedAt || null : null)
      : (remoteComplete ? remote.completedAt || null : localComplete ? local.completedAt || null : null);
    return {
      bestScore: Math.max(Number(local.bestScore) || 0, Number(remote.bestScore) || 0),
      attempts: Math.max(localAttempts, remoteAttempts),
      completionRuleVersion: Math.max(Number(local.completionRuleVersion) || 0, Number(remote.completionRuleVersion) || 0),
      completed,
      completionMethod: completed ? (localComplete ? local.completionMethod : remote.completionMethod) : null,
      completedAt: completed ? completedAt : null,
      lastScore: localAttempts >= remoteAttempts
        ? Number(local.lastScore) || 0
        : Number(remote.lastScore) || 0
    };
  }
  function mergeWord(local = {}, remote = {}) {
    const localSeen = Number(local.seen) || 0;
    const remoteSeen = Number(remote.seen) || 0;
    const recent = String(local.lastSeen || "") >= String(remote.lastSeen || "") ? local : remote;
    return {
      seen: Math.max(localSeen, remoteSeen),
      correct: Math.max(Number(local.correct) || 0, Number(remote.correct) || 0),
      wrong: Math.max(Number(local.wrong) || 0, Number(remote.wrong) || 0),
      streak: Math.max(Number(local.streak) || 0, Number(remote.streak) || 0),
      mastery: recent.mastery || "new",
      lastSeen: recent.lastSeen || null
    };
  }
  function mergeUnit(local = {}, remote = {}) {
    const localAttempts = Number(local.attempts) || 0;
    const remoteAttempts = Number(remote.attempts) || 0;
    const localComplete = local.completed === true && local.completionMethod === "first-submit-100";
    const remoteComplete = remote.completed === true && remote.completionMethod === "first-submit-100";
    const completed = localComplete || remoteComplete;
    const selected = localAttempts >= remoteAttempts ? local : remote;
    return {
      bestScore: Math.max(Number(local.bestScore) || 0, Number(remote.bestScore) || 0),
      attempts: Math.max(localAttempts, remoteAttempts),
      lastScore: Number(selected.lastScore) || 0,
      completed,
      completionMethod: completed ? "first-submit-100" : null,
      completedAt: completed ? (local.completedAt || remote.completedAt || null) : null
    };
  }
  function mergeState(local, remote) {
    const merged = emptyState();
    const missionIds = new Set([...Object.keys(remote?.missions || {}), ...Object.keys(local?.missions || {})]);
    missionIds.forEach(id => { merged.missions[id] = mergeMission(id, local?.missions?.[id], remote?.missions?.[id]); });
    const words = new Set([...Object.keys(remote?.words || {}), ...Object.keys(local?.words || {})]);
    words.forEach(word => { merged.words[word] = mergeWord(local?.words?.[word], remote?.words?.[word]); });
    const unitIds = new Set([...Object.keys(remote?.units || {}), ...Object.keys(local?.units || {})]);
    unitIds.forEach(id => { merged.units[id] = mergeUnit(local?.units?.[id], remote?.units?.[id]); });
    return merged;
  }
  function setStatus(text, synced) {
    const status = document.querySelector(".sync-status");
    if (status) {
      const dot = status.querySelector(".status-dot");
      status.lastChild.textContent = text;
      if (dot) dot.style.background = synced ? "#17845f" : "";
    }
    const description = document.getElementById("accountDescription");
    if (description && synced) description.textContent = "学习进度已绑定当前账号，并保留本设备副本。";
  }
  function applyMergedState(before, after) {
    if (JSON.stringify(before) !== JSON.stringify(after)) writeState(after);
  }

  async function syncNow() {
    if (syncing) { queued = true; return; }
    syncing = true;
    try {
      const client = await window.IELTS_QUEST_AUTH.getClient();
      const { data: sessionData, error: sessionError } = await client.auth.getSession();
      if (sessionError) throw sessionError;
      const user = sessionData.session?.user;
      if (!user) { setStatus("进度已保存在本设备", false); return; }

      const local = readState();
      const { data: remote, error: readError } = await client
        .from(TABLE)
        .select("state,current_mission")
        .eq("user_id", user.id)
        .maybeSingle();
      if (readError) throw readError;

      const merged = mergeState(local, remote?.state || emptyState());
      const localCurrent = Number(localStorage.getItem(CURRENT_KEY)) || null;
      const currentMission = localCurrent || Number(remote?.current_mission) || null;
      const { error: writeError } = await client.from(TABLE).upsert({
        user_id: user.id,
        state: merged,
        current_mission: currentMission,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" });
      if (writeError) throw writeError;

      if (currentMission) localStorage.setItem(CURRENT_KEY, String(currentMission));
      setStatus("进度已同步至账号", true);
      applyMergedState(local, merged);
      window.dispatchEvent(new CustomEvent("ieltsquest:progress-synced"));
    } catch (error) {
      console.warn("IELTS Quest cloud sync unavailable; local progress remains active.", error);
      setStatus("云端同步暂不可用，本机记录未受影响", false);
    } finally {
      syncing = false;
      if (queued) { queued = false; schedule(200); }
    }
  }
  function schedule(delay = 700) {
    clearTimeout(timer);
    timer = window.setTimeout(syncNow, delay);
  }

  window.IELTS_QUEST_SYNC = Object.freeze({ schedule, syncNow });
  window.addEventListener("ieltsquest:auth-change", () => schedule(0));
  schedule(0);
})();
