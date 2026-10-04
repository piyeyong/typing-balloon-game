# Plan: 扩展盲打气球游戏的训练字母

**Status:** Draft

## Goal
将游戏从基准键扩展至完整英文字母键盘，同时持续显示目标键和对应手指，保持儿童盲打入门的教学重点。

## Context
当前游戏仅练习 `A/S/D/F/J/K/L`。用户试玩确认基础玩法可用，希望加入更多字母。扩展后应覆盖全部 26 个小写英文字母，但每次仍只出现一个气球；键盘提示必须包含所有可出现的目标键和相应手指归属。

## Tasks
- [ ] Task 1: 更新 `Agent/TypingBalloonGame/index.html` 的键盘布局，展示 QWERTY 三排完整字母键及每键的手指标签。
- [ ] Task 2: 更新 `Agent/TypingBalloonGame/game.js` 的训练键位配置，覆盖 26 个字母并准确标注左右手及对应手指。
- [ ] Task 3: 更新 `Agent/TypingBalloonGame/styles.css` 和 `README.md`，确保完整键盘在桌面与移动屏幕保持可读，并说明完整字母练习范围。
- [ ] Task 4: 运行 JavaScript 语法、静态诊断和变更检查；手动验证随机目标能高亮正确键位。

## Validation
- [ ] 26 个小写英文字母均可成为气球目标。
- [ ] 每个目标都显示正确的手及手指提示，并在完整键盘上高亮。
- [ ] 原有计分、漏球、结束和加速行为不变。
- [ ] 小屏幕下键盘不遮挡或溢出页面。
- [ ] Review completed (if significant).
