# Specification: Multilingual layout, keyboard guidance, and escape timing

**Status:** Draft

## Goal
Improve the game layout and input guidance while providing a saved, fully localized user interface in English (default), Simplified Chinese, Traditional Chinese, and Japanese—without changing the typing-training targets.

## Context
The current desktop-first UI has a visible title block, a left sidebar, small finger labels on a uniform keyboard, and an escaped-balloon miss event that waits for a viewport-sized CSS animation to finish after the balloon has visibly left the stage. Existing user-facing text is Chinese-only. The game is a static HTML/CSS/JavaScript app with no dependencies.

## Requirements

### Layout
- Remove the visible `TYPING TRAINING`, game title, and subtitle header block. Keep localized document metadata.
- Place the sidebar after the play area in DOM order. On desktop widths, display the play area on the left and the sidebar on the right. On narrow widths, display the play area before the sidebar.
- Preserve responsive single-column behavior, accessibility, keyboard navigation order, reduced-motion support, and existing game IDs/contracts.

### Keyboard finger guidance
- Make each keyboard key’s responsible finger visually distinct through persistent finger-family grouping.
- Retain non-color information through translated visible finger labels and existing structural key cues (including F/J home markers).
- Use locale-independent finger identifiers for gameplay logic, key coloring, and Shift-hand selection; gameplay must not infer logic from translated display text.
- Preserve target-key and Shift highlighting with a stronger active treatment.

### Earlier balloon-miss timing
- A balloon must count as missed when it has cleared the game stage rather than after continuing through an off-stage viewport-sized animation path.
- Preserve the existing apparent upward movement speed by deriving the shorter stage-relative animation duration from the required travel distance.
- Keep pause/resume, round-generation invalidation, restart, reduced-motion, and resize safety correct. Do not use a separate timeout that can register misses while paused.

### Localization
- Provide English (`en`, default), Simplified Chinese (`zh-CN`), Traditional Chinese (`zh-TW`), and Japanese (`ja`).
- Translate all user-facing UI and game text, including document metadata, controls, settings, status/feedback, mode labels and descriptions, leaderboard/result dialog text, ARIA labels, keyboard finger labels, and native confirmation text.
- Do not translate or change training targets: letters, words, symbols, and C++ content remain identical across locales.
- Rename the current “练习设置” section to the locale-appropriate general “Settings” label.
- Add a language selector in Settings.
- Store the user’s selected locale in a dedicated `localStorage` key, restore it on later visits, default to English when absent/invalid/unavailable, and keep the selected locale active in-memory if persistence fails.
- A locale change during an active or paused round must re-render textual UI only; it must not alter the current target, queue, scores, timing, pause state, or persisted leaderboard records/nicknames.

## Scope boundaries
- No backend, network localization service, dependency, build system, or translation of training content.
- No automatic conversion of existing saved leaderboard nicknames.
- No visual-only CSS order workaround that conflicts with reading/tab order.

## Acceptance criteria
- [ ] Desktop has no visible title/header block, places play area left and sidebar right, and narrow layout places play area before sidebar.
- [ ] Every supported locale updates all user-visible interface/game text and metadata; English is the first-visit default.
- [ ] Locale preference restores from storage without interfering with leaderboard storage behavior.
- [ ] Keyboard finger assignments are visually distinct, accessible without relying on color alone, and gameplay uses stable nonlocalized identifiers.
- [ ] A balloon’s miss occurs on clearing the game stage at the existing perceived rise speed; pause, resize, restart, and reduced-motion behavior remain correct.
- [ ] JavaScript syntax/static checks pass and manual browser validation covers each locale, layout breakpoint, language persistence, keyboard guidance, and balloon lifecycle.

## Clarification Summary
- **R1:** Remove all three visible header lines: `TYPING TRAINING`, the game title, and subtitle.
- **R2:** Sidebar belongs on the right at desktop widths, using DOM order that keeps play area first for narrow layouts and assistive technology.
- **R3:** “Earlier” escape handling means stage-relative miss timing; preserve apparent balloon speed instead of slowing a shortened animation.
- **R4:** Translate interface and game text only. Training letters, words, and C++ targets remain unchanged.
- **R5:** Supported locales are English (default), Simplified Chinese, Traditional Chinese, and Japanese. The selector belongs in Settings and the chosen locale is saved.
