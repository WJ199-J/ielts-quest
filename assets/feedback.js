/* User-initiated public issue draft, with a copy alternative. No credentials or scores collected. */
(function(){
 'use strict';
 function report(context,category,word,description,href){
  const u=new URL(href),safe=new URL(u.pathname,u.origin);
  for(const key of ['id','chapter','article'])if(u.searchParams.has(key))safe.searchParams.set(key,u.searchParams.get(key));
  return [`问题类型：${category}`,`位置：${context.chapter?`Chapter ${context.chapter}`:'课程首页'}${context.mission?` · Mission ${context.mission}`:''}`,`文章：${context.title||''}`,`单词：${word||'未指定'}`,`当前音标：${word===context.word?context.ipa||'未标注':'请在说明中补充'}`,`页面：${safe.href}`,'','问题说明：',description.trim()].join('\n');
 }
 window.IELTS_QUEST_FEEDBACK=Object.freeze({report});
 const style=document.createElement('style');style.textContent=`.iq-feedback-open{position:fixed;right:16px;bottom:86px;z-index:110;padding:10px 16px;border:1px solid #0e705f;border-radius:24px;background:#fffdf8;color:#095448;font:600 14px sans-serif;cursor:pointer}.iq-feedback-dialog{width:min(500px,calc(100vw - 32px));max-height:85dvh;overflow:auto;box-sizing:border-box;border:1px solid #c8d3cd;border-radius:18px;padding:22px;background:#fffdf8;color:#183c34;font:15px/1.6 sans-serif}.iq-feedback-dialog::backdrop{background:#0008}.iq-feedback-dialog label{display:block;margin-top:12px}.iq-feedback-dialog input,.iq-feedback-dialog select,.iq-feedback-dialog textarea{width:100%;box-sizing:border-box;font:inherit;border:1px solid #b8c6bf;border-radius:8px;padding:9px;background:white;color:#183c34}.iq-feedback-dialog textarea{min-height:110px}.iq-feedback-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.iq-feedback-actions button{padding:9px 12px;border:1px solid #0e705f;border-radius:9px;background:#fff;color:#095448;font:inherit;cursor:pointer}.iq-feedback-dialog small{display:block;color:#536b62}`;document.head.appendChild(style);
 const open=document.createElement('button');open.type='button';open.className='iq-feedback-open';open.textContent='反馈问题';open.setAttribute('aria-haspopup','dialog');
 const dialog=document.createElement('dialog');dialog.className='iq-feedback-dialog';dialog.setAttribute('aria-labelledby','iqFeedbackHeading');dialog.innerHTML=`<h2 id="iqFeedbackHeading">反馈发音或内容问题</h2><p id="iqFeedbackContext"></p><form id="iqFeedbackForm"><label>问题类型<select name="category"><option>发音或音标错误</option><option>单词、释义或拼写错误</option><option>文章或答案问题</option><option>其他建议</option></select></label><label>相关单词<input name="word" maxlength="100" autocomplete="off"></label><label>问题说明<textarea name="description" maxlength="2000" required placeholder="哪里不正确？建议如何修改？可写词典来源。"></textarea></label><small>可复制后发到项目聊天框。也可前往GitHub提交，需要GitHub账号；GitHub反馈公开，请勿填写私人信息。</small><div class="iq-feedback-actions"><button type="button" id="iqFeedbackCopy">复制反馈</button><button type="submit">到GitHub提交</button><button type="button" id="iqFeedbackClose">关闭</button></div><textarea id="iqFeedbackExport" aria-label="完整反馈，可手动复制" readonly hidden></textarea><p id="iqFeedbackStatus" role="status" aria-live="polite"></p></form>`;
 document.body.append(open,dialog);
 const form=dialog.querySelector('form'),status=dialog.querySelector('#iqFeedbackStatus');let context={};
 open.onclick=()=>{context=window.IELTS_QUEST_FEEDBACK_CONTEXT?.()||{};form.elements.word.value=context.word||'';dialog.querySelector('#iqFeedbackContext').textContent=`${context.chapter?`Chapter ${context.chapter}`:'课程首页'}${context.mission?` · Mission ${context.mission}`:''} ${context.title||''}`;status.textContent='反馈尚未提交。';dialog.querySelector('#iqFeedbackExport').hidden=true;dialog.showModal();};
 dialog.querySelector('#iqFeedbackClose').onclick=()=>dialog.close();dialog.addEventListener('close',()=>open.focus());
 const body=()=>report(context,form.elements.category.value,form.elements.word.value.trim(),form.elements.description.value,location.href);
 dialog.querySelector('#iqFeedbackCopy').onclick=async()=>{
  if(!form.reportValidity())return;
  const text=body();
  try{await navigator.clipboard.writeText(text);status.textContent='已复制，请粘贴到项目聊天框发送；这里尚未提交。';}
  catch(_){const output=dialog.querySelector('#iqFeedbackExport');output.hidden=false;output.value=text;output.focus();output.select();status.textContent='无法自动复制，已选中完整反馈，请手动复制后发送。';}
 };
 form.onsubmit=event=>{event.preventDefault();if(!form.reportValidity())return;const u=new URL('https://github.com/WJ199-J/ielts-quest/issues/new');u.searchParams.set('title',`[学习反馈] ${form.elements.category.value} ${form.elements.word.value.trim()}`);u.searchParams.set('body',body());window.open(u.href,'_blank','noopener,noreferrer');status.textContent='已尝试打开GitHub反馈草稿，请在那里确认提交；本页未发送反馈。';};
})();
