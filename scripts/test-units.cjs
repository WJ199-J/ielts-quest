const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const context = { window: { IELTS_QUEST_MISSIONS: [] } };
vm.createContext(context);
const files = ["data/missions.js", ...Array.from({ length: 21 }, (_, index) => `data/chapter${index + 2}.js`), "data/units.js"];
files.forEach(file => vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file }));

const missions = context.window.IELTS_QUEST_MISSIONS;
const units = context.window.IELTS_QUEST_UNITS;
assert.equal(missions.length, 98, "expected 98 existing Missions");
assert.equal(units.length, 22, "expected one B-plan Unit for every chapter");

const assigned = units.flatMap(unit => unit.missionIds);
assert.equal(assigned.length, 98, "every Mission must belong to a Unit");
assert.equal(new Set(assigned).size, 98, "a Mission cannot be assigned twice");
assert.deepEqual([...assigned].sort((a,b) => a-b), Array.from({ length: 98 }, (_, index) => index + 1));

units.forEach(unit => {
  assert.equal(unit.targetItemCount, 100);
  assert.equal(unit.targetQuizCount, 50);
  assert(unit.itemCount > 0, `${unit.id} has no learning items`);
  const chapterMissions = missions.filter(mission => mission.chapter === unit.chapter);
  const uniqueWords = new Set([...chapterMissions.flatMap(mission => mission.newCoreWords.map(item => item.word.toLowerCase())), ...(unit.supplementalItems || []).map(item => item.word.toLowerCase())]);
  assert.equal(unit.itemCount, uniqueWords.size, `${unit.id} must count unique items only`);
  const locatableWords = new Set();
  chapterMissions.forEach(mission => mission.newCoreWords.forEach(item => {
    const forms = [item.word, ...(item.answers || [])].filter(Boolean).map(value => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`\\b(?:${forms.join("|")})\\b`, "i");
    if (mission.story.some(sentence => pattern.test(sentence.en))) locatableWords.add(item.word.toLowerCase());
  }));
  (unit.supplementalItems || []).forEach(item => {
    assert(item.source && item.sourcePage, `${unit.id} supplemental items require source evidence`);
    const forms = [item.word, ...(item.answers || [])].filter(Boolean).map(value => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (new RegExp(`\\b(?:${forms.join("|")})\\b`, "i").test(item.example || "")) locatableWords.add(item.word.toLowerCase());
  });
  if (unit.contentReady) assert(locatableWords.size >= unit.targetQuizCount, `${unit.id} needs at least 50 context-locatable questions`);
});

const chapter2 = units.find(unit => unit.chapter === 2);
assert.equal(chapter2.itemCount, 118);
assert.equal(chapter2.contentReady, true, "Chapter 2 should satisfy the approximate-100 gate");
const chapter1 = units.find(unit => unit.chapter === 1);
assert.equal(chapter1.supplementalItems.length, 34);
assert.equal(chapter1.itemCount, 100);
assert.equal(chapter1.contentReady, true, "Chapter 1 source enrichment should satisfy the B-plan gate");
assert.equal(chapter1.gapToTarget, 0);

console.log(`Unit checks passed: ${units.length} Units, ${assigned.length} Mission assignments.`);
