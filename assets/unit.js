/* Chapter 1 hidden connected stories replace the retired checkpoint page. */
(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  const rules=window.IELTS_QUEST_HIDDEN_RULES;
  const articles=window.IELTS_QUEST_HIDDEN_CHAPTER1 || [];
  const sessions=window.IELTS_QUEST_QUIZ_SESSIONS;
  const chapter=Number(new URLSearchParams(location.search).get('chapter'))||1;
  const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=()=>{try{return JSON.parse(localStorage.getItem('ieltsQuestV1'))||{missions:{},words:{},units:{}};}catch(_){return {missions:{},words:{},units:{}};}};
  const owner=()=>{try{return JSON.parse(localStorage.getItem('ieltsQuestAuthSession'))?.user?.id||'guest';}catch(_){return 'guest';}};
  let state=read(), index=-1, draft=null, currentOwner=owner(), feedbackWord=null;
  window.IELTS_QUEST_FEEDBACK_CONTEXT=()=>({chapter,mission:index>=0?`隐藏文章 ${index+1}`:"",title:articles[index]?.titleZh||"",word:feedbackWord?.word||"",ipa:feedbackWord?.ipa||""});
  const signature=a=>JSON.stringify([a.id,a.story,a.newCoreWords.map(w=>[w.word,w.answers,w.acceptedAlternatives])]);
  const progress=()=>state.missions||{};
  function persist() {
    if(!draft || index<0)return;
    const ok=sessions.save(articles[index].id,{...draft,signature:signature(articles[index])});
    $('saveNotice').textContent=ok?'本轮作答已保存在本设备，刷新后可继续。':'本设备保存失败，请不要关闭页面。正式成绩保存状态见下方提示。';
  }
  function drawList() {
    const enabled=chapter===1;
    if(!enabled){$('courseHeading').textContent=`Chapter ${chapter} 拓展尚未开放`;$('courseIntro').textContent='请先完成Chapter 1隐藏故事测试与验收。';}
    const base=[1,2,3,4,5,6].filter(id=>rules.formal(progress()[id])).length;
    $('gateNote').textContent=enabled?`基础 Mission：${base}/6 过关。六篇正式成绩均达到90%后，可打开隐藏文章开关；随后逐篇过关解锁。`:'本章拓展文章尚未开放。旧独立单句测验已移除，请先测试Chapter 1。';
    $('hiddenToggle').disabled=!enabled||base<6;
    if($('hiddenToggle').disabled){$('hiddenToggle').checked=false;$('articlePath').hidden=true;}
    $('articlePath').innerHTML=enabled?articles.map((a,i)=>{
      const unlocked=rules.gate(state,articles,i),r=progress()[a.id]||{};
      return `<button class="story-entry" data-index="${i}" ${unlocked?'':'disabled'}><span>${String(i+1).padStart(2,'0')}</span><span><b>${escape(a.titleZh)}</b><small>${escape(a.title)} · ${escape(a.level)} · ${a.newCoreWords.length}个新词${Number(r.attempts)?` · 正式最高${Number(r.bestScore)||0}%`:''}</small></span><span>${!unlocked?'未解锁':rules.formal(r)?'✓ 复习':'阅读'}</span></button>`;
    }).join(''):'';
    $('articlePath').querySelectorAll('[data-index]').forEach(b=>b.onclick=()=>openArticle(Number(b.dataset.index)));
    const finished=articles.filter(a=>rules.formal(progress()[a.id])).length;
    $('hiddenProgress').textContent=enabled?`${finished}/${articles.length} 篇过关`:'等待Chapter 1验收';
  }
  function openArticle(i) {
    state=read();
    if(chapter!==1 || !rules.gate(state,articles,i)){drawList();return;}
    index=i;feedbackWord=null;const a=articles[i];draft=sessions.get(a.id,signature(a));
    $('articleTitle').textContent=a.title;
    $('articleTitleZh').textContent=`隐藏文章 ${i+1}/${articles.length} · ${a.titleZh} · ${a.level} · ${a.time}`;
    $('articleShell').hidden=false;
    const target=new URL(location.href);target.searchParams.set('article',String(i+1));history.replaceState(null,'',target);
    renderArticle();
    $('articleShell').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function studyText(a) {
    return a.story.map(p=>`<p>${decorate(p.en,a,false)}</p>`).join('');
  }
  function decorate(text,a,quiz) {
    const matches=window.IELTS_QUEST_VOCABULARY.matches(text,a.newCoreWords);
    let cursor=0,html='';
    matches.forEach(m=>{
      html+=escape(text.slice(cursor,m.start));cursor=m.end;
      if(quiz){const value=draft.answers[m.item.word]||'',marked=draft.submitted,ok=draft.feedback?.[m.item.word];
        html+=`<input class="story-input ${marked?(ok?'correct':'wrong'):''}" data-word="${escape(m.item.word)}" value="${escape(value)}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="第${a.newCoreWords.findIndex(w=>w.word===m.item.word)+1}空"/>`;
      }else html+=`<button class="story-word" data-word="${escape(m.item.word)}">${escape(m.text)}</button>`;
    });
    return html+escape(text.slice(cursor));
  }
  function renderArticle() {
    if(index<0)return;
    const a=articles[index],testing=draft?.stage==='quiz'||draft?.stage==='result';
    $('storyBody').innerHTML=testing?a.story.map(p=>`<p>${decorate(p.en,a,true)}</p>`).join(''):studyText(a);
    $('wordDetail').textContent=testing?'测试时词义与译文暂时收起。':'点击文章中的下划线词语查看释义并听发音。';
    $('wordDetail').hidden=testing;
    $('startStoryQuiz').hidden=testing;
    $('quizActions').hidden=!testing;
    $('showTranslation').hidden=testing&&!draft?.submitted;
    $('translation').hidden=true;
    $('translation').textContent='';
    $('studyNote').textContent=testing?`保留完整故事语境，隐藏${a.newCoreWords.length}个目标词；同词重复出现只计一题。首次提交计正式成绩，之后修改只算纠错。`:'先读完整故事，点击词语学习。句级翻译默认隐藏；测试提交后可查看。';
    $('showTranslation').hidden=!draft?.firstScore&&draft?.firstScore!==0;
    $('resultPanel').hidden=!draft?.submitted;
    if(draft?.submitted){
      $('resultHeading').textContent=draft.submissions>1?'本轮纠错结果':'本轮正式结果';
      $('roundScore').textContent=`${draft.score}%`;
      $('resultMessage').textContent=`首次正式分：${draft.firstScore}% · 本轮${draft.correct}/${a.newCoreWords.length}正确。纠错不改变正式最高分、进度和测试次数。下一步由你选择。`;
      $('answerList').innerHTML=a.newCoreWords.filter(w=>!draft.feedback?.[w.word]).map(w=>`<li>${escape(w.word)}：${escape(w.meaning)}</li>`).join('')||'<li>本轮全部答对。</li>';
    }
    const record=progress()[a.id]||{};
    $('formalBest').textContent=`${Number(record.bestScore)||0}%`;
    $('formalAttempts').textContent=String(Number(record.attempts)||0);
    $('formalBar').style.width=`${Number(record.progressScore)||0}%`;
    $('submitStoryQuiz').textContent=draft?.submissions?'检查纠错答案':'提交正式测试';
    $('nextStory').disabled=index+1>=articles.length||!rules.gate(state,articles,index+1);
    $('nextStory').textContent=index+1>=articles.length?'本章隐藏文章已到最后一篇':'阅读下一篇';
    $('storyBody').querySelectorAll('.story-word').forEach(b=>b.onclick=()=>{
      const item=a.newCoreWords.find(w=>w.word===b.dataset.word);feedbackWord=item;
      $('wordDetail').innerHTML=`<b>${escape(item.word)}</b><small>${escape(item.ipa)} · ${escape(item.pos)}</small><p>${escape(item.meaning)}</p><small>原书第${item.sourcePage}页</small> <button id="speakWord" type="button">听发音</button>`;
      $('speakWord').onclick=()=>speak(item.word);
    });
    $('storyBody').querySelectorAll('.story-input').forEach(input=>input.oninput=()=>{
      draft.answers[input.dataset.word]=input.value;
      $('storyBody').querySelectorAll('.story-input').forEach(other=>{if(other.dataset.word===input.dataset.word)other.value=input.value;});
      persist();
    });
  }
  function speak(word) {
    if(!('speechSynthesis' in window)){ $('saveNotice').textContent='当前浏览器不支持发音，请换用系统浏览器。';return; }
    const utterance=new SpeechSynthesisUtterance(word);utterance.lang='en-GB';utterance.rate=.85;
    utterance.onerror=()=>{$('saveNotice').textContent='发音暂不可用，请检查系统英语语音或稍后重试。';};
    speechSynthesis.cancel();speechSynthesis.speak(utterance);
  }
  function startRound() {
    if(index<0||!rules.gate(read(),articles,index))return;
    draft={stage:'quiz',answers:{},submissions:0,submitted:false,firstScore:null,score:null,feedback:{}};
    persist();renderArticle();
  }
  function submit() {
    state=read();
    if(index<0||!draft||!rules.gate(state,articles,index))return;
    $('storyBody').querySelectorAll('.story-input').forEach(input=>{draft.answers[input.dataset.word]=input.value;});
    const a=articles[index],result=rules.grade(a,draft.answers),first=draft.submissions===0;
    if(first){
      // Re-read immediately before writing, preserving unrelated Mission/word/unit records.
      rules.recordFirst(state,a,result);
      try{localStorage.setItem('ieltsQuestV1',JSON.stringify(state));}
      catch(_){$('saveNotice').textContent='正式成绩保存失败，尚未提交；请清理设备存储后重试。';return;}
      draft.firstScore=result.score;
    }
    Object.assign(draft,result,{submissions:draft.submissions+1,submitted:true,stage:'result'});
    persist();
    if(first)window.IELTS_QUEST_SYNC?.schedule();
    drawList();renderArticle();
    // Deliberately no navigation or scroll: all scores stay on this result page.
  }
  function returnToReading() {
    if(!draft)return;
    // Reading after an unfinished test abandons it; a subsequent test starts a fresh round.
    if(draft.submissions===0&&!confirm('返回阅读会结束当前未提交测试；再次开始时将重新作答。'))return;
    if(draft.submissions===0){draft=null;sessions.save(articles[index].id,{signature:signature(articles[index]),stage:'study'});}
    else {draft.stage='study';persist();}
    renderArticle();
  }
  $('hiddenToggle').onchange=()=>{ $('articlePath').hidden=!$('hiddenToggle').checked; if(!$('hiddenToggle').checked)$('articleShell').hidden=true; };
  $('startStoryQuiz').onclick=()=>{if(draft?.submissions&&!confirm('开始新一轮正式测试？当前正式成绩会保留，本轮答案将清空。'))return;startRound();};
  $('submitStoryQuiz').onclick=submit;
  $('newStoryRound').onclick=()=>{if(confirm('清空本轮答案并重新正式测试？历史正式成绩保持不变。'))startRound();};
  $('returnReading').onclick=returnToReading;
  $('nextStory').onclick=()=>openArticle(index+1);
  $('showTranslation').onclick=()=>{
    const allowed=draft&&Number(draft.submissions)>0;
    if(!allowed)return;
    $('translation').hidden=!$('translation').hidden;
    $('translation').innerHTML=articles[index].story.map(p=>`<p>${escape(p.en)}<br><span>${escape(p.zh)}</span></p>`).join('');
  };
  $('themeToggle').onclick=()=>{
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('ieltsQuestTheme',next);
  };
  document.documentElement.dataset.theme=localStorage.getItem('ieltsQuestTheme')||'light';
  function refresh() {
    const changedOwner=owner()!==currentOwner;currentOwner=owner();state=read();drawList();
    if(index>=0 && (!rules.gate(state,articles,index)||changedOwner)){
      index=-1;draft=null;$('articleShell').hidden=true;
    }else if(index>=0)renderArticle();
    else {
      const n=Number(new URLSearchParams(location.search).get('article'));
      if(n>0&&chapter===1&&rules.gate(state,articles,n-1)){
        $('hiddenToggle').checked=true;$('articlePath').hidden=false;openArticle(n-1);
      }
    }
  }
  window.addEventListener('ieltsquest:progress-synced',refresh);
  window.addEventListener('ieltsquest:auth-change',refresh);
  window.addEventListener('storage',refresh);
  refresh();
})();
