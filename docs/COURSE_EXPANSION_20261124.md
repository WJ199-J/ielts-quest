# Course expansion — 2026-11-24

Status: implemented and automated checks passed; publication and owner acceptance are separate steps.

## Scope and preservation

- Chapter 1 hidden follow-on stories: 15 retained IDs and 180 retained source targets, now 318–411 English words per connected investigation, following the original Mission 6 baseline of 302. Five stages of evidence comparison, conditional/causal reasoning, models and limitations, multiple variables, synthesis. Three stories per stage permit consolidation; these are editorial difficulty targets, not externally certified CEFR levels.
- Chapters 5–22: two complete bilingual stories each, with six new source-index targets per story and context-matched review vocabulary. Total 36 new articles / 216 additional chapter-specific index entries. New numeric IDs 99–134 are inserted into chapter navigation, not renumbered over existing records.
- Chapters 1, 3, 4 retain six articles; Chapter 2 retains eight. All other chapters now have six. Base-course total: 134. Hidden-story results remain separate from this denominator.
- All original 98 story texts, translations, targets, answers, IDs and assessment settings are unchanged. Source phonetic omissions are filled; semantic hashes exclude only pronunciation metadata and verify the rest byte-equivalently after canonical JSON encoding.
- Existing scores/attempts are not cleared. The overall percentage may decrease because there are 36 additional base articles to learn; this is a denominator change, not loss of progress. A chapter previously complete at 4/4 now has two outstanding articles and becomes 4/6.

## Pronunciation

The existing source had 1,151 missing core/support pronunciation records. These are filled, and all 216 new target records include IPA. Existing nonempty IPA remains intact. Existing review terms resolve through the shared vocabulary catalogue. Support-word clicks now display supplied IPA as well as meaning.

New American-English broad IPA uses the official CMU Pronouncing Dictionary (https://github.com/cmusphinx/cmudict), ARPAbet conversion and onset-based stress placement; selected heteronyms retain alternative readings. Unlisted terms use manually edited British broad IPA. Per-word accent/source fields distinguish the annotations; American entries are labelled in the UI and request en-US speech. Existing British entries continue to request en-GB. See CMUDICT_LICENSE.txt for attribution. These are course pronunciation annotations, not transcriptions taken from the source book. Device speech availability/voice quality still requires a real-device listening check.

IPA-only enrichment preserves the submitted draft/result flag by comparing lexical signatures without pronunciation fields. Thus a refresh after the update cannot turn a previously submitted correction into a new formal attempt merely because its IPA changed. A materially revised hidden story invalidates that story’s old device draft, but does not delete its separately stored official score.

## Assessment and unlocks

Unchanged: each round’s first clean submission counts officially; corrections do not alter official best/last score, progress, completion or attempts. A clean >=90 passes, retaining its actual score. Results stay until the learner chooses the next action. Chapter 1 hidden prerequisites still require all six base Missions, followed by sequential >=90 hidden passes. Chapter 2–22 hidden courses remain closed pending Chapter 1 acceptance.

## Verification and remaining acceptance

- `node scripts/test-course-expansion.cjs`: 134 unique IDs, all 22 chapter counts, 36 new articles / 216 unique chapter targets, old 98 semantic hashes, complete core/support IPA, five hidden stages, submitted-draft compatibility, HTML load order.
- `node scripts/test-learning.cjs`: real grading controller, new numeric IDs, formal/correction score isolation, 90-plus gates, cloud merge, context inflections and all-Mission input rendering.
- `node scripts/test-units.cjs`: hidden coverage, gates and legacy-checkpoint removal.
- `node scripts/test-hidden-ui.cjs`: real hidden page controller with isolated DOM/storage; refresh/result/manual next/answer correction and unrelated-data preservation.
- `node scripts/audit-course.cjs --write`: 0 unmatched configured targets, 0 unknown review references, 0 missing core IPA across base course.
- `git diff --check`: passed.

Real Chromium is unavailable in this execution environment because its socket setup is blocked. Controller tests are not visual, mobile or real-audio acceptance. The user must still test layout, device playback, the revised hidden difficulty and the new chapter articles. This delivery does not claim that all remaining book vocabulary has been incorporated: the source-index coverage advances from 956 to 1,172 base entries, plus 180 hidden Chapter 1 entries (1,352 / 3,673 chapter-index entries); 2,321 still need connected stories.
