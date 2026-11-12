# M2 / M3 execution record — 2026-11-12

## Delivery boundary

This patch implements device-local quiz recovery and several course-engine corrections. M2 and M3 are NOT accepted as complete. The source-coverage report, full lexical enrichment, original course-scale requirement, and real-phone acceptance remain open. Existing Mission IDs, stories, chapter structure, and accepted completion records are retained.

## Implemented

- Preserve selected quiz words, typed answers, first submitted score, corrected score, marking and screen stage on this device. Refresh restores the same attempt and does not increment the attempt counter.
- Separate drafts by guest/account. Drafts do not sync to another device; established aggregate account progress still uses the existing cloud path.
- Returning to the original story during an unsubmitted quiz makes that round practice-only; a new unassisted round can still count as completed.
- Keep the historical Mission 2/3 compatibility repair, while marking new attempts with completionRuleVersion=2 so corrected new attempts cannot trigger that repair.
- Match declared surface answers and common e-ending verb forms; accept the exact inflected form hidden in a sentence. Add equipped as an explicit answer for equip.
- Render vocabulary and cloze matches against plain text without nesting generated markup.
- Avoid repeating the same selected word set when unused candidates exist. Full-pool quizzes cannot promise different holes; this is explicitly outstanding.
- Restore three unresolved review terms (sunlight, scientific research, museum) through a review glossary.
- Add part of speech and contextual collocations to Mission 1 and Mission 98. Add missing IPA to the six Mission 98 words. These are sample changes only.
- Mobile word details open in a closable bottom panel; inputs use at least 16px type and 44px height. Speech synthesis reports start/end/error. Real iOS/Android output is pending.

## Verification

- `node scripts/test-learning.cjs`: formal first-submit completion; correction-only 100%; counter remains unchanged on correction; input draft persistence; version/signature invalidation; guest/account separation; practice-only assistance; inflected answers; all 98 missions' cloze rendering.
- `node scripts/audit-course.cjs --write`: reproducible per-Mission report in course-audit.json; 22 chapters, 98 unique continuous IDs, no unresolved core terms or review references after this patch.
- Local browser: Mission 4 draft survives reload; 0% result survives reload; correction to 100% stays incomplete and attempts remain 1; new first-submit 100% unlocks next Mission, stays on results after reload, attempts become 2.
- Local browser: Mission 1 first-submit 100% and reload; Mission 98 first-submit 100%, reload and final-Mission notice; Mission 26 equipped is decorated and can be tested.
- Local browser: new Mission 3 attempt corrected to 100% stays incomplete after reload, with attempts=1.
- Browser data above is disposable test-profile data, not the learner's progress. These checks do not constitute real-phone or all-course content acceptance.

## Source and remaining content decision

The uploaded source has been located: 雅思词汇真经PDF高清彩色版.pdf, 337 pages. Its table of contents and sample vocabulary pages have been read, including Chapter 22 pages 319–322 (PDF page numbers). No further source upload is currently needed. OCR phonetic transcriptions require checking; a full source-to-course mapping has not yet been completed.

The repository specification recommends 6–10 core words for introductory short stories; the project control also requires about 100 core learning items and about 50 questions per story. The current 98 Missions contain 6–21 new words each. All 98 fail the latter scale requirement. Expanding each to about 100 requires rewriting the course rather than a small patch and changes the meaning of already-completed Missions.

Concrete options for the owner:

1. Keep existing short Missions and IDs as the introductory/legacy course; develop a separate advanced course with about 100 items and 50 questions per Mission, preserving old progress separately.
2. Keep short progressive Missions as the formal course; group several Missions into roughly 100-item learning units and provide a 50-question unit review. This changes the original per-Mission requirement and needs owner approval.

Do not silently reduce or reinterpret the original requirement. Continue full lexical/source coverage work against the selected structure after this decision. M3 cannot pass until content requirements and real-phone behavior are accepted.
