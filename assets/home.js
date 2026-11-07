(function () {
  "use strict";
  const missions = Array.isArray(window.IELTS_QUEST_MISSIONS) ? window.IELTS_QUEST_MISSIONS : [];
  const STORAGE_KEY = "ieltsQuestV1";
  const THEME_KEY = "ieltsQuestTheme";
  const chapterMeta = [
    ["自然地理","Natural Geography"],["植物研究","Plant Life"],["动物保护","Animal World"],
    ["太空探索","Space Exploration"],["教育与学习","Education"],["科技与发明","Technology"],
    ["文化与历史","Culture & History"],["语言与交流","Language"],["媒体与休闲","Media & Leisure"],
    ["材料与制造","Materials"],["服装与时尚","Clothing"],["食物与饮食","Food"],
    ["建筑与居住","Buildings"],["交通与旅行","Transport"],["政府与政治","Government"],
    ["经济与商业","Economy"],["法律与规则","Law"],["冲突与和平","Conflict & Peace"],
    ["人物与关系","People"],["行为与能力","Behaviour"],["健康与医疗","Health"],["时间与变化","Time"]
  ];
  let selectedChapter = 1;
  let filter = "all";
  let query = "";

  function readState() {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const normalized = state && typeof state === "object" ? { missions: state.missions || {}, words: state.words || {} } : { missions: {}, words: {} };
      let migrated = false;
      missions.forEach((mission) => {
        if (localStorage.getItem(`ieltsQuestMission${mission.id}Completed`) === "true" && !normalized.missions[mission.id]) {
          normalized.missions[mission.id] = { bestScore: 0, attempts: 0, completed: true, lastScore: 0 };
          migrated = true;
        }
      });
      if (migrated) localStorage.setItem(STORAGE_KEY,JSON.stringify(normalized));
      return normalized;
    } catch (error) { return { missions: {}, words: {} }; }
  }
  let state = readState();
  const missionState = (id) => state.missions[id] || { bestScore: 0, attempts: 0, completed: false, lastScore: 0 };
  const isComplete = (mission) => Boolean(missionState(mission.id).completed);
  const missionsForChapter = (chapter) => missions.filter((mission) => mission.chapter === chapter);
  function chapterProgress(chapter) {
    const items = missionsForChapter(chapter);
    return { total: items.length, completed: items.filter(isComplete).length };
  }
  function getCurrentMission() {
    if (!missions.length) return null;
    const storedId = Number(localStorage.getItem("ieltsQuestCurrentMission"));
    const stored = missions.find((mission) => mission.id === storedId);
    if (stored && !isComplete(stored)) return stored;
    return missions.find((mission) => !isComplete(mission)) || stored || missions[0];
  }
  function openMission(id) {
    localStorage.setItem("ieltsQuestCurrentMission", String(id));
    window.location.href = `mission.html?id=${id}`;
  }
  function escapeText(value) {
    return String(value || "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  }

  function renderOverview() {
    const current = getCurrentMission();
    if (!current) return;
    const completed = missions.filter(isComplete).length;
    const percent = missions.length ? Math.round((completed / missions.length) * 100) : 0;
    const bestScore = Math.max(0, ...missions.map((mission) => Number(missionState(mission.id).bestScore) || 0));
    const [zh,en] = chapterMeta[current.chapter - 1] || ["课程章节","Course Chapter"];
    selectedChapter = current.chapter;
    document.getElementById("continueChapter").textContent = `CHAPTER ${current.chapter} · MISSION ${current.id}`;
    document.getElementById("continueDescription").textContent = `${zh} · ${current.titleZh || current.title}。先读完整故事，再完成情境填空。`;
    document.getElementById("completedMissions").textContent = completed;
    document.getElementById("totalMissions").textContent = missions.length;
    document.getElementById("currentChapterStat").textContent = String(current.chapter).padStart(2,"0");
    document.getElementById("bestScoreStat").textContent = bestScore;
    document.getElementById("overallPercent").textContent = `${percent}%`;
    document.getElementById("overallProgressBar").style.width = `${percent}%`;
    document.getElementById("overallProgressBar").parentElement.setAttribute("aria-valuenow",String(percent));
    document.getElementById("progressNote").textContent = completed
      ? `已完成 ${completed} 个 Mission。当前建议继续：${current.titleZh || current.title}。`
      : `从 ${en} 开始。完成第一个 Mission 后，这里会记录成绩与进度。`;
    document.getElementById("continueButton").onclick = () => openMission(current.id);
    document.getElementById("viewCurrentChapter").onclick = () => {
      selectedChapter = current.chapter; renderChapters(); renderMissionPanel();
      document.getElementById("course").scrollIntoView({ behavior: "smooth" });
    };
  }

  function chapterMatches(chapter) {
    const progress = chapterProgress(chapter);
    const items = missionsForChapter(chapter);
    const hasActivity = items.some((mission) => {
      const status = missionState(mission.id);
      return status.attempts > 0 || status.bestScore > 0 || status.completed;
    });
    if (filter === "active" && (!hasActivity || progress.completed === progress.total)) return false;
    if (filter === "complete" && progress.completed === 0) return false;
    if (!query) return true;
    const meta = chapterMeta[chapter - 1] || [];
    const content = [`chapter ${chapter}`,...meta,...missionsForChapter(chapter).flatMap((mission) => [mission.title,mission.titleZh])].join(" ").toLowerCase();
    return content.includes(query);
  }

  function renderChapters() {
    const container = document.getElementById("chapterList");
    const chapters = Array.from({ length: 22 },(_,index) => index + 1).filter(chapterMatches);
    document.getElementById("chapterEmpty").classList.toggle("hidden",chapters.length > 0);
    container.innerHTML = chapters.map((chapter) => {
      const [zh,en] = chapterMeta[chapter - 1];
      const progress = chapterProgress(chapter);
      const complete = progress.total > 0 && progress.completed === progress.total;
      const active = progress.completed > 0 && !complete;
      const stateClass = complete ? "complete" : active ? "active" : "";
      const stateLabel = complete ? "已完成" : active ? `${progress.completed}/${progress.total}` : `${progress.total} 关`;
      return `<button class="chapter-item ${selectedChapter === chapter ? "selected" : ""}" type="button" data-chapter="${chapter}">
        <span class="chapter-index">${String(chapter).padStart(2,"0")}</span><span class="chapter-copy"><strong>${escapeText(zh)}</strong><small>${escapeText(en)}</small></span><span class="chapter-state ${stateClass}">${stateLabel}</span>
      </button>`;
    }).join("");
    container.querySelectorAll("[data-chapter]").forEach((button) => button.addEventListener("click",() => {
      selectedChapter = Number(button.dataset.chapter); renderChapters(); renderMissionPanel();
      if (window.innerWidth < 980) document.getElementById("missionPanel").scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }

  function renderMissionPanel() {
    const [zh,en] = chapterMeta[selectedChapter - 1] || ["课程章节","Course Chapter"];
    const items = missionsForChapter(selectedChapter);
    const progress = chapterProgress(selectedChapter);
    const percent = progress.total ? Math.round((progress.completed / progress.total) * 100) : 0;
    document.getElementById("selectedChapterNumber").textContent = String(selectedChapter).padStart(2,"0");
    document.getElementById("selectedChapterLabel").textContent = `CHAPTER ${selectedChapter}`;
    document.getElementById("selectedChapterTitle").textContent = `${zh} · ${en}`;
    document.getElementById("selectedChapterProgressText").textContent = `${progress.completed} / ${progress.total} 已完成`;
    document.getElementById("selectedChapterProgressBar").style.width = `${percent}%`;
    const list = document.getElementById("missionList");
    list.innerHTML = items.map((mission,index) => {
      const status = missionState(mission.id);
      const complete = Boolean(status.completed);
      const meta = [mission.level,mission.time || "10–20 min",`${mission.newCoreWords.length} 词`].filter(Boolean).join(" · ");
      return `<div class="mission-row ${complete ? "complete" : ""}">
        <span class="mission-sequence">${complete ? "✓" : String(index + 1).padStart(2,"0")}</span>
        <span class="mission-copy"><strong>${escapeText(mission.titleZh || mission.title)}</strong><small>${escapeText(meta)}${status.bestScore ? ` · 最高 ${status.bestScore}%` : ""}</small></span>
        <button class="mission-action" type="button" data-mission="${mission.id}">${complete ? "复习" : "开始"}</button>
      </div>`;
    }).join("");
    list.querySelectorAll("[data-mission]").forEach((button) => button.addEventListener("click",() => openMission(Number(button.dataset.mission))));
  }

  function setupFilters() {
    document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click",() => {
      filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active",item === button));
      renderChapters();
    }));
    document.getElementById("courseSearch").addEventListener("input",(event) => { query = event.target.value.trim().toLowerCase(); renderChapters(); });
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY,theme);
    document.querySelector('meta[name="theme-color"]').setAttribute("content",theme === "dark" ? "#101815" : "#f7f4ed");
  }
  function setupTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    document.getElementById("themeToggle").addEventListener("click",() => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  }
  function setupLoginModal() {
    const modal = document.getElementById("loginModal");
    const open = () => { modal.classList.remove("hidden"); document.body.style.overflow = "hidden"; document.getElementById("closeLogin").focus(); };
    const close = () => { modal.classList.add("hidden"); document.body.style.overflow = ""; document.getElementById("openLogin").focus(); };
    document.getElementById("openLogin").addEventListener("click",open);
    document.getElementById("closeLogin").addEventListener("click",close);
    document.getElementById("continueGuest").addEventListener("click",close);
    modal.addEventListener("click",(event) => { if (event.target === modal) close(); });
    document.addEventListener("keydown",(event) => { if (event.key === "Escape" && !modal.classList.contains("hidden")) close(); });
    document.getElementById("loginForm").addEventListener("submit",(event) => event.preventDefault());
  }
  function setupGreeting() {
    const hour = new Date().getHours();
    document.getElementById("greeting").textContent = `${hour < 11 ? "早上好" : hour < 18 ? "下午好" : "晚上好"}，今天也向目标分数前进一步。`;
  }

  window.addEventListener("ieltsquest:progress-synced", () => {
    state = readState();
    renderOverview();
    renderChapters();
    renderMissionPanel();
  });

  setupTheme(); setupGreeting(); renderOverview(); renderChapters(); renderMissionPanel(); setupFilters(); setupLoginModal();
})();
