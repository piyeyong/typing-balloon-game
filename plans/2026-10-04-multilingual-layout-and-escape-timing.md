# Plan: Multilingual layout, keyboard guidance, and escape timing

**Status:** Draft
**Parent spec:** `specs/2026-10-04-multilingual-layout-and-escape-timing.md`

## Goal
Deliver a right-sidebar, header-free UI with clearer finger guidance, stage-relative balloon misses, and saved English/Chinese/Japanese localization.

## Tasks
- [ ] Task 1: Restructure [index.html](../TypingBalloonGame/index.html) for play-area-first DOM order, header removal, right-sidebar desktop layout, Settings language control, stable keyboard finger identifiers, and localizable text hooks.
- [ ] Task 2: Update [styles.css](../TypingBalloonGame/styles.css) for the header-free/right-sidebar responsive grid, accessible persistent finger-family keyboard grouping, target emphasis, and a stage-relative balloon animation contract.
- [ ] Task 3: Refactor [game.js](../TypingBalloonGame/game.js) to use a complete locale catalog and renderer, independent saved-locale persistence, stable finger identifiers, safe language changes, and localized runtime/ARIA/native-dialog text.
- [ ] Task 4: Replace viewport-based rise completion with stage-relative travel/duration calculation while retaining pause, resize, generation, and reduced-motion safeguards; validate lifecycle behavior.
- [ ] Task 5: Run syntax/static and browser checks across all locales and key viewports; perform independent implementation review and address findings.

## Validation
- [ ] Baseline captured.
- [ ] `node --check TypingBalloonGame/game.js` passes.
- [ ] Static checks verify all locale keys, selector/ID contracts, locale-independent finger metadata, and no color-only keyboard guidance.
- [ ] Manual browser validation covers the four locales, locale persistence, desktop/narrow order, keyboard highlighting, stage-exit misses, pause, resize, restart, reduced motion, and leaderboard/result flow.
- [ ] Independent review completed.
