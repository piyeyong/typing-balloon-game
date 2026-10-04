# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development and validation

This is a dependency-free static web game. There is no package manifest, build step, linter, or automated test suite.

- Run locally: open `index.html` directly in a current Edge, Chrome, or Firefox browser. No local server or dependency installation is required.
- There is no automated or single-test command. Validate changes manually in a browser.
- For gameplay changes, verify at least: start/restart, correct and incorrect letter input, a balloon escaping, game-over after three misses, result statistics, target-key/finger highlighting, and narrow-screen layout.

## Architecture

The game is deliberately split into three cooperating files:

- `index.html` provides the complete static UI: score/status elements, game stage, visual QWERTY keyboard, and native `<dialog>` for end-of-game results. JavaScript locates these elements by their IDs, and the keyboard keys use `data-key` attributes.
- `game.js` owns all gameplay behavior. `TRAINING_KEYS` is the source of truth for available letters, their finger labels, and balloon colors. The `game` object holds mutable round state; one `currentBalloon` is allowed at a time. `resetGame()`, `spawnBalloon()`, keyboard handling, and `endGame()` form the game lifecycle.
- `styles.css` provides the child-focused visual design, balloon/feedback animations, responsive layout, and reduced-motion behavior. Dynamic balloon duration is supplied by JavaScript through the `--rise-duration` custom property.

## Cross-file contracts and gameplay invariants

- Keep `TRAINING_KEYS` aligned with the keyboard entries in `index.html`: every trainable letter needs exactly one matching `data-key` element so target highlighting and pressed-key feedback work.
- Balloons are buttons created dynamically in `#balloon-layer`. Their `data-target`, `data-finger`, and `data-has-error` attributes are consumed by the input, scoring, and accuracy logic.
- Input is handled globally via `keydown`; modified keys, held-key repeats, and non-letter keys are intentionally ignored. Target comparisons normalize browser input to lowercase.
- A correct key pops the current balloon and schedules the next one. A balloon that completes its CSS `rise` animation counts as a miss. `MAX_MISSES`, `BASE_RISE_DURATION`, `MIN_RISE_DURATION`, and `SPEED_UP_EVERY` define the difficulty curve.
- Preserve the `prefers-reduced-motion` rules when changing balloon or feedback animations so the game remains playable with reduced motion enabled.

## Product behavior

The README is the user-facing source for local-running instructions, Chinese game rules, keyboard-finger assignments, and the intended beginner-focused experience. The game teaches one English letter at a time; it does not implement multi-balloon play, persistence, or a backend.
