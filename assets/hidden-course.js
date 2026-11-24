/* Shared hidden-story rules. Formal first submissions and answer correction are separate. */
(function () {
  'use strict';
  function formal(record = {}) {
    return record.completed === true && ['first-submit-90-plus','first-submit-100','user-confirmed-legacy-completion'].includes(record.completionMethod) && Number(record.progressScore || record.completionScore || record.bestScore) >= 90;
  }
  function gate(state, articles, index) {
    if (![1,2,3,4,5,6].every(id=>formal(state.missions?.[id]))) return false;
    return index >= 0 && index < articles.length && articles.slice(0,index).every(a=>formal(state.missions?.[a.id]));
  }
  function normalize(value) { return String(value || '').trim().toLowerCase().normalize('NFKC').replace(/[’]/g,"'").replace(/[.!?,;:]/g,'').replace(/\s+/g,' '); }
  function grade(article, answers) {
    const feedback = {}; let correct = 0;
    article.newCoreWords.forEach(item=>{
      const surfaces = article.story.flatMap(p => [...p.en.matchAll(window.IELTS_QUEST_VOCABULARY.pattern(item, 'gi'))].map(m => m[0]));
      const accepted = [item.word, ...(item.answers || []), ...surfaces, ...(item.acceptedAlternatives || [])];
      const ok = accepted.some(form=>normalize(form)===normalize(answers[item.word]));
      feedback[item.word]=ok; if(ok)correct++;
    });
    return {feedback,correct,total:article.newCoreWords.length,score:Math.round(correct/article.newCoreWords.length*100)};
  }
  function recordFirst(state, article, result, assisted = false) {
    state.missions ||= {};
    const record = state.missions[article.id] ||= {bestScore:0,lastScore:0,progressScore:0,attempts:0,completed:false};
    if (assisted) return record;
    record.attempts=(Number(record.attempts)||0)+1;
    record.lastScore=result.score;
    record.bestScore=Math.max(Number(record.bestScore)||0,result.score);
    record.progressScore=record.bestScore;
    record.completionRuleVersion=3;
    if(result.score>=90){record.completed=true;record.completionMethod='first-submit-90-plus';record.completionScore=record.bestScore;record.completedAt ||= new Date().toISOString();}
    return record;
  }
  window.IELTS_QUEST_HIDDEN_RULES=Object.freeze({formal,gate,grade,recordFirst});
})();
