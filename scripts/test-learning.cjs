const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function classes() {
  const values = new Set();
  return { add: (...v) => v.forEach(x => values.add(x)), remove: (...v) => v.forEach(x => values.delete(x)), contains: v => values.has(v), toggle: (v, yes) => yes ? values.add(v) : values.delete(v) };
}
const memory = new Map();
const elements = new Map();
let inputs = [];
function element() { return { classList: classes(), dataset: {}, value: '', textContent: '', disabled: false, scrollIntoView() {}, appendChild() {}, setAttribute() {}, removeAttribute() {}, focus() {} }; }
const doc = {
  getElementById(id) { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); },
  querySelectorAll() { return inputs; }, querySelector() { return element(); }, createElement() { return element(); }
};
const ctx = { window: { location: { search: '?id=4' }, matchMedia: () => ({ matches: false }), scrollTo() {}, addEventListener() {} }, document: doc,
  localStorage: { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v) },
  URLSearchParams, URL, console, Date, Set, Map };
vm.createContext(ctx);
for (const file of ['data/missions.js', ...Array.from({ length: 21 }, (_, i) => `data/chapter${i + 2}.js`), 'data/review-vocabulary.js', 'assets/vocabulary-pattern.js', 'assets/quiz-session.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx);
const html = fs.readFileSync(path.join(root, 'mission.html'), 'utf8');
const inline = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]).find(s => s.includes('function gradeQuiz'));
new Function(inline);
assert(!html.split('</html>')[1].trim(), 'No script text outside HTML');
vm.runInContext(inline.slice(0, inline.indexOf('    // EVENTS')), ctx);
vm.runInContext('renderMissionRecord = () => {}; renderWordProgress = () => {}; setVocabularyVisible = () => {}; currentMission = missions.find(m => m.id === 4);', ctx);
function run(s) { return vm.runInContext(s, ctx); }
function input(word, value, surface = word) {
  const x = element(); x.dataset = { word, surface }; x.value = value;
  x.closest = () => ({ querySelector: () => null, appendChild() {} }); return x;
}
run('currentQuizWords = getAllCoreWords(currentMission).slice(0,2); quizSession = {signature:quizSignature(),words:currentQuizWords.map(w=>w.word),answers:{},assisted:false,stage:"quiz"}');
inputs = [input('weather', 'wrong'), input('sunshine', 'sunshine')];
run('gradeQuiz()');
assert.equal(run('getMissionState(4).attempts'), 1);
assert.equal(run('getMissionState(4).completed'), false);
inputs[0].value = 'weather';
run('resubmitAnswers()');
assert.equal(run('getMissionState(4).completed'), false, 'Correction never completes');
assert.equal(run('getMissionState(4).attempts'), 1, 'Correction does not add attempts');
const draft = run('window.IELTS_QUEST_QUIZ_SESSIONS.get(4,quizSignature())');
assert.equal(draft.firstScore, 50);
assert.equal(draft.score, 100);
assert.equal(draft.submitted, true);
assert.equal(draft.isCorrection, true);
assert.equal(draft.answers.weather, 'weather');
run('quizSubmitted = false; quizSession = {signature:quizSignature(),words:[],answers:{},assisted:false}; gradeQuiz()');
assert.equal(run('getMissionState(4).completed'), true);
assert.equal(run('getMissionState(4).completionMethod'), 'first-submit-100');
run('currentMission = missions.find(m=>m.id===6); quizSubmitted=false; quizSession={signature:quizSignature(),words:[],answers:{},assisted:true}; gradeQuiz()');
assert.equal(run('getMissionState(6).completed'), false, 'Reading answers mid-attempt makes practice only');
run('currentMission=missions.find(m=>m.id===2); quizSubmitted=false; quizSession={signature:quizSignature(),words:[],answers:{},assisted:false}');
inputs[0].value = 'wrong';
run('gradeQuiz()');
inputs[0].value = 'weather';
run('resubmitAnswers()');
assert.equal(run('getMissionState(2).completed'), false, 'New correction on Mission 2 cannot trigger historical repair');
assert.equal(run('storyContainsWord(missions.find(m=>m.id===24), findVocabulary("rotate"))'), true);
assert.equal(run('storyContainsWord(missions.find(m=>m.id===26), findVocabulary("equip"))'), true);
assert.equal(run('acceptedAnswers(findVocabulary("rotate"),{dataset:{word:"rotate",surface:"rotated"}}).includes("rotated")'), true);
run(`for (const mission of missions) {
  currentMission = mission;
  currentQuizWords = getAllCoreWords(mission).filter(word => storyContainsWord(mission, word));
  const used = new Set();
  const text = mission.story.map(sentence => createQuizSentence(sentence.en, used)).join(' ');
  if (used.size !== currentQuizWords.length) throw new Error('Unrendered candidates in Mission ' + mission.id);
  if ((text.match(/class="quiz-input"/g)||[]).length !== used.size) throw new Error('Input count mismatch in Mission ' + mission.id);
  const decorated = mission.story.map(sentence => decorateStoryText(sentence.en)).join(' ');
  if (decorated.includes('$1')) throw new Error('Replacement artifact in Mission ' + mission.id);
}`);
run('window.IELTS_QUEST_QUIZ_SESSIONS.save(4,{signature:"test",words:["weather"]})');
assert.equal(run('window.IELTS_QUEST_QUIZ_SESSIONS.get(4,"other")'), null);
memory.set('ieltsQuestAuthSession', JSON.stringify({ user: { id: 'test-user' } }));
assert.equal(run('window.IELTS_QUEST_QUIZ_SESSIONS.get(4,"test")'), null, 'Drafts do not leak between guest and accounts');
const cloud = fs.readFileSync(path.join(root, 'assets/cloud-progress.js'), 'utf8');
vm.runInContext(cloud.slice(0, cloud.indexOf('  function mergeWord')) + 'window.testMerge = mergeMission;})();', ctx);
const historical = { bestScore: 100, completed: true, completionMethod: 'user-confirmed-legacy-completion', attempts: 1 };
ctx.fixture = historical;
assert.equal(run('window.testMerge(2,fixture,{}).completed'), true, 'Keep accepted Mission 2 completion');
assert.equal(run('window.testMerge(3,{},fixture).completed'), true, 'Keep accepted Mission 3 completion');
assert.equal(run('window.testMerge(5,{bestScore:94,completed:false,attempts:1},{}).completed'), false);
assert.equal(run('window.testMerge(2,{bestScore:100,completed:false,completionRuleVersion:2},{}).completed'), false, 'Cloud cannot promote new correction to historical completion');
console.log('PASS: syntax, formal first submit, correction, attempt count, local draft, source signature, account separation, assisted attempt, inflected forms');
