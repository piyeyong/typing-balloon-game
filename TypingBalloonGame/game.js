const HOME_ROW_TARGETS = [..."ASDFJKL"];
const LETTER_TARGETS = [..."abcdefghijklmnopqrstuvwxyz"];
const COMMON_PUNCTUATION_TARGETS = [".", ",", "!", "?", "'", '"', "-", ":", ";", "(", ")"];
const COMMON_CHARACTER_TARGETS = [
  ...LETTER_TARGETS,
  ..."0123456789",
  " ",
  ...COMMON_PUNCTUATION_TARGETS,
];
const FULL_KEYBOARD_TARGETS = Array.from({ length: 95 }, (_, index) => String.fromCharCode(32 + index));

const COMMON_WORD_TARGETS = [
  "a", "and", "at", "be", "big", "blue", "book", "boy", "can", "cat",
  "come", "day", "dog", "down", "find", "for", "fun", "get", "go", "good",
  "happy", "he", "help", "here", "home", "I", "in", "is", "it", "jump",
  "like", "little", "look", "make", "me", "my", "not", "one", "play", "red",
  "run", "said", "see", "she", "the", "this", "to", "up", "we", "you",
];

const CPP_TARGETS = [
  ";", "{", "}", "{}", "(", ")", "[", "]", "#", "<", ">", "=", "+", "-", "*", "/",
  "::", "++", "--", "==", "!=", "<=", ">=", "&&", "||", "->", "+=", "-=", "*=", "/=",
  "int", "bool", "char", "double", "void", "auto", "const", "if", "else", "for", "while",
  "return", "true", "false", "class", "public", "private", "include", "main", "std::",
  "cout", "cin", "endl", "vector", "string", "nullptr",
];

const MODES = {
  "home-row": {
    label: "入门级",
    description: "只练习基准区域的 A、S、D、F、J、K、L，输入时不区分大小写。",
    targets: HOME_ROW_TARGETS,
    caseSensitive: false,
  },
  letters: {
    label: "26 个字母",
    description: "练习 A 到 Z，输入时不区分大小写。",
    targets: LETTER_TARGETS,
    caseSensitive: false,
  },
  "common-characters": {
    label: "常用字符",
    description: "练习小写字母、数字、空格和常用标点，字母输入不区分大小写。",
    targets: COMMON_CHARACTER_TARGETS,
    caseSensitive: false,
  },
  "full-keyboard": {
    label: "全键盘",
    description: "练习全部 95 个可打印美式键盘字符；大写字母和符号需要输入准确字符。",
    targets: FULL_KEYBOARD_TARGETS,
    caseSensitive: true,
  },
  "common-words": {
    label: "常用单词",
    description: "逐个字母练习适合儿童的常用英文单词，输入时不区分大小写。",
    targets: COMMON_WORD_TARGETS,
    caseSensitive: false,
  },
  cpp: {
    label: "C++ 编程",
    description: "逐个字符练习 C++ 基础符号、运算符、关键字和常用标记，字符需准确匹配。",
    targets: CPP_TARGETS,
    caseSensitive: true,
  },
};

const KEY_CODE_BY_CHARACTER = {
  "`": "Backquote", "~": "Backquote",
  "1": "Digit1", "!": "Digit1",
  "2": "Digit2", "@": "Digit2",
  "3": "Digit3", "#": "Digit3",
  "4": "Digit4", "$": "Digit4",
  "5": "Digit5", "%": "Digit5",
  "6": "Digit6", "^": "Digit6",
  "7": "Digit7", "&": "Digit7",
  "8": "Digit8", "*": "Digit8",
  "9": "Digit9", "(": "Digit9",
  "0": "Digit0", ")": "Digit0",
  "-": "Minus", "_": "Minus",
  "=": "Equal", "+": "Equal",
  "[": "BracketLeft", "{": "BracketLeft",
  "]": "BracketRight", "}": "BracketRight",
  "\\": "Backslash", "|": "Backslash",
  ";": "Semicolon", ":": "Semicolon",
  "'": "Quote", '"': "Quote",
  ",": "Comma", "<": "Comma",
  ".": "Period", ">": "Period",
  "/": "Slash", "?": "Slash",
  " ": "Space",
};

for (const letter of LETTER_TARGETS) {
  KEY_CODE_BY_CHARACTER[letter] = `Key${letter.toUpperCase()}`;
  KEY_CODE_BY_CHARACTER[letter.toUpperCase()] = `Key${letter.toUpperCase()}`;
}

const SHIFTED_SYMBOLS = new Set('~!@#$%^&*()_+{}|:"<>?');
const FINGER_COLORS = {
  "左手小指": "#ec7b53",
  "左手无名指": "#a969d8",
  "左手中指": "#f5a946",
  "左手食指": "#ff6b81",
  "右手食指": "#6d78e8",
  "右手中指": "#6dc5a8",
  "右手无名指": "#4fa5d5",
  "右手小指": "#56a5db",
  "拇指": "#32a982",
};

const MAX_MISSES = 3;
const BASE_RISE_DURATION = 7;
const MIN_RISE_DURATION = 3.4;
const SPEED_UP_EVERY = 5;
const EXTRA_DURATION_PER_CHARACTER = 0.8;
const MAX_RISE_DURATION = 14;
const LEADERBOARD_STORAGE_KEY = "typing-balloon-game:leaderboards";
const LEADERBOARD_STORAGE_VERSION = 1;
const LEADERBOARD_LIMIT = 10;
const DEFAULT_NICKNAME = "小玩家";
const MAX_NICKNAME_LENGTH = 12;
const BALLOON_EDGE_GAP = 12;
const BALLOON_BOB_DISTANCE = 10;
const INTERACTIVE_INPUT_SELECTOR = [
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "a[href]",
  "dialog",
  "[contenteditable]:not([contenteditable='false'])",
  "[role='button']",
  "[role='link']",
].join(", ");
const POP_TRANSITION_DELAY = 360;
const MISS_TRANSITION_DELAY = 550;

const elements = {
  startButton: document.querySelector("#start-button"),
  pauseButton: document.querySelector("#pause-button"),
  pauseStatus: document.querySelector("#pause-status"),
  restartButton: document.querySelector("#restart-button"),
  modeSelect: document.querySelector("#mode-select"),
  modeDescription: document.querySelector("#mode-description"),
  penaltyCheckbox: document.querySelector("#penalty-checkbox"),
  stage: document.querySelector("#game-stage"),
  stageMessage: document.querySelector("#stage-message"),
  balloonLayer: document.querySelector("#balloon-layer"),
  feedback: document.querySelector("#feedback"),
  score: document.querySelector("#score-value"),
  streak: document.querySelector("#streak-value"),
  lives: document.querySelector("#lives-value"),
  speed: document.querySelector("#speed-value"),
  fingerBadge: document.querySelector("#finger-badge"),
  instruction: document.querySelector("#instruction-text"),
  resultDialog: document.querySelector("#result-dialog"),
  finalScore: document.querySelector("#final-score"),
  finalPopped: document.querySelector("#final-popped"),
  finalStreak: document.querySelector("#final-streak"),
  finalAccuracy: document.querySelector("#final-accuracy"),
  resultMessage: document.querySelector("#result-message"),
  resultRanking: document.querySelector("#result-ranking"),
  resultRankSummary: document.querySelector("#result-rank-summary"),
  nicknameInput: document.querySelector("#nickname-input"),
  saveResultButton: document.querySelector("#save-result-button"),
  skipResultButton: document.querySelector("#skip-result-button"),
  leaderboardContext: document.querySelector("#leaderboard-context"),
  leaderboardList: document.querySelector("#leaderboard-list"),
  storageNotice: document.querySelector("#storage-notice"),
};

const leaderboardState = {
  boards: {},
  sessionResults: [],
  pendingResult: null,
  persistenceAvailable: true,
};

const balloonResizeState = {
  observer: null,
  frameId: null,
  generation: null,
  balloon: null,
};

const game = {
  active: false,
  paused: false,
  generation: 0,
  currentBalloon: null,
  transition: null,
  deferredMiss: null,
  score: 0,
  streak: 0,
  longestStreak: 0,
  popped: 0,
  misses: 0,
  correctInputs: 0,
  incorrectInputs: 0,
  firstTryHits: 0,
  activeModeId: null,
  penaltyEnabled: false,
  targetQueue: [],
  lastTarget: null,
  targetProgress: 0,
};

function invalidateRound() {
  game.generation += 1;
  cancelBalloonResizeFrame();
  clearTransition();
  game.deferredMiss = null;
  game.paused = false;
  game.currentBalloon = null;
  game.targetProgress = 0;
  elements.stage.classList.remove("is-paused");
  elements.balloonLayer.replaceChildren();
}

function resetGame({ savePending = true } = {}) {
  const selectedModeId = MODES[elements.modeSelect.value] ? elements.modeSelect.value : "letters";

  invalidateRound();
  if (savePending && leaderboardState.pendingResult) {
    savePendingResult(DEFAULT_NICKNAME);
  }
  if (elements.resultDialog.open) {
    elements.resultDialog.close();
  }
  renderSelectedLeaderboard();

  game.active = true;
  game.currentBalloon = null;
  game.score = 0;
  game.streak = 0;
  game.longestStreak = 0;
  game.popped = 0;
  game.misses = 0;
  game.correctInputs = 0;
  game.incorrectInputs = 0;
  game.firstTryHits = 0;
  game.activeModeId = selectedModeId;
  game.penaltyEnabled = elements.penaltyCheckbox.checked;
  game.targetQueue = [];
  game.lastTarget = null;
  game.targetProgress = 0;

  elements.stageMessage.hidden = true;
  elements.startButton.textContent = "重新开始";
  setRoundControlsLocked(true);
  updatePauseControl();
  updateModePresentation();
  clearFeedback();
  updateDashboard();
  spawnBalloon();
  elements.stage.focus({ preventScroll: true });
}

function setRoundControlsLocked(locked) {
  elements.modeSelect.disabled = false;
  elements.penaltyCheckbox.disabled = locked;
}

function updatePauseControl(announcement = "") {
  elements.pauseButton.disabled = !game.active;
  elements.pauseButton.textContent = game.paused ? "继续" : "暂停";
  elements.pauseButton.setAttribute("aria-pressed", String(game.paused));
  elements.stage.classList.toggle("is-paused", game.paused);
  if (announcement) {
    elements.pauseStatus.textContent = announcement;
  }
}

function clearTransition() {
  if (!game.transition) {
    return;
  }
  if (game.transition.timerId !== null) {
    window.clearTimeout(game.transition.timerId);
  }
  game.transition = null;
}

function startTransition(delay, generation, balloon, callback) {
  clearTransition();
  const transition = {
    generation,
    balloon,
    callback,
    remaining: delay,
    startedAt: performance.now(),
    timerId: null,
  };
  game.transition = transition;
  if (!game.paused) {
    armTransition(transition);
  }
}

function armTransition(transition) {
  transition.startedAt = performance.now();
  transition.timerId = window.setTimeout(() => {
    if (game.transition !== transition) {
      return;
    }
    game.transition = null;
    if (game.active && game.generation === transition.generation) {
      transition.callback();
    }
  }, transition.remaining);
}

function pauseTransition() {
  const transition = game.transition;
  if (!transition || transition.timerId === null) {
    return;
  }
  transition.remaining = Math.max(0, transition.remaining - (performance.now() - transition.startedAt));
  window.clearTimeout(transition.timerId);
  transition.timerId = null;
}

function resumeTransition() {
  if (game.transition && game.transition.timerId === null) {
    armTransition(game.transition);
  }
}

function getActiveMode() {
  return MODES[game.activeModeId] || MODES.letters;
}

function refillTargetQueue() {
  const nextCycle = [...getActiveMode().targets];
  shuffle(nextCycle);

  if (nextCycle.length > 1 && nextCycle[0] === game.lastTarget) {
    const differentIndex = nextCycle.findIndex((target) => target !== game.lastTarget);
    [nextCycle[0], nextCycle[differentIndex]] = [nextCycle[differentIndex], nextCycle[0]];
  }

  game.targetQueue = nextCycle;
}

function getNextTarget() {
  if (game.targetQueue.length === 0) {
    refillTargetQueue();
  }

  const target = game.targetQueue.shift();
  game.lastTarget = target;
  return target;
}

function getNormalRiseDuration() {
  return Math.max(
    MIN_RISE_DURATION,
    BASE_RISE_DURATION - Math.floor(game.popped / SPEED_UP_EVERY) * 0.55,
  );
}

function getTargetRiseDuration(target) {
  return Math.min(
    MAX_RISE_DURATION,
    getNormalRiseDuration() + Math.max(0, target.length - 1) * EXTRA_DURATION_PER_CHARACTER,
  );
}

function spawnBalloon() {
  if (!game.active || game.paused || game.currentBalloon) {
    return;
  }

  const generation = game.generation;
  const target = getNextTarget();
  const balloon = document.createElement("button");
  const duration = getTargetRiseDuration(target);

  balloon.type = "button";
  balloon.className = "balloon";
  balloon.style.setProperty("--rise-duration", `${duration}s`);
  balloon.setAttribute("aria-label", `输入 ${formatTargetForSpeech(target)}`);
  balloon.dataset.target = target;
  balloon.dataset.hasError = "false";
  balloon.dataset.targetLength = target.length >= 8 ? "long" : target.length >= 4 ? "medium" : "short";

  balloon.addEventListener("animationend", (event) => {
    if (
      event.animationName !== "rise"
      || !game.active
      || game.generation !== generation
      || game.currentBalloon !== balloon
    ) {
      return;
    }
    if (game.paused) {
      game.deferredMiss = { generation, balloon };
      return;
    }
    missBalloon(balloon, generation);
  });

  elements.balloonLayer.append(balloon);
  positionBalloon(balloon);
  game.currentBalloon = balloon;
  game.targetProgress = 0;
  renderTargetProgress();
  updateTargetGuidance();
}

function getBalloonHorizontalBounds(balloon) {
  const layerWidth = elements.balloonLayer.clientWidth;
  const balloonWidth = balloon.getBoundingClientRect().width;
  const minimumLeft = Math.min(BALLOON_EDGE_GAP, Math.max(0, layerWidth - balloonWidth));
  const maximumLeft = Math.max(
    minimumLeft,
    layerWidth - balloonWidth - BALLOON_EDGE_GAP - BALLOON_BOB_DISTANCE,
  );
  return { minimumLeft, maximumLeft };
}

function positionBalloon(balloon) {
  const { minimumLeft, maximumLeft } = getBalloonHorizontalBounds(balloon);
  balloon.style.left = `${minimumLeft + Math.random() * (maximumLeft - minimumLeft)}px`;
}

function clampActiveBalloon(generation, balloon) {
  if (
    !(balloon instanceof HTMLElement)
    || !game.active
    || game.generation !== generation
    || game.currentBalloon !== balloon
    || !balloon.isConnected
    || balloon.parentElement !== elements.balloonLayer
    || balloon.classList.contains("pop")
  ) {
    return;
  }

  const { minimumLeft, maximumLeft } = getBalloonHorizontalBounds(balloon);
  const currentLeft = Number.parseFloat(balloon.style.left);
  const clampedLeft = Math.min(maximumLeft, Math.max(minimumLeft, Number.isFinite(currentLeft) ? currentLeft : minimumLeft));
  if (clampedLeft !== currentLeft) {
    balloon.style.left = `${clampedLeft}px`;
  }
}

function cancelBalloonResizeFrame() {
  if (balloonResizeState.frameId !== null) {
    window.cancelAnimationFrame(balloonResizeState.frameId);
  }
  balloonResizeState.frameId = null;
  balloonResizeState.generation = null;
  balloonResizeState.balloon = null;
}

function scheduleBalloonResizeClamp() {
  if (balloonResizeState.frameId !== null) {
    return;
  }

  const balloon = game.currentBalloon;
  if (!game.active || !balloon || balloon.classList.contains("pop")) {
    return;
  }

  balloonResizeState.generation = game.generation;
  balloonResizeState.balloon = balloon;
  balloonResizeState.frameId = window.requestAnimationFrame(() => {
    const generation = balloonResizeState.generation;
    const scheduledBalloon = balloonResizeState.balloon;
    balloonResizeState.frameId = null;
    balloonResizeState.generation = null;
    balloonResizeState.balloon = null;
    clampActiveBalloon(generation, scheduledBalloon);
  });
}

function initializeBalloonResizeObserver() {
  if (balloonResizeState.observer || typeof ResizeObserver !== "function") {
    return;
  }
  balloonResizeState.observer = new ResizeObserver(scheduleBalloonResizeClamp);
  balloonResizeState.observer.observe(elements.balloonLayer);
}

function disconnectBalloonResizeObserver() {
  cancelBalloonResizeFrame();
  if (balloonResizeState.observer) {
    balloonResizeState.observer.disconnect();
    balloonResizeState.observer = null;
  }
}

function renderTargetProgress() {
  const balloon = game.currentBalloon;
  if (!balloon) {
    return;
  }

  const target = balloon.dataset.target;
  const targetProgress = document.createElement("span");
  targetProgress.className = "target-progress";

  for (let index = 0; index < target.length; index += 1) {
    const character = target[index];
    const characterElement = document.createElement("span");
    characterElement.textContent = formatCharacterForDisplay(character);

    if (index < game.targetProgress) {
      characterElement.className = "target-complete";
    } else if (index === game.targetProgress) {
      characterElement.className = "target-current";
    }

    targetProgress.append(characterElement);
  }

  balloon.replaceChildren(targetProgress);
}

function handleKeyDown(event) {
  if (!game.active || game.paused || !game.currentBalloon || shouldIgnoreInput(event)) {
    return;
  }

  event.preventDefault();
  showPressedKey(event.code);

  const target = game.currentBalloon.dataset.target;
  const expectedCharacter = target[game.targetProgress];

  if (charactersMatch(event.key, expectedCharacter, getActiveMode().caseSensitive)) {
    game.correctInputs += 1;
    game.targetProgress += 1;

    if (game.targetProgress === target.length) {
      popBalloon(game.currentBalloon);
    } else {
      renderTargetProgress();
      updateTargetGuidance();
    }
  } else {
    registerIncorrectAttempt();
  }
}

function shouldIgnoreInput(event) {
  const eventTarget = event.target;
  if (
    eventTarget instanceof Element
    && eventTarget.closest(INTERACTIVE_INPUT_SELECTOR)
  ) {
    return true;
  }

  if (event.repeat || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) {
    return true;
  }

  if (event.key === "Dead" || event.key === "Process" || event.key.length !== 1) {
    return true;
  }

  const characterCode = event.key.charCodeAt(0);
  return characterCode < 32 || characterCode > 126;
}

function charactersMatch(actual, expected, caseSensitive) {
  if (caseSensitive) {
    return actual === expected;
  }

  return actual.toLocaleLowerCase("en-US") === expected.toLocaleLowerCase("en-US");
}

function popBalloon(balloon) {
  const generation = game.generation;
  const firstTry = balloon.dataset.hasError === "false";
  if (firstTry) {
    game.firstTryHits += 1;
  }

  game.streak += 1;
  game.longestStreak = Math.max(game.longestStreak, game.streak);
  game.popped += 1;
  const comboMultiplier = game.streak >= 10 ? 1.5 : game.streak >= 5 ? 1.2 : 1;
  const points = Math.round(10 * comboMultiplier + (firstTry ? 2 : 0));
  game.score += points;

  balloon.classList.add("pop");
  game.currentBalloon = null;
  game.targetProgress = 0;
  clearTargetHighlight();
  showFeedback(`爆炸！ +${points}`, "success");
  updateDashboard();

  startTransition(POP_TRANSITION_DELAY, generation, balloon, () => {
    balloon.remove();
    spawnBalloon();
  });
}

function registerIncorrectAttempt() {
  const balloon = game.currentBalloon;
  if (!balloon) {
    return;
  }

  balloon.dataset.hasError = "true";
  game.incorrectInputs += 1;
  game.streak = 0;

  if (game.penaltyEnabled) {
    game.score = Math.max(0, game.score - 5);
  }

  showFeedback("没关系，再试一次！", "error");
  updateDashboard();
}

function missBalloon(balloon, generation = game.generation) {
  if (!game.active || game.generation !== generation || game.currentBalloon !== balloon) {
    return;
  }
  game.deferredMiss = null;
  balloon.remove();
  game.currentBalloon = null;
  game.targetProgress = 0;
  game.misses += 1;
  game.streak = 0;
  clearTargetHighlight();
  showFeedback("气球飞走了，下一次会更好！", "error");
  updateDashboard();

  if (game.misses >= MAX_MISSES) {
    endGame();
  } else {
    startTransition(MISS_TRANSITION_DELAY, generation, balloon, spawnBalloon);
  }
}

function endGame() {
  const completedResult = {
    nickname: DEFAULT_NICKNAME,
    modeId: game.activeModeId,
    penaltyEnabled: game.penaltyEnabled,
    score: game.score,
    completedTargets: game.popped,
    longestStreak: game.longestStreak,
    correctInputs: game.correctInputs,
    incorrectInputs: game.incorrectInputs,
    misses: game.misses,
    timestamp: Date.now(),
  };
  invalidateRound();
  game.active = false;
  elements.startButton.textContent = "开始练习";
  setRoundControlsLocked(false);
  updatePauseControl();
  updateModePresentation();
  clearTargetHighlight();
  clearFeedback();

  const totalInputs = game.correctInputs + game.incorrectInputs;
  const exactAccuracy = totalInputs === 0 ? 0 : game.correctInputs / totalInputs;
  const displayedAccuracy = Math.round(exactAccuracy * 100);
  leaderboardState.pendingResult = completedResult;

  elements.finalScore.textContent = game.score;
  elements.finalPopped.textContent = game.popped;
  elements.finalStreak.textContent = game.longestStreak;
  elements.finalAccuracy.textContent = `${displayedAccuracy}%`;
  elements.resultMessage.textContent = getResultMessage(displayedAccuracy);
  elements.resultRanking.hidden = false;
  elements.resultRankSummary.textContent = "输入昵称后保存成绩，空白时将使用“小玩家”。";
  elements.nicknameInput.value = "";
  prepareResultDialogForNextRound();
  elements.restartButton.hidden = true;
  elements.resultDialog.showModal();
  window.setTimeout(() => elements.nicknameInput.focus(), 0);
}

function getResultMessage(accuracy) {
  if (game.popped === 0) {
    return "先把手指放回 ASDF 和 JKL;，慢慢来。每次认真尝试都会进步！";
  }
  if (accuracy >= 85) {
    return "太棒了！你按得又准又稳，继续保持手指回到基准键。";
  }
  if (accuracy >= 60) {
    return "做得不错！下次试着先看屏幕上的手指提示，再按键。";
  }
  return "你已经开始练习了！不用着急，找准对应手指比速度更重要。";
}

function updateDashboard() {
  const speedLevel = 1 + Math.floor(game.popped / SPEED_UP_EVERY);
  elements.score.textContent = game.score;
  elements.streak.textContent = game.streak;
  elements.lives.textContent = "★".repeat(MAX_MISSES - game.misses) + "☆".repeat(game.misses);
  elements.lives.setAttribute("aria-label", `剩余 ${MAX_MISSES - game.misses} 颗星`);
  elements.speed.textContent = speedLevel;
}

function updateModePresentation() {
  renderSelectedLeaderboard();

  if (game.active) {
    const mode = getActiveMode();
    const penaltyText = game.penaltyEnabled ? "已开启错误扣分" : "未开启错误扣分";
    elements.modeDescription.textContent = `本轮：${mode.label} · ${penaltyText}。${mode.description}`;
    return;
  }

  const selectedMode = MODES[elements.modeSelect.value] || MODES.letters;
  elements.modeDescription.textContent = selectedMode.description;
}

function updateTargetGuidance() {
  const balloon = game.currentBalloon;
  if (!balloon) {
    return;
  }

  const expectedCharacter = balloon.dataset.target[game.targetProgress];
  const guidance = getCharacterGuidance(expectedCharacter);
  highlightTarget(guidance);
  balloon.style.background = FINGER_COLORS[guidance.finger] || "#6d78e8";
  balloon.dataset.finger = guidance.finger;

  const characterLabel = formatCharacterForDisplay(expectedCharacter);
  if (guidance.shiftCode) {
    const shiftLabel = guidance.shiftCode === "ShiftLeft" ? "左 Shift" : "右 Shift";
    elements.fingerBadge.textContent = `${shiftLabel} + ${guidance.finger}`;
    elements.instruction.textContent = `请按住${shiftLabel}，再用${guidance.finger}输入 ${characterLabel}。`;
  } else {
    elements.fingerBadge.textContent = guidance.finger;
    elements.instruction.textContent = `请用${guidance.finger}输入 ${characterLabel}。`;
  }
}

function getCharacterGuidance(character) {
  const code = KEY_CODE_BY_CHARACTER[character];
  const keyElement = code ? document.querySelector(`[data-code="${code}"]`) : null;
  const finger = keyElement?.querySelector(".key-finger")?.textContent || "对应手指";
  const needsShift = SHIFTED_SYMBOLS.has(character)
    || (getActiveMode().caseSensitive && isUppercaseLetter(character));
  const shiftCode = needsShift ? (finger.startsWith("左") ? "ShiftRight" : "ShiftLeft") : null;

  return { code, finger, shiftCode };
}

function isUppercaseLetter(character) {
  return /^[A-Z]$/.test(character);
}

function highlightTarget(guidance) {
  clearTargetHighlight();
  if (guidance.code) {
    document.querySelector(`[data-code="${guidance.code}"]`)?.classList.add("active");
  }
  if (guidance.shiftCode) {
    document.querySelector(`[data-code="${guidance.shiftCode}"]`)?.classList.add("active");
  }
}

function clearTargetHighlight() {
  document.querySelectorAll(".key.active").forEach((key) => key.classList.remove("active"));
}

function showPressedKey(code) {
  if (!code) {
    return;
  }

  const keyElement = document.querySelector(`[data-code="${code}"]`);
  if (!keyElement) {
    return;
  }

  keyElement.classList.add("pressed");
  window.setTimeout(() => keyElement.classList.remove("pressed"), 120);
}

function formatCharacterForDisplay(character) {
  return character === " " ? "空格" : character;
}

function formatTargetForSpeech(target) {
  return [...target].map(formatCharacterForDisplay).join("");
}

function showFeedback(message, type) {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${type}`;
}

function clearFeedback() {
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
}

function getBoardKey(modeId, penaltyEnabled) {
  return `${modeId}:${penaltyEnabled ? "penalty" : "standard"}`;
}

function calculateAccuracy(entry) {
  const totalInputs = entry.correctInputs + entry.incorrectInputs;
  return totalInputs === 0 ? 0 : entry.correctInputs / totalInputs;
}

function compareLeaderboardEntries(left, right) {
  return (
    right.score - left.score
    || calculateAccuracy(right) - calculateAccuracy(left)
    || right.completedTargets - left.completedTargets
    || right.longestStreak - left.longestStreak
    || left.incorrectInputs - right.incorrectInputs
    || left.timestamp - right.timestamp
  );
}

function normalizeNickname(value) {
  const nickname = typeof value === "string" ? value.trim().slice(0, MAX_NICKNAME_LENGTH) : "";
  return nickname || DEFAULT_NICKNAME;
}

function isValidStoredEntry(entry, modeId, penaltyEnabled) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    return false;
  }

  const nonNegativeIntegerFields = [
    "score", "completedTargets", "longestStreak", "correctInputs", "incorrectInputs", "misses", "timestamp",
  ];

  return (
    typeof entry.nickname === "string"
    && entry.nickname.trim().length > 0
    && entry.nickname.trim().length <= MAX_NICKNAME_LENGTH
    && entry.modeId === modeId
    && entry.penaltyEnabled === penaltyEnabled
    && nonNegativeIntegerFields.every((field) => Number.isSafeInteger(entry[field]) && entry[field] >= 0)
  );
}

function sanitizeStoredBoards(rawBoards) {
  const validBoards = {};
  let hasMalformedData = false;
  if (!rawBoards || typeof rawBoards !== "object" || Array.isArray(rawBoards)) {
    return { boards: validBoards, hasMalformedData: true };
  }

  const expectedBoardKeys = new Set();

  for (const modeId of Object.keys(MODES)) {
    for (const penaltyEnabled of [false, true]) {
      const boardKey = getBoardKey(modeId, penaltyEnabled);
      expectedBoardKeys.add(boardKey);
      const hasBoard = Object.prototype.hasOwnProperty.call(rawBoards, boardKey);
      if (!hasBoard) {
        continue;
      }
      const rawEntries = rawBoards[boardKey];
      if (!Array.isArray(rawEntries)) {
        hasMalformedData = true;
        continue;
      }

      const validEntries = rawEntries
        .filter((entry) => {
          const isValid = isValidStoredEntry(entry, modeId, penaltyEnabled);
          hasMalformedData ||= !isValid;
          return isValid;
        })
        .map((entry) => ({ ...entry, nickname: normalizeNickname(entry.nickname) }))
        .sort(compareLeaderboardEntries)
        .slice(0, LEADERBOARD_LIMIT);

      if (validEntries.length > 0) {
        validBoards[boardKey] = validEntries;
      }
    }
  }

  hasMalformedData ||= Object.keys(rawBoards).some((boardKey) => !expectedBoardKeys.has(boardKey));
  return { boards: validBoards, hasMalformedData };
}

function showStorageNotice(message) {
  elements.storageNotice.textContent = message;
  elements.storageNotice.hidden = false;
}

function loadLeaderboards() {
  try {
    const storedValue = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (storedValue === null) {
      return;
    }

    const storedData = JSON.parse(storedValue);
    if (
      !storedData
      || typeof storedData !== "object"
      || storedData.version !== LEADERBOARD_STORAGE_VERSION
      || !storedData.boards
      || typeof storedData.boards !== "object"
      || Array.isArray(storedData.boards)
    ) {
      leaderboardState.persistenceAvailable = false;
      showStorageNotice("无法读取已有排行榜；本页的新成绩仍会保留到页面关闭。未覆盖原有数据。");
      return;
    }

    const sanitizedData = sanitizeStoredBoards(storedData.boards);
    leaderboardState.boards = sanitizedData.boards;
    if (sanitizedData.hasMalformedData) {
      showStorageNotice("已有排行榜包含无法读取的记录；有效成绩已保留，损坏内容已忽略。");
    }
  } catch (error) {
    leaderboardState.persistenceAvailable = false;
    showStorageNotice("浏览器本地存储不可用；本页的新成绩仍会保留到页面关闭。");
  }
}

function persistLeaderboards() {
  if (!leaderboardState.persistenceAvailable) {
    return false;
  }

  try {
    window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify({
      version: LEADERBOARD_STORAGE_VERSION,
      boards: leaderboardState.boards,
    }));
    return true;
  } catch (error) {
    leaderboardState.persistenceAvailable = false;
    showStorageNotice("排行榜暂时无法保存到浏览器；本页成绩仍已保留，刷新或关闭页面后可能消失。");
    return false;
  }
}

function savePendingResult(nicknameValue) {
  const result = leaderboardState.pendingResult;
  if (!result) {
    return { saved: false, rank: null };
  }

  result.nickname = normalizeNickname(nicknameValue);
  const boardKey = getBoardKey(result.modeId, result.penaltyEnabled);
  const combinedBoard = [...(leaderboardState.boards[boardKey] || []), result].sort(compareLeaderboardEntries);
  const rank = combinedBoard.indexOf(result) + 1;

  leaderboardState.sessionResults.push(result);
  leaderboardState.boards[boardKey] = combinedBoard.slice(0, LEADERBOARD_LIMIT);
  leaderboardState.pendingResult = null;
  persistLeaderboards();
  renderSelectedLeaderboard();

  return { saved: true, rank: rank <= LEADERBOARD_LIMIT ? rank : null };
}

function finishResultFlow(nicknameValue) {
  const outcome = savePendingResult(nicknameValue);
  if (!outcome.saved) {
    return;
  }

  if (outcome.rank === null) {
    elements.resultRankSummary.textContent = "本轮成绩未进入前十名，仍已记录在本页会话中。";
  } else {
    elements.resultRankSummary.textContent = `恭喜！本轮成绩排名第 ${outcome.rank} 名。`;
  }

  elements.nicknameInput.disabled = true;
  elements.saveResultButton.disabled = true;
  elements.skipResultButton.disabled = true;
  elements.restartButton.hidden = false;
  elements.restartButton.focus();
}

function renderSelectedLeaderboard() {
  const modeId = MODES[elements.modeSelect.value] ? elements.modeSelect.value : "letters";
  const penaltyEnabled = elements.penaltyCheckbox.checked;
  const mode = MODES[modeId];
  const board = leaderboardState.boards[getBoardKey(modeId, penaltyEnabled)] || [];
  const penaltyLabel = penaltyEnabled ? "错误扣分开启" : "错误扣分关闭";

  elements.leaderboardContext.textContent = `${mode.label} · ${penaltyLabel} · 本地前十名${leaderboardState.persistenceAvailable ? "" : "（当前页面会话）"}`;
  elements.leaderboardList.replaceChildren();

  if (board.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "leaderboard-empty";
    emptyItem.textContent = "还没有成绩，开始第一轮练习吧！";
    elements.leaderboardList.append(emptyItem);
    return;
  }

  board.forEach((entry) => {
    const item = document.createElement("li");
    const nickname = document.createElement("strong");
    const score = document.createElement("span");
    const detail = document.createElement("small");
    const accuracy = Math.round(calculateAccuracy(entry) * 100);

    item.className = "leaderboard-entry";
    nickname.textContent = entry.nickname;
    score.textContent = `${entry.score} 分`;
    detail.textContent = `准确率 ${accuracy}% · 完成 ${entry.completedTargets} · 最长连击 ${entry.longestStreak} · 错误 ${entry.incorrectInputs}`;
    item.append(nickname, score, detail);
    elements.leaderboardList.append(item);
  });
}

function prepareResultDialogForNextRound() {
  elements.nicknameInput.disabled = false;
  elements.saveResultButton.disabled = false;
  elements.skipResultButton.disabled = false;
}

function startOrRestartRound() {
  if (game.active && !window.confirm("本轮练习还没有结束。确定要重新开始并放弃本轮成绩吗？")) {
    return;
  }

  resetGame();
}

function togglePause() {
  if (!game.active) {
    return;
  }

  if (game.paused) {
    game.paused = false;
    updatePauseControl("练习已继续");
    const deferredMiss = game.deferredMiss;
    game.deferredMiss = null;
    if (
      deferredMiss
      && deferredMiss.generation === game.generation
      && deferredMiss.balloon === game.currentBalloon
    ) {
      missBalloon(deferredMiss.balloon, deferredMiss.generation);
    } else {
      resumeTransition();
    }
    elements.stage.focus({ preventScroll: true });
    return;
  }

  game.paused = true;
  pauseTransition();
  updatePauseControl("练习已暂停");
}

function handleModeChange() {
  if (game.active) {
    resetGame({ savePending: false });
    return;
  }
  updateModePresentation();
}

elements.startButton.addEventListener("click", startOrRestartRound);
elements.pauseButton.addEventListener("click", togglePause);
elements.saveResultButton.addEventListener("click", () => finishResultFlow(elements.nicknameInput.value));
elements.skipResultButton.addEventListener("click", () => finishResultFlow(DEFAULT_NICKNAME));
elements.nicknameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    finishResultFlow(elements.nicknameInput.value);
  }
});
elements.resultDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  finishResultFlow(DEFAULT_NICKNAME);
});
elements.restartButton.addEventListener("click", () => {
  elements.resultDialog.close();
  resetGame();
});
elements.modeSelect.addEventListener("change", handleModeChange);
elements.penaltyCheckbox.addEventListener("change", updateModePresentation);
document.addEventListener("keydown", handleKeyDown);
window.addEventListener("pagehide", disconnectBalloonResizeObserver);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initializeBalloonResizeObserver();
  }
});

initializeBalloonResizeObserver();
loadLeaderboards();
updatePauseControl();
updateModePresentation();
