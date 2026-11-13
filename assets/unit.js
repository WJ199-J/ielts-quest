(function () {
  "use strict";
  const STORAGE_KEY = "ieltsQuestV1";
  const THEME_KEY = "ieltsQuestTheme";
  const missions = window.IELTS_QUEST_MISSIONS || [];
  const units = window.IELTS_QUEST_UNITS || [];
  const chapter = Number(new URLSearchParams(location.search).get("chapter")) || 1;
  const unit = units.find(item => item.chapter === chapter) || units[0];
  const unitMissions = missions.filter(item => unit?.missionIds.includes(item.id));
  let state = readState();
  let quiz = readQuiz();

  function emptyState() { return { missions: {}, words: {}, units: {} }; }
  function readState() {
    try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY)); return value && typeof value === "object" ? { missions: value.missions || {}, words: value.words || {}, units: value.units || {} } : emptyState(); }
    catch (_) { return emptyState(); }
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); window.IELTS_QUEST_SYNC?.schedule(); }
  function quizKey() { return `ieltsQuestUnitQuizV1:${unit?.id || "unknown"}`; }
  function readQuiz() { try { return JSON.parse(localStorage.getItem(quizKey())) || null; } catch (_) { return null; } }
  function saveQuiz() { try { localStorage.setItem(quizKey(), JSON.stringify(quiz)); document.getElementById("quizSave").textContent = "作答痕迹已保存在本设备，刷新后可继续。"; } catch (_) { document.getElementById("quizSave").textContent = "本设备存储空间不足，作答痕迹暂未保存。"; } }
  function isMissionComplete(mission) { const item = state.missions?.[mission.id] || {}; return item.completed === true && ["first-submit-100", "user-confirmed-legacy-completion"].includes(item.completionMethod); }
  function escapeHtml(value) { return String(value || "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function normalize(value) { return String(value || "").trim().toLowerCase().replace(/[.,!?;:'"]/g, ""); }
  function shuffle(items) { const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
  function candidates() {
    const seen = new Set();
    const result = [];
    unitMissions.forEach(mission => (mission.newCoreWords || []).forEach(info => {
      const key = String(info.word || "").toLowerCase();
      if (!key || seen.has(key)) return;
      const pattern = window.IELTS_QUEST_VOCABULARY.pattern(info, "i");
      const sentence = mission.story.find(item => pattern.test(item.en));
      if (!sentence) return;
      const match = sentence.en.match(window.IELTS_QUEST_VOCABULARY.pattern(info, "i"));
      if (!match) return;
      seen.add(key);
      result.push({ key, word: info.word, answers: [...new Set([info.word, ...(info.answers || []), match[0]])], surface: match[0], meaning: info.meaning || "", missionId: mission.id, missionTitle: mission.titleZh || mission.title, sentence: sentence.en, translation: sentence.zh });
    }));
    (unit.supplementalItems || []).forEach(info => {
      const key = String(info.word || "").toLowerCase();
      if (!key || seen.has(key) || !info.example) return;
      const match = info.example.match(window.IELTS_QUEST_VOCABULARY.pattern(info, "i"));
      if (!match) return;
      seen.add(key);
      result.push({ key, word: info.word, answers: [...new Set([info.word, ...(info.answers || []), match[0]])], surface: match[0], meaning: info.meaning || "", missionId: "Unit", missionTitle: "原书扩展词汇", sentence: info.example, translation: info.translation || "" });
    });
    return result;
  }
  function applyTheme(theme) { document.documentElement.dataset.theme = theme; localStorage.setItem(THEME_KEY, theme); document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#101815" : "#f7f4ed"); }
  function setupTheme() { applyTheme(localStorage.getItem(THEME_KEY) || "light"); document.getElementById("themeToggle").onclick = () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); }

  function renderOverview() {
    if (!unit) return;
    document.title = `IELTS Quest · ${unit.titleZh}单元测验`;
    document.getElementById("unitLabel").textContent = `CHAPTER ${unit.chapter} · UNIT 01`;
    document.getElementById("unitTitle").textContent = `${unit.titleZh} · ${unit.title}`;
    document.getElementById("coverageCount").textContent = `${unit.itemCount} / ${unit.targetItemCount}`;
    document.getElementById("coverageState").textContent = unit.contentReady ? "已达到约 100 项门槛" : `还差 ${unit.gapToTarget} 项`;
    const completed = unitMissions.filter(isMissionComplete).length;
    document.getElementById("missionProgress").textContent = `${completed} / ${unitMissions.length} 已完成`;
    document.getElementById("unitMissionList").innerHTML = unitMissions.map((mission,index) => {
      const complete = isMissionComplete(mission); const best = Number(state.missions?.[mission.id]?.bestScore) || 0;
      return `<div class="unit-mission ${complete ? "complete" : ""}"><span>${complete ? "✓" : String(index + 1).padStart(2,"0")}</span><div><strong>${escapeHtml(mission.titleZh || mission.title)}</strong><small>${mission.newCoreWords.length} 个新词${best ? ` · 最高 ${best}%` : ""}</small></div><a href="mission.html?id=${mission.id}">${complete ? "复习" : "学习"}</a></div>`;
    }).join("");
    const supplement = unit.supplementalItems || [];
    document.getElementById("unitSupplement").classList.toggle("hidden", supplement.length === 0);
    document.getElementById("supplementCount").textContent = `${supplement.length} 项`;
    document.getElementById("supplementGrid").innerHTML = supplement.map(item => `<article class="supplement-item"><div><strong>${escapeHtml(item.word)}</strong><span>${escapeHtml(item.ipa)} · ${escapeHtml(item.pos)}</span></div><p>${escapeHtml(item.meaning)}</p><small>${escapeHtml(item.example)}</small><em>原书第 ${item.sourcePage} 页</em></article>`).join("");
    const allComplete = unitMissions.length > 0 && completed === unitMissions.length;
    const button = document.getElementById("startUnitQuiz");
    if (!unit.contentReady) { document.getElementById("checkpointNote").textContent = `当前只有 ${unit.itemCount} 个不重复学习项，还需补齐 ${unit.gapToTarget} 项。`; button.textContent = "内容补齐后开放"; button.disabled = true; }
    else if (!allComplete) { document.getElementById("checkpointNote").textContent = `学习项数量已达标；完成剩余 ${unitMissions.length - completed} 个 Mission 后解锁。`; button.textContent = "完成全部 Mission 后解锁"; button.disabled = true; }
    else { document.getElementById("checkpointNote").textContent = "已满足覆盖与学习条件，可随机抽取 50 题。"; button.textContent = quiz ? "继续本轮测验" : "开始 50 题测验"; button.disabled = false; button.onclick = () => startQuiz(false); }
    const status = state.units?.[unit.id] || {};
    if (status.completed && status.completionMethod === "first-submit-100") document.getElementById("unitWarning").textContent = `本单元已正式完成，最高分 ${status.bestScore || 100}%。重新练习不会取消完成状态。`;
    if (quiz && unit.contentReady && allComplete) startQuiz(true);
  }

  function startQuiz(restoring) {
    const pool = candidates();
    if (pool.length < unit.targetQuizCount) { document.getElementById("checkpointNote").textContent = `只有 ${pool.length} 个词能在故事中定位，尚不足 50 题。`; return; }
    if (!restoring || !quiz || !Array.isArray(quiz.words) || quiz.words.length !== unit.targetQuizCount) {
      const selected = shuffle(pool).slice(0, unit.targetQuizCount);
      quiz = { words: selected.map(item => item.key), answers: {}, feedback: {}, submissions: 0, firstScore: null, score: null, submitted: false };
      saveQuiz();
    }
    document.getElementById("quizShell").classList.remove("hidden");
    renderQuiz(pool);
    if (!restoring) document.getElementById("quizShell").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuiz(pool = candidates()) {
    const selected = quiz.words.map(key => pool.find(item => item.key === key)).filter(Boolean);
    document.getElementById("quizList").innerHTML = selected.map((item,index) => {
      const pattern = window.IELTS_QUEST_VOCABULARY.pattern(item, "i");
      const parts = item.sentence.split(pattern); const answer = quiz.answers[item.key] || ""; const marked = quiz.submitted;
      const correct = marked && quiz.feedback[item.key] === true;
      return `<article class="unit-question"><div class="question-meta"><span>QUESTION ${String(index + 1).padStart(2,"0")}</span><span>Mission ${item.missionId} · ${escapeHtml(item.missionTitle)}</span></div><p class="question-sentence">${escapeHtml(parts[0])}<input class="unit-input ${marked ? (correct ? "correct" : "wrong") : ""}" data-key="${escapeHtml(item.key)}" data-surface="${escapeHtml(item.surface)}" value="${escapeHtml(answer)}" autocomplete="off" spellcheck="false" aria-label="第 ${index + 1} 题答案" />${escapeHtml(parts.slice(1).join(item.surface))}</p>${marked && !correct ? `<p class="answer-line">正确答案：${escapeHtml(item.surface)}</p>` : ""}${marked ? `<p class="translation-line">${escapeHtml(item.translation)}</p>` : ""}</article>`;
    }).join("");
    document.querySelectorAll(".unit-input").forEach(input => input.addEventListener("input", event => { quiz.answers[event.target.dataset.key] = event.target.value; if (quiz.submitted) { quiz.submitted = false; event.target.classList.remove("correct","wrong"); } saveQuiz(); }));
    document.getElementById("submitUnitQuiz").textContent = quiz.submissions ? "重新检查修改" : "提交 50 题";
    document.getElementById("quizScore").classList.toggle("hidden", quiz.score === null);
    if (quiz.score !== null) document.getElementById("scoreValue").textContent = `${quiz.score}%`;
  }

  function submitQuiz() {
    const pool = candidates(); const selected = quiz.words.map(key => pool.find(item => item.key === key)).filter(Boolean);
    document.querySelectorAll(".unit-input").forEach(input => { quiz.answers[input.dataset.key] = input.value; });
    let correct = 0; quiz.feedback = {};
    selected.forEach(item => { const ok = item.answers.some(answer => normalize(answer) === normalize(quiz.answers[item.key])); quiz.feedback[item.key] = ok; if (ok) correct += 1; });
    const score = Math.round((correct / selected.length) * 100); const firstSubmission = quiz.submissions === 0;
    quiz.submissions += 1; quiz.submitted = true; quiz.score = score; if (firstSubmission) quiz.firstScore = score;
    state.units ||= {}; const status = state.units[unit.id] ||= { bestScore: 0, lastScore: 0, attempts: 0, completed: false, completionMethod: null, completedAt: null };
    status.bestScore = Math.max(Number(status.bestScore) || 0, score); status.lastScore = score;
    if (firstSubmission) { status.attempts = (Number(status.attempts) || 0) + 1; if (score === 100) { status.completed = true; status.completionMethod = "first-submit-100"; status.completedAt = new Date().toISOString(); } }
    saveState(); saveQuiz(); renderQuiz(pool);
    document.getElementById("quizSave").textContent = firstSubmission && score === 100 ? "首次提交 100%，本单元已正式完成。" : score === 100 ? "已纠错至 100%；本轮不会被计为正式完成。" : `已提交，正确 ${correct} / ${selected.length}。结果页会保留，可继续修改。`;
    document.getElementById("quizShell").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function newRound() { if (!confirm("重新随机会清除本设备当前这轮的作答痕迹，确定继续吗？")) return; localStorage.removeItem(quizKey()); quiz = null; startQuiz(false); }
  document.getElementById("submitUnitQuiz").onclick = submitQuiz;
  document.getElementById("newUnitRound").onclick = newRound;
  window.addEventListener("ieltsquest:progress-synced", () => { state = readState(); });
  setupTheme(); renderOverview();
})();
