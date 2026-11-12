/* Match whole vocabulary forms in plain story text, including declared answers. */
(function () {
  "use strict";
  function escape(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function forms(item) {
    const word = item.word;
    const variants = new Set([word, ...(item.answers || [])]);
    if (/^[a-z]+$/i.test(word)) {
      variants.add(word + "s"); variants.add(word + "es");
      variants.add(word + "ed"); variants.add(word + "ing");
      if (/e$/i.test(word)) { variants.add(word + "d"); variants.add(word.slice(0, -1) + "ing"); }
      if (/[^aeiou]y$/i.test(word)) { variants.add(word.slice(0, -1) + "ies"); variants.add(word.slice(0, -1) + "ied"); }
    }
    return [...variants].filter(Boolean).sort((a, b) => b.length - a.length);
  }
  function pattern(item, flags = "gi") {
    return new RegExp("\\b(?:" + forms(item).map(escape).join("|") + ")\\b", flags);
  }
  function matches(text, items) {
    const candidates = items.flatMap(item => [...text.matchAll(pattern(item))].map(match => ({
      start: match.index, end: match.index + match[0].length, text: match[0], item
    })));
    candidates.sort((a, b) => a.start - b.start || b.end - a.end);
    let end = 0;
    return candidates.filter(candidate => {
      if (candidate.start < end) return false;
      end = candidate.end;
      return true;
    });
  }
  window.IELTS_QUEST_VOCABULARY = Object.freeze({ forms, pattern, matches });
})();
