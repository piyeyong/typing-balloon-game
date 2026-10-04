# Specification: Training Modes, Mistake Penalties, and Local Leaderboard

**Status:** Approved by Engineer on 2026-03-10
**Status:** Approved by Architect on 2026-03-10

## Problem
The current page requires users to scroll between starting and playing, supports only single-letter training, has no configurable mistake penalty, and does not preserve scores.

## Goal
Create a static-browser typing game that starts from a compact top control card and offers six fully playable training modes, an optional five-point wrong-input deduction, and separate local top-ten leaderboards.

## User Decisions
- Controls and the start/restart action belong in a compact card near the page top.
- All six modes must be playable in the first release.
- Wrong-input deduction is optional; when enabled, each playable wrong input deducts 5 points with a minimum score of 0.
- Leaderboards use browser `localStorage` only.
- Intro mode contains exactly `A`, `S`, `D`, `F`, `J`, `K`, and `L`.
- Common characters are `a-z`, `0-9`, Space, and exactly `. , ! ? ' " - : ; ( )`.
- Full keyboard contains all 95 printable US-ASCII characters (`U+0020` through `U+007E`), including Space and backtick, and excludes Enter, Tab, and Backspace.
- Common words use short, high-frequency English words appropriate for children.
- C++ mode uses basic characters, operators, keywords, and tokens, such as `;`, `{}`, `++`, `return`, and `std::`.
- Uppercase full-keyboard targets match their final character. Either Shift or Caps Lock may produce a valid uppercase letter; UI guidance recommends Shift. Shifted symbols require their corresponding shifted character.
- The training layout and physical-key guidance assume a US-QWERTY keyboard; matching is based on the character emitted by the browser.
- Restarting an active round requires confirmation and discards that unfinished round without saving it.
- Ask for a nickname in the result dialog after each finished round. Blank or cancelled input uses `小玩家`; names are limited to 12 characters and rendered as plain text. Record finished rounds even when they do not enter the top ten.

## Scope

### Training modes

| ID | Label | Targets |
|---|---|---|
| `home-row` | 入门级 | `A S D F J K L` |
| `letters` | 26 个字母 | Case-insensitive `a-z` |
| `common-characters` | 常用字符 | Lowercase letters, digits, Space, and common text punctuation |
| `full-keyboard` | 全键盘 | Printable US-QWERTY characters, including uppercase and shifted symbols |
| `common-words` | 常用单词 | Short, high-frequency English words |
| `cpp` | C++ 编程 | Common C++ characters, operators, basic keywords, and tokens |

### Interaction and scoring

- One balloon is active at a time. A round still ends after three escaped balloons; the existing progressive speed increase remains.
- A single-character target pops after one correct input.
- A word or token remains in one balloon and advances one character at a time. The next expected character receives keyboard/finger guidance. Its rise duration is the normal current difficulty duration plus 0.8 seconds for every character after the first, capped at 14 seconds.
- A playable input is any printable US-ASCII character, including Space. Pressing a printable character that does not match the next expected character is a wrong input even when that character is outside the selected mode. Standalone modifier keys, shortcuts, repeated keydown events, composition/dead keys, and navigation/control keys are ignored.
- Home-row, letters, common characters, and common-word targets compare letters case-insensitively. Full-keyboard and C++ targets compare their exact character sequence, except uppercase letters accept a matching character emitted through either Shift or Caps Lock.
- Space displays as `空格` in the balloon and guidance rather than appearing empty.
- A wrong playable input resets the streak and marks that target as non-flawless; it does not erase already completed target characters.
- If the penalty option is enabled, each wrong playable input deducts up to 5 points; the score cannot fall below 0. Penalty-disabled rounds keep the existing no-deduction behavior.
- Correct completion keeps the existing target-level points model: base points, streak multiplier, and a first-try bonus only when the full target had no wrong input.
- `correctInputs` increases for each correct character that advances a target; `incorrectInputs` increases for each playable mismatch. Accuracy is `correctInputs / (correctInputs + incorrectInputs)`, expressed as a percentage; escaped balloons add neither. The leaderboard stores longest streak, not final streak.
- The selected mode and penalty option are captured at round start and cannot change while a round is active.

### Keyboard model

- Expand the visual keyboard to a printable US-QWERTY layout: number/symbol row, letters, punctuation, Shift keys, and Space.
- Use semantic keyboard values for target matching and physical codes for visual key feedback.
- For uppercase and shifted symbols, highlight both Shift and the printable key.
- Preserve reduced-motion support and horizontal keyboard scrolling on narrow screens.

### Leaderboard

- Store versioned data under a namespaced `localStorage` key.
- Keep independent top-ten rankings for each `(mode, penalty enabled)` pair. The board below the keyboard always shows the currently selected pair and refreshes after a completed result is saved.
- Prompt for a nickname in the result dialog after a finished game and before recording the score. Blank/cancelled input becomes `小玩家`; limit the value to 12 characters and render it with `textContent`.
- Each entry includes nickname, mode, penalty setting, score, completed target count, longest streak, correct/incorrect input counts, misses, and timestamp.
- Rank by score descending, then exact accuracy (`correctInputs / (correctInputs + incorrectInputs)`), completed targets, longest streak, fewer incorrect inputs, then earlier timestamp. The compact result summary states the achieved rank or `未进入前十名`.
- Read/write failures or malformed stored data must not block gameplay; show a non-blocking notice and retain new in-memory results alongside valid loaded results for the current page session. Rankings are browser/profile/file-URL-specific under `file://` and may not persist when the file moves or opens in another browser.

## UI

- Add a responsive controls card directly below the title with: mode selector, short mode description, mistake-deduction checkbox, and prominent start/restart button.
- Keep the game stage close to the controls after start, focusing the stage without scrolling the document.
- Place the detailed leaderboard below the keyboard. Show a compact result/rank summary in the end dialog.
- Make the result dialog scroll internally on small screens.

## Out of Scope

- Shared or server-backed rankings.
- Accounts, authentication, cloud synchronization, or multiplayer.
- Training Enter, Tab, Backspace, navigation keys, or function keys.
- Custom user-provided word lists.

## Acceptance Criteria

- [ ] The start/restart controls are usable without manually scrolling past the header.
- [ ] Each of the six modes produces playable targets from its exact configured set, including visible Space targets and the defined common/full-character membership.
- [ ] Word and C++ token targets advance character by character, retain a correct prefix after an error, and pop only after completion with length-aware timing.
- [ ] Printable mismatches count as wrong inputs; repeated, composition, shortcut, modifier-only, navigation, and control inputs remain ignored.
- [ ] Penalty-on wrong inputs deduct five points without allowing a negative score; penalty-off wrong inputs do not deduct points.
- [ ] Case rules work as defined: non-full modes are case-insensitive; uppercase full-keyboard targets accept emitted uppercase through Shift or Caps Lock; shifted symbols match exactly.
- [ ] The selected mode and penalty setting remain stable for the active round; an active restart requires confirmation and does not save its unfinished result.
- [ ] Three escaped balloons still end a round; speed progression remains; accuracy and longest streak follow their specified formulas.
- [ ] Nickname fallback, length limit, cancellation, and non-qualifying leaderboard results follow the specified behavior.
- [ ] Results are stored and rendered as separate local top-ten lists per mode and penalty setting, and show the current pair below the keyboard.
- [ ] Game play remains functional if `localStorage` is unavailable, malformed, or corrupted.
- [ ] The layout remains usable at narrow mobile and desktop widths and with reduced motion enabled.

## Clarification Summary

- **Exchange 1:** Confirmed local-only leaderboard, five-point floor-zero penalty, all six modes immediately playable, and a compact top controls card.
- **Exchange 2:** Confirmed exact intro keys, character/key scope, child English/C++ starter content, and post-round nickname entry.
- **Remaining gaps:** Specific starter word and C++ token lists will be selected during implementation within the approved content categories.
