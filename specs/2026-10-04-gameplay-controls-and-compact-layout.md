# Specification: Immediate Mode Switching, Pause, and Compact Gameplay Layout

**Status:** Approved by Engineer on 2026-03-10
**Status:** Approved by Architect on 2026-03-10
**Parent:** [2026-10-03-training-modes-and-leaderboard.md](2026-10-03-training-modes-and-leaderboard.md)

## Problem
The current game locks its difficulty selector during an active round, incorrectly recommends Shift for case-insensitive introductory targets, separates controls from the balloon stage with enough vertical content to require scrolling, and has no pause control.

## Goal
Let players switch difficulties immediately, provide accurate keyboard guidance, keep the controls and useful balloon stage visible together on common screens, and let players pause and resume the exact current game state.

## User Decisions
- Difficulty may be changed at any time.
- Changing difficulty immediately abandons the current balloon and starts a new unpaused round using the selected mode; it does not save a score or create a leaderboard entry.
- Add a pause/resume button.

## Functional Requirements

### Immediate mode switching

- The mode selector remains enabled during active and paused rounds.
- Choosing a new mode during a round immediately discards the current round without confirmation, clears its balloon/progress/feedback/highlights, resets score and statistics, and starts a new unpaused round in the selected mode.
- The penalty setting remains locked for the active round. A mode change retains the current captured penalty setting unless the player changes it before a new non-active round begins.
- A mode switch invalidates all callbacks, animation handlers, and transition timers from the discarded round. The old round must not create a missed balloon, extra balloon, result dialog, or leaderboard entry later.

### Guidance correctness

- Shift guidance is based on the active mode’s matching semantics.
- Shifted punctuation always guides the required printable key and Shift key.
- Uppercase letters guide Shift only for case-sensitive modes.
- Case-insensitive modes, including the introductory `ASDFJKL` mode and common-word mode, must not highlight or recommend Shift for an uppercase display character; either letter case remains accepted.

### Pause and resume

- Add a secondary Pause button adjacent to Start/Restart.
- Before a game starts, the button is disabled. In an active round it says `暂停`; while paused it says `继续` and exposes `aria-pressed="true"`.
- Pausing freezes the current balloon’s visual motion, game input, and pending inter-balloon transition. It shows a visible paused status without changing target/progress/error state/score/streak/lives.
- Resuming continues the same balloon at the frozen position with its remaining time and restores input.
- Pausing while a pop or post-miss transition is pending freezes and resumes that transition exactly once.
- A queued rise completion that wins an event-order race with pause becomes a deferred miss processed once after resume if its balloon/round is still current.
- Pressing Space/Enter on UI controls must activate those controls rather than count as gameplay input.

### Compact layout

- Place the stage directly after the compact top controls card.
- Keep essential current guidance and statistics visible in or immediately adjacent to the stage; move nonessential large blocks below the stage or collapse them during active play.
- At 100% zoom on 1366×768 desktop and 360×740/390×844 mobile portrait, the mode selector, start/pause controls, and a useful part of the stage are visible without initial document scrolling.
- Preserve access to the mode selector while active, the keyboard’s horizontal overflow on narrow screens, responsive layout, reduced-motion behavior, and keyboard accessibility.

## Technical Constraints

- Add a round generation ID and round-owned transition-timer tracking. Increment/invalidate it for restart, mode switch, and game end. Every animation callback and delayed transition verifies its captured generation.
- Use CSS `animation-play-state: paused` on the stage paused state to freeze all balloon animations.
- Game keyboard processing must return for paused state and events originating from interactive controls/dialog controls.
- Existing three-miss end condition, mode definitions, scoring, accuracy, local leaderboard, and file-local persistence behavior remain unchanged except that abandoned switched rounds are never recorded.

## Acceptance Criteria

- [ ] The mode selector is usable during active and paused rounds; selecting a mode immediately starts a fresh, unpaused round without recording the discarded round.
- [ ] Rapid mode switching, switching during pop/post-miss delay, and switching while paused cannot cause stale balloons, score changes, dialogs, or leaderboard entries.
- [ ] Intro and common-word case-insensitive uppercase displays never request Shift; full-keyboard uppercase targets and shifted punctuation retain correct Shift guidance.
- [ ] Pause freezes balloon animation, input, and pending transitions; resume continues the identical target/progress and completes future transitions exactly once.
- [ ] UI controls retain Space/Enter activation and do not leak those keystrokes into game input.
- [ ] Desktop and target mobile viewports show controls plus useful stage area without initial page scrolling.
- [ ] Existing responsive, reduced-motion, scoring, accuracy, end-game, and leaderboard behavior still works.

## Clarification Summary

- **Exchange 1:** User reported locked difficulty, erroneous Shift guidance, excessive scrolling between controls/stage, and asked whether pause should be added.
- **Exchange 2:** User chose immediate mode switching that abandons the active round and confirmed pause/resume should be included.
