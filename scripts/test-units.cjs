const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);
for(const f of ['data/missions.js',...Array.from({length:21},(_,i)=>`data/chapter${i+2}.js`),'data/units.js','data/hidden-chapter1.js','assets/vocabulary-pattern.js','assets/hidden-course.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const {IELTS_QUEST_MISSIONS:missions,IELTS_QUEST_UNITS:units,IELTS_QUEST_HIDDEN_CHAPTER1:articles,IELTS_QUEST_HIDDEN_RULES:rules}=ctx.window;
assert.equal(missions.length,98);assert.equal(units.length,22);
const ids=units.flatMap(u=>u.missionIds);assert.equal(ids.length,98);assert.equal(new Set(ids).size,98);
assert.equal(units.filter(u=>u.hiddenReleased).length,1);assert.equal(units[0].hiddenReleased,true);
assert.equal(articles.length,15);
const terms=articles.flatMap(a=>a.newCoreWords);assert.equal(terms.length,180);assert.equal(new Set(terms.map(w=>w.word)).size,180);
const mapping=JSON.parse(fs.readFileSync('docs/chapter1-hidden-coverage.json'));
assert.equal(mapping.items.length,241);assert.equal(mapping.items.filter(w=>w.baseMissionIds.length).length,61);assert.equal(mapping.items.filter(w=>w.hiddenArticle).length,180);
for(const a of articles){assert(!missions.some(m=>m.id===a.id));assert(a.story.length>=3);assert(a.story.every(p=>p.en&&p.zh));for(const w of a.newCoreWords){assert(w.meaning&&w.sourcePage&&w.ipa&&w.pos);assert(a.story.some(p=>ctx.window.IELTS_QUEST_VOCABULARY.pattern(w,'i').test(p.en)),`${a.id}: ${w.word} not in story`);assert(mapping.items.some(x=>x.word===w.word&&x.hiddenArticle===a.id));}}
const passed=s=>({completed:true,completionMethod:'first-submit-90-plus',completionScore:s,progressScore:s,bestScore:s});
const state={missions:Object.fromEntries([1,2,3,4,5,6].map(i=>[i,passed(94)])),words:{},units:{}};
assert(rules.gate(state,articles,0));assert(!rules.gate(state,articles,1));
const low=JSON.parse(JSON.stringify(state));low.missions[6]=passed(89);assert(!rules.gate(low,articles,0));
const fake=JSON.parse(JSON.stringify(state));fake.missions[6]={bestScore:100,completed:false};assert(!rules.gate(fake,articles,0));
const old=JSON.stringify(state.missions);const a=articles[0];
const answers=Object.fromEntries(a.newCoreWords.map(w=>[w.word,w.word]));answers[a.newCoreWords[0].word]='incorrect';
const result=rules.grade(a,answers);assert.equal(result.score,92);
rules.recordFirst(state,a,result);assert.equal(state.missions[a.id].bestScore,92);assert.equal(state.missions[a.id].progressScore,92);assert(rules.gate(state,articles,1));
answers[a.newCoreWords[0].word]=a.newCoreWords[0].word;assert.equal(rules.grade(a,answers).score,100);assert.equal(state.missions[a.id].bestScore,92);assert.equal(state.missions[a.id].attempts,1);
rules.recordFirst(state,a,rules.grade(a,answers));assert.equal(state.missions[a.id].bestScore,100);assert.equal(state.missions[a.id].attempts,2);
assert.equal(JSON.stringify(Object.fromEntries(Object.entries(state.missions).filter(([id])=>!id.startsWith('ch1-hidden-')))),old,'Base Mission state must not change');
for(const f of ['assets/unit.js','unit.html','data/units.js','assets/home.js']){const code=fs.readFileSync(f,'utf8');assert(!/targetQuizCount|supplementalItems|function candidates\(|slice\(0, unit|50 题/.test(code),`${f}: retired checkpoint remains`);}
console.log('PASS: 98 original Missions preserved; Chapter 1 only; 15 connected stories; 180 new source terms; 241 index entries partitioned; 90% gate; correction isolation; no legacy checkpoint.');
