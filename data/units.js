/* IELTS Quest B-plan unit layer.
 * Existing Missions remain the progressive learning steps. A Unit groups the
 * Missions in one chapter and owns the 100-item coverage target plus a
 * 50-question checkpoint. No vocabulary is duplicated to inflate readiness.
 */
(function () {
  "use strict";

  const chapterTitles = [
    ["自然地理", "Natural Geography"], ["植物研究", "Plant Life"],
    ["动物保护", "Animal World"], ["太空探索", "Space Exploration"],
    ["教育与学习", "Education"], ["科技与发明", "Technology"],
    ["文化与历史", "Culture & History"], ["语言与交流", "Language"],
    ["媒体与休闲", "Media & Leisure"], ["材料与制造", "Materials"],
    ["服装与时尚", "Clothing"], ["食物与饮食", "Food"],
    ["建筑与居住", "Buildings"], ["交通与旅行", "Transport"],
    ["政府与政治", "Government"], ["经济与商业", "Economy"],
    ["法律与规则", "Law"], ["冲突与和平", "Conflict & Peace"],
    ["人物与关系", "People"], ["行为与能力", "Behaviour"],
    ["健康与医疗", "Health"], ["时间与变化", "Time"]
  ];

  const units = chapterTitles.map(([titleZh, title], index) => ({
    id: `chapter-${String(index + 1).padStart(2, "0")}-unit-01`,
    chapter: index + 1,
    unit: 1,
    title,
    titleZh,
    targetItemCount: 100,
    readinessFloor: 90,
    readinessCeiling: 120,
    targetQuizCount: 50,
    sourceCoverageStatus: "mapping",
    missionIds: []
  }));

  function uniqueCoreWords(missions) {
    const unique = new Map();
    missions.forEach(mission => (mission.newCoreWords || []).forEach(item => {
      const key = String(item.word || "").trim().toLowerCase();
      if (key && !unique.has(key)) unique.set(key, item);
    }));
    return [...unique.values()];
  }

  function hydrate(missions = window.IELTS_QUEST_MISSIONS || []) {
    return units.map(unit => {
      const grouped = missions.filter(mission => Number(mission.chapter) === unit.chapter);
      const words = uniqueCoreWords(grouped);
      const itemCount = words.length;
      return Object.freeze({
        ...unit,
        missionIds: grouped.map(mission => mission.id),
        itemCount,
        gapToTarget: Math.max(0, unit.targetItemCount - itemCount),
        contentReady: itemCount >= unit.readinessFloor && itemCount <= unit.readinessCeiling
      });
    });
  }

  window.IELTS_QUEST_UNITS = hydrate();
  window.IELTS_QUEST_UNIT_HELPERS = Object.freeze({ hydrate, uniqueCoreWords });
})();
