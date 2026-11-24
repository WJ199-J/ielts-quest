/* Validate source-preserving course expansion and submitted-draft continuity. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const memory=new Map();const c={window:{},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)}};vm.createContext(c);
for(const f of ['data/missions.js',...Array.from({length:21},(_,i)=>`data/chapter${i+2}.js`),'data/additional-missions.js','data/review-vocabulary.js','data/hidden-chapter1.js','assets/vocabulary-pattern.js','assets/quiz-session.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const missions=c.window.IELTS_QUEST_MISSIONS, hidden=c.window.IELTS_QUEST_HIDDEN_CHAPTER1;
assert.equal(missions.length,134);assert.equal(new Set(missions.map(m=>m.id)).size,134);
for(let chapter=1;chapter<=22;chapter++)assert.equal(missions.filter(m=>m.chapter===chapter).length,chapter===2?8:6);
function canonical(v){if(Array.isArray(v))return v.map(canonical);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).filter(k=>!['ipa','ipaAccent','ipaSource','pronunciationUrl'].includes(k)).sort().map(k=>[k,canonical(v[k])]));return v;}
const hashes=JSON.parse(fs.readFileSync('docs/original-mission-hashes.json'));
for(const m of missions.filter(m=>m.id<=98))assert.equal(crypto.createHash('sha256').update(JSON.stringify(canonical(m))).digest('hex'),hashes[m.id],`Original Mission ${m.id} semantics changed`);
const added=missions.filter(m=>m.id>=99),newTerms=new Set();assert.equal(added.length,36);
for(const m of missions){
 for(const w of [...m.newCoreWords,...(m.supportWords||[])])assert(w.ipa&&/^\/.+\/$/.test(w.ipa),`${m.id}: missing IPA ${w.word}`);
 if(m.id<99)continue;
 assert(m.story.length>=3&&m.story.every(p=>p.en&&p.zh));
 for(const w of m.newCoreWords){assert(w.meaning&&w.sourcePage&&w.source&&w.ipaSource);assert(c.window.IELTS_QUEST_VOCABULARY.pattern(w,'i').test(m.story.map(p=>p.en).join(' ')));const key=m.chapter+':'+w.word;assert(!newTerms.has(key));newTerms.add(key);}
 const previous=missions[missions.indexOf(m)-1];assert.equal(previous.chapter,m.chapter);assert.equal(m.order,previous.order?6:5);
}
assert.equal(newTerms.size,216);
for(let i=0;i<hidden.length;i++){assert(hidden[i].story.length>=6);assert.equal(hidden[i].progressionStage,Math.floor(i/3)+1);assert(hidden[i].story.every(p=>p.en&&p.zh));const count=hidden[i].story.map(p=>p.en).join(' ').match(/[A-Za-z]+(?:['-][A-Za-z]+)*/g).length;assert(count>=302,'Hidden story must continue beyond the field-survey length baseline');}
// Simulate a result created before IPA enrichment: remain a submitted correction, not a fresh official attempt.
const sessions=c.window.IELTS_QUEST_QUIZ_SESSIONS;
const signature=JSON.stringify([[{en:'A test.',zh:'测试。'}],[{word:'test',meaning:'测试',ipa:''}],[]]);
sessions.save(5,{signature,submitted:true,isCorrection:true,firstScore:94,score:100,words:['test'],answers:{test:'test'},stage:'result'});
const enriched=JSON.stringify([[{en:'A test.',zh:'测试。'}],[{word:'test',meaning:'测试',ipa:'/tɛst/',ipaAccent:'en-US',ipaSource:'CMU'}],[]]);
const draft=sessions.get(5,enriched);assert.equal(draft.firstScore,94);assert.equal(draft.submitted,true);assert.equal(draft.isCorrection,true);assert.equal(draft.signature,enriched);
assert.equal(sessions.get(5,enriched.replace('A test.','A different test.')),null,'Actual story change must invalidate a draft');
for(const f of ['index.html','mission.html','unit.html']){const html=fs.readFileSync(f,'utf8');assert(html.indexOf('data/additional-missions.js')>html.indexOf('data/chapter22.js'));}
console.log('PASS: 22 chapter counts; 36 articles/216 source targets; 98 original semantic hashes; 0 missing core/support IPA; five hidden difficulty stages; IPA-only update preserves submitted drafts.');
