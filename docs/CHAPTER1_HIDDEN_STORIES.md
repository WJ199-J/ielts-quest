# Chapter 1 hidden connected stories

Date: 2026-11-24. Replaces the former Unit-level isolated-sentence checkpoint, not the original Missions. Updated 2026-11-24: base course expands to 134 while original IDs 1–98 remain.

## Delivery

- 15 connected, bilingual stories, progressing from daily observation to geographical and environmental explanation. Story lengths are 130–217 English words. New target items total 180, without counting repeated review words.
- Coverage baseline: the printed Chapter 1 index contains 241 entries; 61 have evidence in the existing base Missions and all remaining 180 now have a hidden-story target and original story location. See `chapter1-hidden-coverage.json`. This is an index-headword coverage claim, not a claim to cover all book illustrations, derivatives or every meaning.
- Target data include source page, contextual meaning, IPA, part of speech and speech playback. New prose, translations and pronunciation annotations are editorial learning content, not presented as original-book sentences.
- Existing Mission IDs/stories, grading and cloud-sync rules remain. Pronunciation-only edits preserve current draft semantics. Hidden progress uses distinct string Mission IDs (`ch1-hidden-01` … `ch1-hidden-15`) supported by the existing cloud merge. Hidden results are excluded from the base-course denominator (now 134 after the separately authorised 36-article expansion). The retired Unit's stored results are retained but are not used to unlock or score the new stories.

## Unlock and scoring

The original six Chapter 1 Missions must all have formal scores >=90 and accepted completion evidence. The learner can then turn on the hidden-story switch. Each hidden story unlocks after the preceding hidden stories have formally passed at >=90. Direct URLs use the same guard. This is a client-side educational prerequisite, not secret or paid-content access control.

Study uses complete connected paragraphs, clickable definitions and pronunciation; translation starts hidden. Test retains the full narrative and hides all occurrences of the target words, with mirrored inputs for repetitions. A repeated word is scored once. Source forms and explicitly listed contextual alternatives are accepted; generic fabricated inflections are not accepted.

Only first submission in a fresh round writes formal best/last/progress and increments formal attempts. Corrections only update round feedback. 92 -> corrected 100 retains formal 92 and one attempt. An independent later formal round can improve the best. Real scores are retained, not forced to 100. Submission never navigates; reading, retry and next are explicit learner actions. Drafts/results survive refresh on the same device and are scoped by account. Formal scores use the original account sync, subject to Supabase availability.

## Source removal

`assets/unit.js`, `unit.html`, `data/units.js`, `assets/unit.css` and homepage summary were replaced in place. The isolated-sentence candidate pool, word-card arrays/rendering, 50-question randomiser and its submission path were removed from current source. No late script override or CSS hiding patch is used. Only Chapter 1 is released; Chapters 2–5 have no replacement tests yet. Other chapters also have no legacy checkpoint entry pending this design's approval.

## Validation

- `node scripts/test-learning.cjs`: prior formal-score/correction regression and original learning engine checks pass.
- `node scripts/test-units.cjs`: 134 assignments with original 98 IDs retained, 15 stories, 180 distinct new targets, exact 61+180=241 partition, source location/lexical fields, prerequisite gate and retired-source checks pass.
- `node scripts/test-hidden-ui.cjs`: executes actual UI controller against isolated DOM/storage harness. Locked direct URLs, Chapter 2–5 blocked, Study/Test separation, draft/result restoration, 92->100 correction isolation, attempts count, manual next and preservation of unrelated Mission/word/old Unit data pass.
- Syntax and `git diff --check` pass.
- Real Chromium browser launch was blocked by this executor's socket restrictions. DOM harness is not a browser visual or physical-phone acceptance result. User review of connected prose, pronunciation output and real-device layout remains required.

## Follow-on difficulty revision

The former 130–217-word episodes restarted too easily. Each now includes a specific investigation brief, connected observations, analysis of evidence and a reasoned outcome: 318–411 English words, following original Mission 6 (302 words under the same tokenizer). The five editorial stages are evidence comparison; conditional and causal reasoning; models and limitations; multiple variables; synthesis and argument. Each stage contains three articles, with consolidation rather than a requirement that every next story be longer. These labels are editorial targets, not independently validated CEFR ratings. The retained 180 targets still appear within their assigned connected stories. Assessment remains contextual vocabulary recall, not a newly claimed comprehension exam.
