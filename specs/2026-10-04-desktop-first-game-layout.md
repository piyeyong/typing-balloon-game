# Specification: Desktop-First Game Layout

**Status:** Approved; implementation complete; interactive acceptance validation pending
**Approval Note:** The user authorized implementation after the spec/plan review cycle; no reviewer role/date marker is added here because that evidence is not present in this artifact.
**Parent:** [2026-10-04-gameplay-controls-and-compact-layout.md](2026-10-04-gameplay-controls-and-compact-layout.md)

## Problem
The current page uses a linear game shell, places round statistics and instructions over the balloon stage, and leaves settings and leaderboard content expanded in the primary flow. This competes with the stage and visual keyboard for space, makes gameplay information obscure the balloon path, and does not provide a deliberate safe state when the browser window becomes too narrow for the desktop-oriented game.

## Goal
Create a desktop-first layout in which the balloon stage and visual keyboard form the primary play area, permanent round information occupies a separate side rail, optional settings and local leaderboard content are collapsed by default, and narrow windows degrade without document-level horizontal overflow or loss of keyboard accessibility.

## User Decisions
- Desktop and laptop browsers with a physical keyboard are the supported gameplay platform.
- The balloon stage and visual keyboard are the primary visual area.
- Score, streak, lives, and speed are permanent round HUD data. They remain visible in the side rail and never overlay the balloon stage.
- Settings and the local leaderboard share the side rail but are collapsed by default.
- A full touch or mobile gameplay experience is not required. Narrow windows receive a safe fallback and an explicit recommendation to widen the window and use a physical keyboard.

## Scope

### Information architecture
- Retain the existing page header, game controls, stage, visual keyboard, local leaderboard, result dialog, and storage notice, while reorganizing their presentation around a desktop-first game layout.
- Introduce a `.game-layout` container with two main regions:
  - `.play-area` contains the balloon stage followed by the visual keyboard.
  - `<aside class="game-sidebar">` contains permanent round data, current instruction and feedback, game actions, settings, leaderboard, and storage discoverability content.
- The desktop layout uses a broad, flexible play column and a side rail constrained to approximately `260px`–`340px`. The play column receives the remaining width and must not be squeezed below the width needed for a useful stage.
- The stage itself contains only stage-owned visual content, including the balloon layer and gameplay states that spatially belong to the stage. Score, streak, lives, speed, general instructions, and action controls must not be absolutely positioned over the balloon field.
- Preserve every existing JavaScript-consumed element ID and keyboard `data-key` contract. Layout work may move existing elements or wrap them in new structural containers, but must not silently rename, duplicate, or remove identifiers that gameplay, pause, mode switching, results, or leaderboard logic queries.

### Permanent side-rail content
- Score, current streak, remaining lives, and current speed are always visible while the game page is available, including before a round, during active play, while paused, and after a round. Their existing inactive/default values may be shown when no round is running.
- Current target instruction, finger/key guidance, gameplay feedback, and Start/Restart and Pause/Resume actions remain readily visible in the non-collapsed portion of the side rail.
- Permanent side-rail data uses semantic labels and live-region behavior compatible with the existing game. Visual relocation must not increase announcement frequency or cause whole groups of HUD content to be re-announced for every stat update.
- The side rail may be sticky only when viewport height and width allow it to remain fully usable without hiding controls or trapping content. Sticky positioning is disabled in the single-column fallback.

### Collapsible settings and leaderboard
- Place settings and the local leaderboard in separate native `<details>` elements within the side rail.
- Both `<details>` elements are closed by default on initial page load. No custom toggle JavaScript is required solely to reproduce native disclosure behavior.
- Each `<summary>` clearly names its section, exposes an adequate focus indication, and provides a useful collapsed-state summary where appropriate. The leaderboard summary may show the selected mode/ranking context or a compact latest-rank cue, but must not duplicate the full table.
- Expanding or collapsing either section does not pause, restart, reset, or otherwise mutate the current round.
- Settings that remain legally changeable during an active or paused round retain their existing behavior. Settings already locked by gameplay rules remain locked; collapsing the section does not alter those rules.
- The storage/persistence notice remains discoverable when the leaderboard is collapsed. At minimum, a concise always-visible notice or cue outside the closed disclosure explains that rankings are local to this browser/profile and links or points to the expanded details for complete information.
- A newly saved result refreshes the leaderboard data even if its disclosure is closed. Saving a result must not force the leaderboard open or unexpectedly move focus.

## Responsive Layout and Breakpoints

### Wide desktop layout
- At a primary desktop breakpoint chosen during implementation, expected near `960px`–`1024px` CSS viewport width, `.game-layout` renders as a two-column grid.
- The play column is the dominant column. The side rail uses a width in the `260px`–`340px` range and does not overlap the play column.
- The stage and keyboard remain vertically associated in `.play-area`; the keyboard may use its existing internal horizontal scrolling when its rendered key layout exceeds the available play-column width.
- The page must not gain document-level horizontal scrolling at supported zoom levels. Width constraints, grid tracks, and flex/grid children use safe shrinking rules such as `min-width: 0` where needed.
- At 100% zoom on a `1366×768` viewport, the primary controls, useful stage area, permanent HUD, and enough of the keyboard to understand the active guidance are available without the HUD covering the stage. Ordinary vertical page scrolling may remain for secondary content, but gameplay must not require repeatedly scrolling between the stage and permanent round data.

### Intermediate and narrow-window fallback
- Below the desktop breakpoint, `.game-layout` becomes a single-column flow and sticky side-rail behavior is disabled.
- The implementation must define one deterministic source-order presentation for the collapsed layout. Permanent round data, guidance, and actions appear before or immediately adjacent to the play area so they remain discoverable without covering it; settings and leaderboard remain collapsed secondary content.
- The stage scales or constrains to the available inline size without clipping essential controls or creating page-level horizontal overflow.
- Only the visual keyboard region may scroll horizontally. Its scroll container must have an accessible label or surrounding heading, visible focus treatment, and a clear affordance that more keys are available off-screen. The document body, game shell, stage, and side rail must not become horizontal scroll containers.
- Show a persistent, non-modal narrow-window advisory in the single-column fallback. It must state that the game is designed for a physical keyboard and recommend widening the browser window for the intended experience.
- The advisory must not claim that touch input is supported, must not block access to settings or results, and must not automatically focus itself.
- Very narrow widths must remain structurally safe: text wraps, controls remain reachable, disclosures can open without exceeding the viewport, the result dialog remains usable, and no content is positioned off-screen. This is a safety fallback, not a promise of touch-optimized gameplay.
- Browser zoom at `200%` must trigger the same safe reflow based on available CSS viewport width rather than preserving an unusable two-column layout.

## Accessibility Requirements
- Preserve logical DOM order so keyboard and screen-reader navigation remains coherent in both grid and single-column presentation; do not use CSS visual ordering that conflicts with focus order.
- All current controls remain operable with a physical keyboard. Tab navigation, visible focus, and native Space/Enter activation must work for buttons, form controls, dialog controls, and disclosure summaries.
- Global gameplay `keydown` routing must ignore events whose target is an interactive element. The exemption must include at least `button`, `input`, `select`, `textarea`, `summary`, dialog controls, and `a[href]`, and should be implemented through a robust interactive-element/ancestor check rather than a fragile list of individual IDs.
- Space or Enter used to toggle a `<summary>` or activate a link/control must never count as gameplay input, deduct points, advance a target, or trigger pressed-key gameplay feedback.
- Native disclosure semantics must remain intact. Do not replace `<summary>` with a non-semantic custom toggle or suppress its keyboard behavior.
- Permanent stat labels must not rely on color alone. Lives, speed, score, streak, pause state, feedback, and advisory content remain understandable with text and at high contrast.
- Existing live regions, result-dialog focus management, reduced-motion behavior, and pause semantics remain functional after relocation.
- At `200%` zoom and in the narrow fallback, focused elements must not be obscured by sticky content, clipped containers, or the keyboard scroller.
- The narrow-window advisory is exposed as ordinary informational text, not an assertive alert, so it does not interrupt active gameplay announcements.

## JavaScript Lifecycle Impact
- This is primarily a structural and CSS layout change, but element relocation must be audited against all cached DOM references, delegated event handlers, focus transitions, and selectors in the existing game lifecycle.
- Existing JavaScript-consumed IDs remain stable and unique. `resetGame()`, round start/restart, immediate mode switching, pause/resume, spawn/pop/miss transitions, `endGame()`, result-dialog handling, settings state, and leaderboard refresh continue to address the same elements.
- Add no custom state solely to synchronize native `<details>` open/closed behavior. Disclosure state is presentation state and must not be coupled to round generation IDs or leaderboard persistence.
- Update global keyboard routing so events originating from `summary` and `a[href]` are treated as UI interaction, alongside the existing interactive-control exclusions. The check must also work when the event target is a descendant of an interactive element.
- A rising balloon currently uses pixel coordinates derived from the stage. Resizing, crossing the responsive breakpoint, changing browser zoom, or opening content that changes available play-area width must not leave the balloon outside the playable stage.
- During implementation, choose and document one resize policy for an active balloon:
  - Prefer a `ResizeObserver` on the stage that clamps/recomputes the balloon's horizontal position within the new stage bounds while preserving the same target, vertical progress, remaining rise time, error state, and round generation; or
  - If preserving the exact position is not reliable, use a generation-safe reposition/restart policy that preserves round statistics and cannot produce a duplicate pop, miss, timer, dialog, or leaderboard entry.
- The resize policy must work while active and paused. A paused balloon remains paused after repositioning, and stale observer/timer/animation callbacks must continue to honor the current round-generation guards.
- Entering the narrow fallback does not automatically end, pause, save, or restart a round. It may reposition the active balloon according to the selected resize policy and show the advisory.
- Opening settings or leaderboard must not recreate the stage, discard the current balloon, change its timing, or steal focus beyond the user's native disclosure interaction.

## Out of Scope
- A touch-first or fully mobile game mode.
- On-screen key presses as an alternative gameplay input mechanism.
- Gesture controls, virtual-keyboard integration, or mobile browser keyboard management.
- Changing training modes, scoring, mistake penalties, speed progression, pause semantics, result calculation, or leaderboard ranking rules.
- Replacing browser-local leaderboard persistence with accounts, cloud storage, or a backend.
- Redesigning balloon art, keyboard finger assignments, target content, or end-of-game result content except where layout safety requires responsive sizing.
- Persisting disclosure open/closed state across page loads.
- Custom disclosure animations or custom JavaScript disclosure widgets.

## Acceptance Criteria

### Desktop composition
- [ ] At and above the implemented desktop breakpoint, the page renders a broad `.play-area` and a distinct `260px`–`340px` `.game-sidebar` without overlap.
- [ ] The stage and visual keyboard are the dominant play area, and score, streak, lives, speed, general guidance, feedback, and actions occupy the side rail rather than overlaying the balloon field.
- [ ] Score, streak, lives, and speed remain visible before, during, while paused, and after a round without opening a disclosure.
- [ ] At `1366×768` and 100% zoom, the stage, permanent HUD, actions, and useful keyboard guidance can be used without repeatedly scrolling between gameplay and round data.
- [ ] All existing JavaScript-consumed IDs and keyboard `data-key` values remain unique and functional after elements are moved.

### Disclosures and interaction
- [ ] Settings and leaderboard are implemented as separate native `<details>` elements and are closed by default on initial load.
- [ ] Their `<summary>` elements can be reached with Tab and toggled with Space and Enter, with a visible focus indicator.
- [ ] Toggling disclosures does not affect active or paused round state, balloon timing, score, settings semantics, or focus unexpectedly.
- [ ] Space/Enter on summaries and links, and playable characters typed while focus is in another interactive control, do not leak into gameplay input.
- [ ] The local-storage scope/failure notice remains discoverable while the leaderboard is closed, and saved results refresh the closed leaderboard without forcing it open.

### Responsive safety
- [ ] Below the desktop breakpoint, the layout becomes a single-column flow, disables sticky positioning, and keeps permanent HUD/actions discoverable without stage overlap.
- [ ] A visible, non-modal advisory recommends widening the window and using a physical keyboard; it does not suggest touch gameplay is supported.
- [ ] At `390×844`, `360×740`, and `320×568` CSS viewports, content wraps safely, controls and disclosures remain reachable, and no document-level horizontal scrollbar appears.
- [ ] The visual keyboard is the only intentional horizontal scrolling region at narrow widths, provides a perceivable overflow affordance, and remains keyboard accessible.
- [ ] At `200%` browser zoom in a desktop-sized window, the page reflows safely, focus is not obscured, and no page-level horizontal overflow appears.
- [ ] Opening either disclosure in the narrow layout does not exceed the viewport width or make the result dialog or game actions unreachable.

### Lifecycle and regressions
- [ ] Resizing an active or paused round keeps the current balloon inside the stage according to the documented resize policy and does not change its target, score, lives, streak, or error/progress state unexpectedly.
- [ ] Repeated resizing across the breakpoint cannot produce duplicate balloons, missed-life deductions, transition callbacks, result dialogs, or leaderboard entries.
- [ ] Pause/resume, immediate mode switching, start/restart, balloon pop/miss, three-miss game over, result dialog, nickname flow, and leaderboard refresh still work after the layout change.
- [ ] Existing reduced-motion behavior and live-region announcements remain usable and do not become noisier because HUD elements moved.

## Validation Matrix

| Scenario | Viewport / input | Validation |
|---|---|---|
| Standard desktop | `1366×768`, 100% zoom, mouse + keyboard | Two-column layout; broad play area; `260px`–`340px` side rail; no HUD-stage overlap; no page-level horizontal overflow; permanent stats/actions visible. |
| Wide desktop | `1920×1080`, 100% zoom | Side rail remains bounded rather than expanding excessively; play area receives remaining width; sticky behavior, if used, never clips rail content. |
| Intermediate window | Width just above and just below the chosen breakpoint | Deterministic transition between grid and single column; no overlap, content jump that loses focus, or horizontal body overflow. |
| Narrow portrait safety | `390×844` and `360×740` | Single-column flow; sticky disabled; advisory visible; controls/disclosures reachable; keyboard alone scrolls horizontally. |
| Minimum narrow safety | `320×568` | Text and controls wrap; disclosures and dialog fit inline; no inaccessible off-screen content; no claim of touch support. |
| Zoom/reflow | Desktop window at `200%` zoom | Safe single-column reflow when needed; logical focus order; focused items unobscured; no document horizontal scrolling. |
| Disclosure keyboard use | Tab to each `<summary>` and toggle with Space/Enter during active and paused rounds | Native toggle works; gameplay state and input counters do not change; no score penalty or target advancement. |
| Other interactive elements | Activate buttons, selector, checkbox, links, and dialog controls with keyboard | UI activation occurs exactly once and does not leak into gameplay routing. |
| Active resize | Resize repeatedly while a balloon rises, including crossing the breakpoint | Balloon remains in stage under documented policy; target/progress/stats remain valid; exactly one eventual pop or miss. |
| Paused resize | Pause with a balloon visible, resize across breakpoint, then resume | Balloon remains paused and in bounds; resume continues once with correct remaining lifecycle. |
| Transition resize | Resize during pop delay, post-miss delay, and rapid mode switch | Generation guards prevent stale callbacks, duplicate spawns/misses, dialogs, or saved results. |
| Collapsed leaderboard save | Finish a round while leaderboard disclosure is closed | Result saves and board data refreshes without opening the disclosure or moving focus; storage cue remains visible. |
| Reduced motion | OS/browser reduced-motion preference enabled | Layout, pause, feedback, balloon lifecycle, disclosures, and resize policy remain usable without relying on motion. |
| Screen reader / keyboard-only | Physical keyboard with a current screen reader | Landmarks, labels, source/focus order, stat names, disclosures, advisory, live feedback, and dialog flow are understandable and operable. |
| Storage failure | Block or corrupt `localStorage` with leaderboard closed | Gameplay continues; non-blocking storage information remains discoverable without requiring the leaderboard to start open. |

## Clarification Summary
- **Provided decisions:** Settings and leaderboard default closed; score, streak, lives, and speed remain permanently visible; physical-keyboard desktop/laptop play is the target; mobile receives only a safe narrow-window fallback.
- **Research incorporated:** Existing IDs remain stable; layout separates `.play-area` and `.game-sidebar`; native disclosures require keyboard-routing exemptions; active pixel-positioned balloons require a resize policy; storage information remains discoverable while the leaderboard is closed.
- **Implementation choice remaining:** Select the exact desktop breakpoint and one generation-safe active-balloon resize policy during planning, then document both in the implementation plan and validation evidence.
