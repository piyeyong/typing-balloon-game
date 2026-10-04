# Plan: Fix Brand Prominence and Locale Consistency

**Status:** Approved by Architect on 2026-10-05

## Goal
Make the invariant Balloon Type game name clearly recognizable in the sidebar without affecting the playable stage, and ensure every supported locale renders a complete single-language UI on initial load and during state transitions.

## Context
The sidebar wordmark currently inherits the subdued eyebrow style and reads as a minor label. Screenshot evidence also shows a stored Simplified Chinese locale rendering an English “Start practice” action because initial startup uses a partial localization render path. A result-dialog message can similarly remain in a previous locale after the result has been saved.

## Tasks
- [x] Unify locale startup and selector-change rendering in `TypingBalloonGame/game.js` so restored locale state initializes all dynamic controls, including Start/Restart and Pause/Resume, without changing game state.
- [x] Complete result-dialog locale rendering in `TypingBalloonGame/game.js` so motivational and saved-result messages refresh in the selected locale; retain locale-invariant training content and saved player data.
- [x] Promote `Balloon Type` to a semantic sidebar heading in `TypingBalloonGame/index.html` and add dedicated responsive, accessible heading styling in `TypingBalloonGame/styles.css`, without changing game-stage layout or restoring a top header.
- [x] Run static regression checks for all four locales across idle, active, paused, pending-result, and saved-result states; validate syntax and formatting.
- [x] Obtain fresh independent review against this plan, including responsive and accessibility considerations.

## Validation
- [x] Restored `en`, `zh-CN`, `zh-TW`, and `ja` locales render the expected initial primary action immediately after load (validated by static dictionary/reference review; browser testing not performed).
- [x] Start/Restart, Pause/Resume, feedback, result dialog, leaderboard, and relevant ARIA text are localized consistently in each locale (validated by static dictionary/reference review; browser testing not performed).
- [x] Changing locale preserves target, queue, progress, score, misses, speed, timing, and paused/active state (validated by static control-flow review; browser testing not performed).
- [x] Training targets, symbols, C++ content, language autonyms, saved nicknames, and `Balloon Type` remain invariant (training-target baseline comparison passed).
- [x] The sidebar `h1` has responsive prominence styling without changing play-stage dimensions or source order (validated by static markup/CSS review; browser testing not performed).
- [x] JavaScript syntax and diff-format checks pass.
- [x] Independent review completed.

## Validation Evidence
- JavaScript syntax: PASS — `node --check TypingBalloonGame/game.js`.
- Diff formatting: PASS — `git diff --check`.
- Locale coverage: PASS — static dictionary and translation-reference checks for all supported locales and planned UI states.
- Invariant content: PASS — training-target baseline comparison found no changes to letters, words, symbols, or C++ content.
- Browser validation: NOT RUN — no browser executable or automation was available.
- Independent review: APPROVED — fresh Architect review verified the implementation against this plan, including static responsive and accessibility considerations.
