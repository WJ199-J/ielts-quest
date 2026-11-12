const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ['missions.js', ...Array.from({ length: 21 }, (_, i) => `chapter${i + 2}.js`)]) {
  vm.runInContext(fs.readFileSync(path.join(root, 'data', file), 'utf8'), sandbox);
}
vm.runInContext(fs.readFileSync(path.join(root, 'assets/vocabulary-pattern.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'data/review-vocabulary.js'), 'utf8'), sandbox);
const missions = sandbox.window.IELTS_QUEST_MISSIONS;
const catalog = new Map(missions.flatMap(m => m.newCoreWords.map(w => [w.word.toLowerCase(), w])));
const newWordsCount = catalog.size;
for (const w of sandbox.window.IELTS_QUEST_REVIEW_VOCABULARY) if (!catalog.has(w.word)) catalog.set(w.word, w);
const pattern = sandbox.window.IELTS_QUEST_VOCABULARY.pattern;
const rows = missions.map(m => {
  const reviews = m.reviewWords.map(word => catalog.get(word.toLowerCase())).filter(Boolean);
  const all = [...new Map([...m.newCoreWords, ...reviews].map(w => [w.word.toLowerCase(), w])).values()];
  const story = m.story.map(s => s.en).join(' ');
  const candidates = all.filter(w => pattern(w, 'i').test(story));
  return {
    id: m.id, chapter: m.chapter, title: m.title,
    storyWords: story.match(/\b[\w'-]+\b/g)?.length || 0,
    newWords: m.newCoreWords.length, reviewWords: reviews.length,
    candidates: candidates.length, requestedQuestions: m.quizCount,
    actualQuestions: Math.min(m.quizCount, candidates.length),
    missingIPA: m.newCoreWords.filter(w => !w.ipa?.trim()).length,
    missingPOS: m.newCoreWords.filter(w => !w.pos?.trim()).length,
    missingCollocations: m.newCoreWords.filter(w => !w.collocations?.length).length,
    unmatched: m.newCoreWords.filter(w => !pattern(w, 'i').test(story)).map(w => w.word),
    unknownReviews: m.reviewWords.filter(word => !catalog.has(word.toLowerCase())),
    missingTranslation: m.story.filter(s => !s.zh?.trim()).length,
    meetsOriginalScale: m.newCoreWords.length >= 90 && m.quizCount >= 45
  };
});
const ids = missions.map(m => m.id);
const summary = {
  missions: rows.length, chapters: new Set(missions.map(m => m.chapter)).size,
  uniqueIds: new Set(ids).size, continuousIds: ids.slice().sort((a, b) => a - b).every((id, i) => id === i + 1),
  newWordRecords: rows.reduce((n, r) => n + r.newWords, 0),
  uniqueNewWords: newWordsCount,
  missingIPA: rows.reduce((n, r) => n + r.missingIPA, 0),
  missingPOS: rows.reduce((n, r) => n + r.missingPOS, 0),
  missingCollocations: rows.reduce((n, r) => n + r.missingCollocations, 0),
  unmatched: rows.flatMap(r => r.unmatched.map(word => ({ id: r.id, word }))),
  unknownReviews: rows.flatMap(r => r.unknownReviews.map(word => ({ id: r.id, word }))),
  originalScalePassed: rows.filter(r => r.meetsOriginalScale).length,
  fullPoolQuizzes: rows.filter(r => r.actualQuestions === r.candidates).length,
  sourceCoverage: 'Not verified: source PDF located, full word-to-course mapping pending.'
};
const report = { summary, missions: rows };
if (process.argv.includes('--write')) fs.writeFileSync(path.join(root, 'docs/course-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
if (!summary.continuousIds || summary.unmatched.length || summary.unknownReviews.length) process.exitCode = 1;
