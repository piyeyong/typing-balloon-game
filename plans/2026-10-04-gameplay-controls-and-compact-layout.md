# Plan: Gameplay Controls and Compact Layout

**Status:** Approved by PM on 2026-03-10
**Status:** Approved by Architect on 2026-03-10
**Spec:** [2026-10-04-gameplay-controls-and-compact-layout.md](../specs/2026-10-04-gameplay-controls-and-compact-layout.md)
**Parent Spec:** [2026-10-03-training-modes-and-leaderboard.md](../specs/2026-10-03-training-modes-and-leaderboard.md)

## Goal
Enable immediate race-safe mode switching, accurate Shift guidance, exact pause/resume behavior, and a compact responsive layout while preserving existing gameplay, scoring, and leaderboard behavior.

## Context
The static direct-file browser game currently locks mode selection during a round, always recommends Shift for uppercase display targets, lacks pause/resume, and places too much content between the controls and stage.

## Tasks

- [x] **Task 1: Add the compact control and stage structure** (`TypingBalloonGame/index.html`, `TypingBalloonGame/styles.css`)
  - Add a secondary Pause button beside Start/Restart, initially disabled, with accessible pressed/status semantics.
  - Place the stage directly after the compact controls card; keep essential statistics and finger guidance in or immediately adjacent to it, while moving or collapsing nonessential content below active play.
  - Add responsive button grouping, paused-stage styling, and `.game-stage.is-paused .balloon { animation-play-state: paused; }`.
  - Preserve narrow-screen keyboard overflow, focus indicators, dialog behavior, and reduced-motion rules.

- [x] **Task 2: Make round lifecycle callbacks generation-owned and cancelable** (`TypingBalloonGame/game.js`: `game` state, `resetGame`, `spawnBalloon`, `popBalloon`, `missBalloon`, `endGame`)
  - Add a monotonically increasing round generation ID plus tracked round-owned transition timers.
  - Centralize round invalidation/cleanup for restart, mode switch, and game end; every animation callback and delayed transition must capture and verify its generation and balloon identity before mutating state.
  - Ensure invalidation removes stale balloons, clears pending transitions and deferred events, resets transient feedback/guidance, and cannot save an abandoned result.
  - Cover races from rapid mode switches, switch/restart during pop or post-miss delays, stale `animationend`, and callbacks firing after game end or a newer round starts.

- [x] **Task 3: Implement immediate mode switching, pause/resume, and corrected input guidance** (`TypingBalloonGame/game.js`: control locking/presentation, event handlers, timer helpers, `handleKeyDown`, `shouldIgnoreInput`, `updateTargetGuidance`, `getCharacterGuidance`)
  - Keep mode selection enabled during active and paused rounds; on change, abandon the current generation without confirmation or result recording and start a fresh unpaused round using the selected mode while retaining the captured penalty setting. While inactive, a mode change updates only description and leaderboard presentation; it does not start a round. Keep the penalty checkbox locked during both active and paused states.
  - Implement pause state and button behavior: before play and after game end, disable it with label `暂停` and `aria-pressed="false"`; during an active round use label `暂停`; while paused use label `继续` and `aria-pressed="true"`. Freeze balloon animation and the tracked pop/post-miss transition timers with stored remaining delay, block gameplay input, show paused status, and resume the same target/progress and each transition exactly once.
  - Ensure restart, mode switch, and game end clear paused state, deferred rise completion, and pending transition state; every newly started round is unpaused.
  - If rise completion races with pause, defer the miss and process it once after resume only when its generation and balloon remain current.
  - Ignore gameplay handling for events originating from interactive controls or dialog controls so Space/Enter still activate them normally.
  - Require Shift for shifted punctuation and for uppercase letters only in case-sensitive modes; never recommend Shift for uppercase display letters in case-insensitive modes.

- [x] **Task 4: Update instructions and complete regression validation** (`TypingBalloonGame/README.md`; manual browser validation of `index.html`)
  - Document immediate mode switching, penalty-setting behavior, pause/resume, abandonment semantics, and mode-sensitive Shift guidance.
  - Run syntax/static checks available without adding dependencies, then execute the validation matrix below in current Edge, Chrome, or Firefox via `file://`.

## Validation

- [ ] **Baseline:** Before changes, record current start/restart, six-mode gameplay, three-miss ending, scoring/accuracy, leaderboard persistence, responsive layout, and reduced-motion behavior.
- [ ] **Lifecycle races:** Verify inactive mode selection changes only presentation; rapid repeated active mode changes require no confirmation, retain the captured penalty setting, and create no saved abandoned result; mode change while paused; mode change/restart during pop and post-miss delay; stale rise `animationend`; pause concurrent with rise completion; repeated pause/resume; and old callbacks firing after a newer round or result dialog. Each event must produce at most one transition/miss and no stale score, balloon, dialog, or leaderboard entry.
- [ ] **Pause fidelity:** Verify the button is disabled with `暂停`/`aria-pressed=false` before play and after game end, then test its active `暂停` and paused `继续`/`aria-pressed=true` states. Pause an active rise, pop delay, and post-miss delay; confirm animation, input, and timer remain frozen, then resume the identical state with the correct remaining time.
- [ ] **Guidance/input:** Confirm intro and common-word uppercase displays accept either case without Shift guidance; full-keyboard uppercase and shifted punctuation retain Shift guidance; Space/Enter on selector/buttons/dialog controls do not enter gameplay.
- [ ] **Responsive/accessibility:** At 100% zoom, verify controls and useful stage area without initial scrolling at `1366×768`, `360×740`, and `390×844`; verify keyboard horizontal scrolling, keyboard-only operation, focus visibility, pause announcements, and reduced-motion mode.
- [ ] **Regression:** Confirm all six modes, penalty capture, scoring, streaks, accuracy, three-miss ending, result dialog, and separate local leaderboards remain unchanged except that abandoned switched rounds are never recorded. Verify a cancelled restart leaves the exact active/paused state intact and an accepted restart begins a fresh unpaused round.
- [ ] **Review:** Obtain fresh code review approval against the governing spec before commit.
