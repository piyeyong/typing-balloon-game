# Plan: Alternate Round Scoring

## Goal
Alternate game rounds in the same page session: odd-numbered rounds display “加油” and award points for every accepted A–Z input; even-numbered rounds display “祝你好运” and award no points for accepted A–Z input.

## Context
The user clarified that “按什么” means the existing accepted English-letter input domain only. Modified keys, repeated keydown events, non-letter keys, and input while no active balloon exists remain ignored.

## Tasks
- [ ] Task 1: Add persistent round-number and scoring-mode state in `TypingBalloonGame/game.js`; increment the round exactly once at every start/restart and derive odd/even behavior from it.
- [ ] Task 2: Add a visible, accessible round message to `TypingBalloonGame/index.html` and matching responsive styling in `TypingBalloonGame/styles.css`.
- [ ] Task 3: Update keyboard-input and score feedback logic in `TypingBalloonGame/game.js` so each accepted A–Z input awards points only in odd rounds, while target correctness, balloon progression, streaks, accuracy, and misses retain their existing behavior.
- [ ] Task 4: Manually verify first start, both restart paths, accepted/ignored input cases, game-over statistics, responsive layout, and reduced-motion behavior.

## Validation
- [ ] Round sequence alternates `加油` → `祝你好运` → `加油` during one page session.
- [ ] Odd rounds award points to both target and non-target accepted A–Z inputs.
- [ ] Even rounds keep the score at zero for all accepted A–Z inputs.
- [ ] Existing target-key highlighting, finger guidance, balloon lifecycle, and result metrics work correctly.
- [ ] Review completed before commit.
