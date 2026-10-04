# Plan: Publish the typing balloon game to GitHub Pages

**Status:** Draft

## Goal
Version the complete project in `piyeyong/typing-balloon-game` and automatically deploy only the static game directory to GitHub Pages.

## Context
The repository is public, empty, and the authenticated GitHub account has `ADMIN` permission. The repository root contains versioned specifications and plans, while the static site lives in `TypingBalloonGame/`; GitHub Pages must therefore be deployed through GitHub Actions with `TypingBalloonGame/` as the artifact path.

## Tasks
- [ ] Task 1: Add `.github/workflows/deploy-pages.yml` at the repository root. Trigger on pushes to `main` and manual dispatch; grant minimal Pages permissions; upload `./TypingBalloonGame`; deploy the artifact through the official Pages actions.
- [ ] Task 2: Initialize the repository on `main`, set the repository-local author identity to `Yeyong Pi <piyeyong@gmail.com>`, and configure `https://github.com/piyeyong/typing-balloon-game.git` as `origin`.
- [ ] Task 3: Validate the site and deployment configuration: run `node --check TypingBalloonGame/game.js`, inspect the workflow YAML and staged diff, and confirm that only intended project files are staged.
- [ ] Task 4: Obtain an independent review of the Pages workflow and initial-publication scope, address any findings, then present the final commit draft for explicit confirmation before staging, committing, pushing, and enabling GitHub Actions as the Pages source.

## Validation
- [ ] Pre-change baseline captured: repository is empty; local directory is not a Git worktree; authenticated viewer permission is `ADMIN`.
- [ ] JavaScript syntax check passes.
- [ ] Workflow deploys only `TypingBalloonGame/`, not `plans/` or `specs/`.
- [ ] Independent review completed.
- [ ] User explicitly confirms the final commit draft.
- [ ] Push succeeds and the Pages deployment reports a public URL.
