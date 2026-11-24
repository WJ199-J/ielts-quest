const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
function element(){return {value:'',textContent:'',hidden:true,style:{},setAttribute(){},append(){},addEventListener(){},focus(){},select(){}};}
const fields={category:{value:'发音或音标错误'},word:{value:''},description:{value:'音标中的 r 位置不对'}};
const parts=new Map(),form={elements:fields,reportValidity:()=>true};
const dialog={...element(),querySelector:s=>s==='form'?form:parts.get(s)||parts.set(s,element()).get(s),showModal(){this.visible=true},close(){this.visible=false}};
const button=element(),memory=[];const opened=[];let nextContext={chapter:2,mission:1,title:'走进植物温室',word:'perennial',ipa:'/pəˈren.i.əl/'};
const ctx={window:{IELTS_QUEST_FEEDBACK_CONTEXT:()=>nextContext,open:(...x)=>opened.push(x)},document:{head:{appendChild(){}},body:{append(){}},createElement:tag=>tag==='dialog'?dialog:tag==='button'?button:element()},navigator:{clipboard:{writeText:async t=>memory.push(t)}},location:{href:'https://example.test/mission.html?id=7&access_token=private#secret'},URL};vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/feedback.js','utf8'),ctx);
(async()=>{
 button.onclick();assert.equal(fields.word.value,'perennial');assert.equal(opened.length,0);assert(dialog.visible);
 await parts.get('#iqFeedbackCopy').onclick();assert.equal(memory.length,1);assert(memory[0].includes('Chapter 2 · Mission 1'));assert(!memory[0].includes('private'));assert(!memory[0].includes('secret'));assert.equal(opened.length,0);
 form.onsubmit({preventDefault(){}});const url=new URL(opened[0][0]);assert.equal(url.origin,'https://github.com');assert(url.searchParams.get('body').includes('/pəˈren.i.əl/'));assert(parts.get('#iqFeedbackStatus').textContent.includes('本页未发送'));
 fields.word.value='other';assert(ctx.window.IELTS_QUEST_FEEDBACK.report(nextContext,'发音','other','问题',ctx.location.href).includes('请在说明中补充'));
 nextContext={chapter:3,mission:2,title:'另一篇文章',word:''};button.onclick();assert.equal(fields.word.value,'');assert(parts.get('#iqFeedbackContext').textContent.includes('Chapter 3'));
 ctx.navigator.clipboard.writeText=async()=>{throw Error('denied')};const previous=fields.description.value;await parts.get('#iqFeedbackCopy').onclick();assert.equal(fields.description.value,previous);assert.equal(parts.get('#iqFeedbackExport').hidden,false);
 console.log('PASS: live context, copy/GitHub drafts, no automatic submission, private URL token removal, changed-word IPA guard and denied-clipboard fallback.');
})().catch(e=>{console.error(e);process.exitCode=1});
