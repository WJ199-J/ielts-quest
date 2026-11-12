/* Device-local quiz drafts. Separate from established account progress. */
(function () {
  "use strict";
  const KEY = "ieltsQuestQuizSessionsV1";
  function scope() {
    try {
      const session = JSON.parse(localStorage.getItem("ieltsQuestAuthSession"));
      return session?.user?.id || "guest";
    } catch (_) { return "guest"; }
  }
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (_) { return {}; }
  }
  function get(id, signature) {
    const item = read()[scope()]?.[id];
    return item?.version === 1 && item.signature === signature ? item : null;
  }
  function save(id, value) {
    try {
      const all = read();
      const user = scope();
      all[user] ||= {};
      all[user][id] = { ...value, version: 1, updatedAt: new Date().toISOString() };
      localStorage.setItem(KEY, JSON.stringify(all));
      return true;
    } catch (_) { return false; }
  }
  window.IELTS_QUEST_QUIZ_SESSIONS = Object.freeze({ get, save });
})();
