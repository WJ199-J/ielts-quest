/* Run the actual page controller with an isolated DOM/storage harness; no user records are used. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function setup(seed,search='?chapter=1',extra=[]){
 const memory=new Map([['ieltsQuestV1',JSON.stringify(seed)],...extra]),elements=new Map(),events={};let href='https://example.test/unit.html'+search;
 const decode=s=>s.replaceAll('&#39;',"'").replaceAll('&quot;','"').replaceAll('&amp;','&');
 function element(id){if(elements.has(id))return elements.get(id);const e={id,hidden:['articleShell','articlePath','resultPanel','quizActions','translation','showTranslation'].includes(id),textContent:'',checked:false,disabled:id==='hiddenToggle',dataset:{},style:{},scrollIntoView(){},setAttribute(){},children:[]};
 Object.defineProperty(e,'innerHTML',{get(){return e.html||''},set(html){e.html=html;e.children=[];for(const match of html.matchAll(/<(button|input)[^>]*>/g)){const tag=match[0],word=/data-word="([^"]*)"/.exec(tag),index=/data-index="([^"]*)"/.exec(tag),value=/value="([^"]*)"/.exec(tag);e.children.push({dataset:word?{word:decode(word[1])}:index?{index:index[1]}:{},value:value?decode(value[1]):'',disabled:/\sdisabled/.test(tag),type:match[1]});}}});
 e.querySelectorAll=selector=>e.children.filter(x=>selector.includes('input')?x.type==='input':selector.includes('data-index')?'index'in x.dataset:x.type==='button');elements.set(id,e);return e;}
 const document={getElementById:element,documentElement:{dataset:{}},querySelectorAll:()=>[]};const window={document,addEventListener:(name,fn)=>events[name]=fn,IELTS_QUEST_SYNC:{schedule(){}}};
 const context={window,document,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},location:{search,get href(){return href}},history:{replaceState:(_a,_b,u)=>href=String(u)},URL,URLSearchParams,console,confirm:()=>true,Date};vm.createContext(context);
 for(const file of ['data/hidden-chapter1.js','assets/vocabulary-pattern.js','assets/quiz-session.js','assets/hidden-course.js','assets/unit.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
 return {context,element,memory,events,record:()=>JSON.parse(memory.get('ieltsQuestV1')),href:()=>href};
}
const base={missions:Object.fromEntries([1,2,3,4,5,6].map(id=>[id,{bestScore:94,lastScore:94,progressScore:94,completed:true,completionScore:94,completionRuleVersion:3,completionMethod:'first-submit-90-plus',attempts:3}])),words:{beach:{seen:3}},units:{'unit-ch1':{bestScore:100,completed:true,attempts:1}}};
const locked=setup({missions:{}});assert(locked.element('hiddenToggle').disabled);assert(locked.element('articleShell').hidden);
const bypass=setup({missions:{}},'?chapter=1&article=1');assert(bypass.element('articleShell').hidden);
for(const chapter of [2,3,4,5]){const t=setup(base,`?chapter=${chapter}&article=1`);assert(t.element('hiddenToggle').disabled);assert(t.element('articleShell').hidden);assert(!t.element('articlePath').innerHTML);}
const h=setup(base);const $=h.element;assert(!$('hiddenToggle').disabled);$('articlePath').querySelectorAll('[data-index]')[0].onclick();assert(!$('articleShell').hidden);assert($('showTranslation').hidden);
$('startStoryQuiz').onclick();assert($('wordDetail').hidden);assert(!$('quizActions').hidden);
let inputs=$('storyBody').querySelectorAll('.story-input');inputs.forEach((x,i)=>{x.value=i===0?'wrong':x.dataset.word;x.oninput();});
const restored=setup(h.record(),'?chapter=1&article=1',[['ieltsQuestQuizSessionsV1',h.memory.get('ieltsQuestQuizSessionsV1')]]);assert.equal(restored.element('storyBody').querySelectorAll('.story-input')[0].value,'wrong');
$('submitStoryQuiz').onclick();assert.equal($('roundScore').textContent,'92%');assert.equal($('formalBest').textContent,'92%');assert.equal($('formalAttempts').textContent,'1');const url=h.href();
inputs=$('storyBody').querySelectorAll('.story-input');inputs.forEach(x=>{x.value=x.dataset.word;x.oninput();});$('submitStoryQuiz').onclick();assert.equal($('roundScore').textContent,'100%');assert.equal($('formalBest').textContent,'92%');assert.equal($('formalAttempts').textContent,'1');assert.equal(h.href(),url);assert(!$('resultPanel').hidden);assert(!$('nextStory').disabled);
const record=h.record();for(const id of [1,2,3,4,5,6])assert.deepEqual(record.missions[id],base.missions[id]);assert.deepEqual(record.words,base.words);assert.deepEqual(record.units,base.units);
const draft=JSON.parse(h.memory.get('ieltsQuestQuizSessionsV1')).guest['ch1-hidden-01'];assert.equal(draft.firstScore,92);assert.equal(draft.score,100);assert.equal(draft.submissions,2);
const again=setup(h.record(),'?chapter=1&article=1',[['ieltsQuestQuizSessionsV1',h.memory.get('ieltsQuestQuizSessionsV1')]]);assert.equal(again.element('roundScore').textContent,'100%');assert.equal(again.element('formalBest').textContent,'92%');assert.equal(again.element('formalAttempts').textContent,'1');
$('nextStory').onclick();assert.match($('articleTitleZh').textContent,/2\/15/);assert($('showTranslation').hidden);assert($('resultPanel').hidden);
console.log('PASS actual UI controller: prerequisites, URL guard, Chapter 2–5 blocked, study/test isolation, 92→correction100 keeps formal92/attempts1, result retained, next by click, unrelated user data preserved.');
