# Plan: Add Balloon Type Branding

**Status:** Complete; independently reviewed and approved by Architect after static validation.

## Goal
Display the invariant game name “Balloon Type” as a subtle marker at the top of the right sidebar and in the browser tab, without restoring a page header or affecting the playable game stage.

## Context
The visible top intro was intentionally removed to preserve space for gameplay. The selected game name should be discoverable but visually quiet and remain consistent across all supported interface locales.

## Tasks
- [x] Add an invariant `Balloon Type` brand mark before the sidebar statistics in `TypingBalloonGame/index.html`, and use it as the no-JavaScript document-title fallback.
- [x] Update each localized `documentTitle` value in `TypingBalloonGame/game.js` to the invariant product name while retaining the existing locale rendering path.
- [x] Validate JavaScript syntax, inspect the diff for formatting errors, and obtain independent implementation review.

## Validation
- [x] Brand mark is the first element in the sidebar and does not introduce a game-stage header.
- [x] Switching locales keeps the sidebar brand and browser title as `Balloon Type`.
- [x] JavaScript syntax check passes (`node --check`).
- [x] Diff formatting check passes (`git diff --check`).
- [x] Independent Architect review approved the implementation after static validation.
