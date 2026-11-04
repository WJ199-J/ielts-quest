(function () {
  "use strict";
  const key = "ieltsQuestTheme";
  const button = document.getElementById("missionThemeToggle");
  const meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(key, theme);
    if (meta) meta.setAttribute("content", theme === "dark" ? "#101815" : "#f7f4ed");
  }

  const saved = localStorage.getItem(key);
  apply(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  if (button) button.addEventListener("click", () => apply(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
})();
