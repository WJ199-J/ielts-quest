/* Chapter navigation metadata. Legacy single-sentence word cards and 50-question checkpoint removed. */
(function () {
  'use strict';
  const titles = [['自然地理','Natural Geography'],['植物研究','Plant Life'],['动物保护','Animal World'],['太空探索','Space Exploration'],['教育与学习','Education'],['科技与发明','Technology'],['文化与历史','Culture & History'],['语言与交流','Language'],['媒体与休闲','Media & Leisure'],['材料与制造','Materials'],['服装与时尚','Clothing'],['食物与饮食','Food'],['建筑与居住','Buildings'],['交通与旅行','Transport'],['政府与政治','Government'],['经济与商业','Economy'],['法律与规则','Law'],['冲突与和平','Conflict & Peace'],['人物与关系','People'],['行为与能力','Behaviour'],['健康与医疗','Health'],['时间与变化','Time']];
  const totals = [241,130,168,75,401,122,79,68,176,152,113,173,134,134,149,171,117,212,121,268,417,52];
  const baseCoverage = [61,115,62,18,57,51,46,48,48,35,29,39,46,40,40,36,33,28,34,31,32,27];
  function hydrate(missions = window.IELTS_QUEST_MISSIONS || []) {
    return titles.map(([titleZh,title],index) => Object.freeze({id:`unit-ch${index+1}`,chapter:index+1,titleZh,title,sourceItemCount:totals[index],baseCoverage:baseCoverage[index],hiddenReleased:index===0,missionIds:missions.filter(m=>Number(m.chapter)===index+1).map(m=>m.id)}));
  }
  window.IELTS_QUEST_UNITS = hydrate();
  window.IELTS_QUEST_UNIT_HELPERS = Object.freeze({hydrate});
})();
