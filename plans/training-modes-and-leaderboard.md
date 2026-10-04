# Plan: Training Modes and Local Leaderboard

**Parent Spec:** [training-modes-and-leaderboard.md](../specs/training-modes-and-leaderboard.md)
**Status:** Approved by PM on 2026-03-10
**Status:** Approved by Architect on 2026-03-10

## Goal
Deliver the approved compact start layout, six playable training modes, optional wrong-input deductions, and per-mode local leaderboards without adding dependencies.

## Context
Extend the existing static browser game while preserving its three-miss round ending, progressive speed, responsive design, and reduced-motion behavior.

## Tasks

- [ ] **Task 1: Build the compact controls and expanded game UI**  
  **Files/Scope:** `TypingBalloonGame/index.html`, `TypingBalloonGame/styles.css`  
  Add the top controls card, mode description, penalty option, restart affordance, printable US-QWERTY keyboard, leaderboard region, and mobile-scrollable result dialog.  
  **Verify:** All controls, keyboard keys, and leaderboard placeholders remain usable at desktop and narrow mobile widths.

- [ ] **Task 2: Implement the six-mode target and input engine**  
  **Files/Scope:** `TypingBalloonGame/game.js` — mode configuration, target generation, character progression, input filtering, case matching, target timing, active-round settings  
  Implement the exact character sets and starter word/C++ content, visible Space labels, multi-character progression, length-aware timing, ignored key categories, physical-key guidance, active-round setting capture/locking, and restart confirmation.  
  **Verify:** Every mode generates valid targets; words/tokens retain completed prefixes after errors; Shift guidance and all matching rules behave as specified.

- [ ] **Task 3: Complete scoring and round statistics**  
  **Files/Scope:** `TypingBalloonGame/game.js` — scoring, streaks, misses, accuracy counters, completion flow  
  Preserve target-level scoring and speed progression while adding flawless-target tracking, optional five-point floor-zero deductions based on the captured setting, per-character correct/incorrect counts, and longest streak.  
  **Verify:** Penalty-on and penalty-off rounds produce the expected scores and statistics, and three escaped balloons still end the round.

- [ ] **Task 4: Add resilient local leaderboards and result reporting**  
  **Files/Scope:** `TypingBalloonGame/game.js`, `TypingBalloonGame/index.html`, `TypingBalloonGame/styles.css`, `TypingBalloonGame/README.md`  
  Add versioned namespaced storage, nickname collection and sanitization, independent top-ten rankings per mode/penalty pair, deterministic tie-breaking, rank summaries, current-board rendering, in-memory fallback, and non-blocking storage notices. Update the README with the six modes, input/case rules, optional deduction, accuracy definition, leaderboard/nickname flow, and `file://` persistence limitations.  
  **Verify:** Qualifying and non-qualifying results rank correctly; malformed or unavailable `localStorage` does not interrupt gameplay; switching mode or penalty selection shows the correct board.

## Validation

- [ ] Capture the existing game’s baseline behavior before changes.
- [ ] Exercise all six modes against their approved target sets and case rules; assert home row is exactly `ASDFJKL`, common-character punctuation is exactly `. , ! ? ' " - : ; ( )`, full keyboard is all and only 95 printable ASCII characters, and Space is visible.
- [ ] Test correct, incorrect, ignored, repeated, shortcut, composition, Space, uppercase, and shifted-symbol inputs.
- [ ] Verify restart confirmation, unfinished-round discard, scoring, accuracy, longest streak, timing, and three-miss completion.
- [ ] Verify leaderboard persistence, exact-accuracy tie-breaks and all other ranking tie-breaks, nickname cancellation fallback/limit and `textContent` rendering, pair isolation, every finished score including non-top-ten `未进入前十名`, mixed valid/malformed entries, corrupted-storage recovery, failed writes, and in-memory fallback retention.
- [ ] Check desktop, narrow mobile, reduced-motion, keyboard overflow, focus behavior, and internally scrolling result dialog.
- [ ] Run available project checks and complete fresh-context code review before commit.
