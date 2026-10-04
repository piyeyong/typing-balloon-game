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


const SUPPORTED_LOCALES = ["en", "zh-CN", "zh-TW", "ja"];
const LOCALE_STORAGE_KEY = "typing-balloon-game:locale";
const FINGER_IDS = [
  "left-pinky", "left-ring", "left-middle", "left-index",
  "right-index", "right-middle", "right-ring", "right-pinky", "thumb",
];

const LOCALES = {
  en: {
    documentTitle: "Balloon Type",
    documentDescription: "A balloon typing game for practicing the English keyboard, common words, and C++ input.",
    languageLabel: "Language", modeLabel: "Training mode", settings: "Settings",
    score: "Score", streak: "Streak", lives: "Chances", speed: "Speed",
    narrowAdvisory: "This game is designed for a physical keyboard. Widen the browser window for the full experience.",
    penaltyTitle: "Mistake penalty", penaltyDescription: "Each incorrect printable character costs 5 points, to a minimum of 0.",
    storageScope: "Leaderboards are stored only in this browser profile. Expand Local leaderboard for details.",
    leaderboard: "Local leaderboard", localTopTen: "LOCAL TOP 10",
    keyboardTitle: "Finger guide", keyboardDescription: "The target character, its key, and any required Shift key light up. Scroll sideways in narrow windows.",
    roundComplete: "ROUND COMPLETE", resultTitle: "Great work!", balloonsPopped: "Balloons popped", longestStreak: "Longest streak", accuracy: "Accuracy",
    saveLeaderboardScore: "Save leaderboard score", nicknameLabel: "Nickname (up to 12 characters)", defaultNickname: "Player",
    sidebarAria: "Practice information and settings", roundControlsAria: "Round information and controls", statsAria: "Round score",
    playAreaAria: "Game stage and keyboard", stageAria: "Balloon game area", keyboardScrollAria: "Horizontally scrollable English QWERTY keyboard", keyboardAria: "US English QWERTY keyboard",
    readyHtml: "Ready?<br>Place your fingers on <strong>ASDF</strong> and <strong>JKL;</strong>.",
    start: "Start practice", restart: "Restart", pause: "Pause", resume: "Resume", paused: "Paused", pauseAnnounce: "Practice paused.", resumeAnnounce: "Practice resumed.",
    initialInstruction: "Choose a training mode, then select Start practice.",
    penaltyOn: "mistake penalty on", penaltyOff: "mistake penalty off", roundMode: "This round: {mode} · {penalty}. {description}",
    remainingStars: "{count} stars remaining", inputAria: "Type {target}",
    leftShift: "Left Shift", rightShift: "Right Shift", correspondingFinger: "the indicated finger",
    guidanceShiftBadge: "{shift} + {finger}", guidanceShift: "Hold {shift}, then type {character} with {finger}.", guidance: "Type {character} with {finger}.",
    space: "Space", homeKey: "home key", keyAria: "{key}, {finger}{home}",
    poppedFeedback: "Pop! +{points}", retryFeedback: "No problem—try again!", missedFeedback: "The balloon got away. You’ll get the next one!",
    resultPrompt: "Enter a nickname to save your score. Blank names use “{nickname}”.", saveContinue: "Save and continue", skipContinue: "Continue as “{nickname}”", playAgain: "Play again",
    noPopsResult: "Return your fingers to ASDF and JKL; and take your time. Every careful try helps!", greatResult: "Excellent! Your typing was accurate and steady. Keep returning to the home keys.", goodResult: "Nice work! Next time, check the finger guide before pressing each key.", keepGoingResult: "You’ve started practicing! Finding the right finger matters more than speed.",
    boardContext: "{mode} · {penalty} · local top ten{session}", penaltyEnabled: "penalty on", penaltyDisabled: "penalty off", sessionOnly: " (this page session)", emptyBoard: "No scores yet. Start your first round!",
    points: "{score} pts", boardDetail: "Accuracy {accuracy}% · completed {completed} · longest streak {streak} · errors {errors}",
    rankOutside: "This score did not reach the top ten, but it is recorded for this page session.", rankSuccess: "Congratulations! This score ranks #{rank}.",
    confirmRestart: "This round is not finished. Restart and discard its score?",
    storageUnreadable: "The existing leaderboard could not be read. New scores remain until this page closes; existing data was not overwritten.", storageMalformed: "Some leaderboard records could not be read. Valid scores were kept and damaged entries ignored.", storageUnavailable: "Browser storage is unavailable. New scores remain until this page closes.", storageSaveFailed: "The leaderboard cannot currently be saved in the browser. This page still retains the score, but it may disappear after refresh or close.",
    modes: {
      "home-row": ["Beginner", "Practice A, S, D, F, J, K, and L around the home keys; letter case does not matter."],
      letters: ["26 letters", "Practice A to Z; letter case does not matter."],
      "common-characters": ["Common characters", "Practice lowercase letters, numbers, Space, and common punctuation; letter case does not matter."],
      "full-keyboard": ["Full keyboard", "Practice all 95 printable US keyboard characters; uppercase letters and symbols must match exactly."],
      "common-words": ["Common words", "Type child-friendly common English words one letter at a time; letter case does not matter."],
      cpp: ["C++ programming", "Type basic C++ symbols, operators, keywords, and common tokens one character at a time; characters must match exactly."],
    },
    fingers: {"left-pinky":"Left pinky","left-ring":"Left ring finger","left-middle":"Left middle finger","left-index":"Left index finger","right-index":"Right index finger","right-middle":"Right middle finger","right-ring":"Right ring finger","right-pinky":"Right pinky","thumb":"Thumb"},
  },
  "zh-CN": {
    documentTitle:"Balloon Type", documentDescription:"帮助儿童练习英文键盘、常用单词和 C++ 输入的盲打气球小游戏。", languageLabel:"语言", modeLabel:"训练模式", settings:"设置", score:"得分", streak:"连击", lives:"失误机会", speed:"速度", narrowAdvisory:"本游戏为实体键盘设计。请使用实体键盘，并加宽浏览器窗口以获得完整体验。", penaltyTitle:"错误扣分", penaltyDescription:"每次可输入字符错误扣 5 分，最低为 0 分。", storageScope:"排行榜只保存在当前浏览器和用户配置中；展开“本地排行榜”可查看详情。", leaderboard:"本地排行榜", localTopTen:"本地前十名", keyboardTitle:"正确手指提示", keyboardDescription:"目标字符、对应按键和需要的 Shift 键会亮起来；窄窗口中可左右滚动。", roundComplete:"本轮完成", resultTitle:"干得漂亮！", balloonsPopped:"击破气球", longestStreak:"最长连击", accuracy:"准确率", saveLeaderboardScore:"保存排行榜成绩", nicknameLabel:"昵称（最多 12 个字）", defaultNickname:"小玩家", sidebarAria:"练习信息和设置", roundControlsAria:"本局信息和操作", statsAria:"本局成绩", playAreaAria:"游戏舞台和键盘", stageAria:"气球游戏区域", keyboardScrollAria:"可横向滚动的英文 QWERTY 键盘", keyboardAria:"美式英文 QWERTY 键盘", readyHtml:"准备好了吗？<br>把手指放在 <strong>ASDF</strong> 和 <strong>JKL;</strong> 上。", start:"开始练习", restart:"重新开始", pause:"暂停", resume:"继续", paused:"已暂停", pauseAnnounce:"练习已暂停", resumeAnnounce:"练习已继续", initialInstruction:"选择训练模式，然后点击“开始练习”。", penaltyOn:"已开启错误扣分", penaltyOff:"未开启错误扣分", roundMode:"本轮：{mode} · {penalty}。{description}", remainingStars:"剩余 {count} 颗星", inputAria:"输入 {target}", leftShift:"左 Shift", rightShift:"右 Shift", correspondingFinger:"对应手指", guidanceShiftBadge:"{shift} + {finger}", guidanceShift:"请按住{shift}，再用{finger}输入 {character}。", guidance:"请用{finger}输入 {character}。", space:"空格", homeKey:"基准键", keyAria:"{key}，{finger}{home}", poppedFeedback:"爆炸！ +{points}", retryFeedback:"没关系，再试一次！", missedFeedback:"气球飞走了，下一次会更好！", resultPrompt:"输入昵称后保存成绩，空白时将使用“{nickname}”。", saveContinue:"保存并继续", skipContinue:"使用“{nickname}”继续", playAgain:"再来一轮", noPopsResult:"先把手指放回 ASDF 和 JKL;，慢慢来。每次认真尝试都会进步！", greatResult:"太棒了！你按得又准又稳，继续保持手指回到基准键。", goodResult:"做得不错！下次试着先看屏幕上的手指提示，再按键。", keepGoingResult:"你已经开始练习了！不用着急，找准对应手指比速度更重要。", boardContext:"{mode} · {penalty} · 本地前十名{session}", penaltyEnabled:"错误扣分开启", penaltyDisabled:"错误扣分关闭", sessionOnly:"（当前页面会话）", emptyBoard:"还没有成绩，开始第一轮练习吧！", points:"{score} 分", boardDetail:"准确率 {accuracy}% · 完成 {completed} · 最长连击 {streak} · 错误 {errors}", rankOutside:"本轮成绩未进入前十名，仍已记录在本页会话中。", rankSuccess:"恭喜！本轮成绩排名第 {rank} 名。", confirmRestart:"本轮练习还没有结束。确定要重新开始并放弃本轮成绩吗？", storageUnreadable:"无法读取已有排行榜；本页的新成绩仍会保留到页面关闭。未覆盖原有数据。", storageMalformed:"已有排行榜包含无法读取的记录；有效成绩已保留，损坏内容已忽略。", storageUnavailable:"浏览器本地存储不可用；本页的新成绩仍会保留到页面关闭。", storageSaveFailed:"排行榜暂时无法保存到浏览器；本页成绩仍已保留，刷新或关闭页面后可能消失。",
    modes:{"home-row":["入门级","只练习基准区域的 A、S、D、F、J、K、L，输入时不区分大小写。"],letters:["26 个字母","练习 A 到 Z，输入时不区分大小写。"],"common-characters":["常用字符","练习小写字母、数字、空格和常用标点，字母输入不区分大小写。"],"full-keyboard":["全键盘","练习全部 95 个可打印美式键盘字符；大写字母和符号需要输入准确字符。"],"common-words":["常用单词","逐个字母练习适合儿童的常用英文单词，输入时不区分大小写。"],cpp:["C++ 编程","逐个字符练习 C++ 基础符号、运算符、关键字和常用标记，字符需准确匹配。"]},
    fingers:{"left-pinky":"左手小指","left-ring":"左手无名指","left-middle":"左手中指","left-index":"左手食指","right-index":"右手食指","right-middle":"右手中指","right-ring":"右手无名指","right-pinky":"右手小指","thumb":"拇指"},
  },
  "zh-TW": {
    documentTitle:"Balloon Type", documentDescription:"幫助兒童練習英文鍵盤、常用單字和 C++ 輸入的盲打氣球小遊戲。", languageLabel:"語言", modeLabel:"訓練模式", settings:"設定", score:"得分", streak:"連擊", lives:"失誤機會", speed:"速度", narrowAdvisory:"本遊戲為實體鍵盤設計。請使用實體鍵盤，並加寬瀏覽器視窗以獲得完整體驗。", penaltyTitle:"錯誤扣分", penaltyDescription:"每次可輸入字元錯誤扣 5 分，最低為 0 分。", storageScope:"排行榜只儲存在目前瀏覽器和使用者設定中；展開「本機排行榜」可查看詳情。", leaderboard:"本機排行榜", localTopTen:"本機前十名", keyboardTitle:"正確手指提示", keyboardDescription:"目標字元、對應按鍵和需要的 Shift 鍵會亮起；窄視窗中可左右捲動。", roundComplete:"本輪完成", resultTitle:"做得很好！", balloonsPopped:"擊破氣球", longestStreak:"最長連擊", accuracy:"準確率", saveLeaderboardScore:"儲存排行榜成績", nicknameLabel:"暱稱（最多 12 個字）", defaultNickname:"小玩家", sidebarAria:"練習資訊和設定", roundControlsAria:"本局資訊和操作", statsAria:"本局成績", playAreaAria:"遊戲舞台和鍵盤", stageAria:"氣球遊戲區域", keyboardScrollAria:"可橫向捲動的英文 QWERTY 鍵盤", keyboardAria:"美式英文 QWERTY 鍵盤", readyHtml:"準備好了嗎？<br>把手指放在 <strong>ASDF</strong> 和 <strong>JKL;</strong> 上。", start:"開始練習", restart:"重新開始", pause:"暫停", resume:"繼續", paused:"已暫停", pauseAnnounce:"練習已暫停", resumeAnnounce:"練習已繼續", initialInstruction:"選擇訓練模式，然後按一下「開始練習」。", penaltyOn:"已開啟錯誤扣分", penaltyOff:"未開啟錯誤扣分", roundMode:"本輪：{mode} · {penalty}。{description}", remainingStars:"剩餘 {count} 顆星", inputAria:"輸入 {target}", leftShift:"左 Shift", rightShift:"右 Shift", correspondingFinger:"對應手指", guidanceShiftBadge:"{shift} + {finger}", guidanceShift:"請按住{shift}，再用{finger}輸入 {character}。", guidance:"請用{finger}輸入 {character}。", space:"空白鍵", homeKey:"基準鍵", keyAria:"{key}，{finger}{home}", poppedFeedback:"爆破！ +{points}", retryFeedback:"沒關係，再試一次！", missedFeedback:"氣球飛走了，下次會更好！", resultPrompt:"輸入暱稱後儲存成績，空白時將使用「{nickname}」。", saveContinue:"儲存並繼續", skipContinue:"使用「{nickname}」繼續", playAgain:"再玩一輪", noPopsResult:"先把手指放回 ASDF 和 JKL;，慢慢來。每次認真嘗試都會進步！", greatResult:"太棒了！你按得又準又穩，繼續讓手指回到基準鍵。", goodResult:"做得不錯！下次試著先看螢幕上的手指提示，再按鍵。", keepGoingResult:"你已經開始練習了！不用著急，找準對應手指比速度更重要。", boardContext:"{mode} · {penalty} · 本機前十名{session}", penaltyEnabled:"錯誤扣分開啟", penaltyDisabled:"錯誤扣分關閉", sessionOnly:"（目前頁面工作階段）", emptyBoard:"還沒有成績，開始第一輪練習吧！", points:"{score} 分", boardDetail:"準確率 {accuracy}% · 完成 {completed} · 最長連擊 {streak} · 錯誤 {errors}", rankOutside:"本輪成績未進入前十名，但仍已記錄在本頁工作階段中。", rankSuccess:"恭喜！本輪成績排名第 {rank} 名。", confirmRestart:"本輪練習還沒有結束。確定要重新開始並放棄本輪成績嗎？", storageUnreadable:"無法讀取現有排行榜；本頁的新成績仍會保留到頁面關閉，且未覆寫原有資料。", storageMalformed:"現有排行榜包含無法讀取的記錄；有效成績已保留，損壞內容已忽略。", storageUnavailable:"瀏覽器本機儲存空間無法使用；本頁的新成績仍會保留到頁面關閉。", storageSaveFailed:"排行榜暫時無法儲存到瀏覽器；本頁仍保留成績，但重新整理或關閉頁面後可能消失。",
    modes:{"home-row":["入門級","只練習基準區域的 A、S、D、F、J、K、L，輸入時不分大小寫。"],letters:["26 個字母","練習 A 到 Z，輸入時不分大小寫。"],"common-characters":["常用字元","練習小寫字母、數字、空白鍵和常用標點，字母輸入不分大小寫。"],"full-keyboard":["全鍵盤","練習全部 95 個可列印美式鍵盤字元；大寫字母和符號需要準確輸入。"],"common-words":["常用單字","逐個字母練習適合兒童的常用英文單字，輸入時不分大小寫。"],cpp:["C++ 程式設計","逐個字元練習 C++ 基礎符號、運算子、關鍵字和常用標記，字元需準確相符。"]},
    fingers:{"left-pinky":"左手小指","left-ring":"左手無名指","left-middle":"左手中指","left-index":"左手食指","right-index":"右手食指","right-middle":"右手中指","right-ring":"右手無名指","right-pinky":"右手小指","thumb":"拇指"},
  },
  ja: {
    documentTitle:"Balloon Type", documentDescription:"英語キーボード、よく使う英単語、C++ 入力を練習する子ども向けバルーンゲームです。", languageLabel:"言語", modeLabel:"練習モード", settings:"設定", score:"スコア", streak:"連続", lives:"ミス可能回数", speed:"速度", narrowAdvisory:"このゲームは物理キーボード用です。すべてを表示するにはブラウザーの幅を広げてください。", penaltyTitle:"ミスの減点", penaltyDescription:"入力可能な文字を間違えるたびに 5 点減点されます（最低 0 点）。", storageScope:"ランキングは現在のブラウザープロファイルだけに保存されます。「ローカルランキング」を展開すると詳細を確認できます。", leaderboard:"ローカルランキング", localTopTen:"ローカル TOP 10", keyboardTitle:"指使いガイド", keyboardDescription:"目標文字、対応キー、必要な Shift キーが点灯します。狭い画面では左右にスクロールできます。", roundComplete:"ラウンド完了", resultTitle:"よくできました！", balloonsPopped:"割ったバルーン", longestStreak:"最長連続", accuracy:"正確率", saveLeaderboardScore:"ランキングのスコアを保存", nicknameLabel:"ニックネーム（最大 12 文字）", defaultNickname:"プレイヤー", sidebarAria:"練習情報と設定", roundControlsAria:"ラウンド情報と操作", statsAria:"ラウンドスコア", playAreaAria:"ゲームステージとキーボード", stageAria:"バルーンゲームエリア", keyboardScrollAria:"横にスクロールできる英語 QWERTY キーボード", keyboardAria:"米国英語 QWERTY キーボード", readyHtml:"準備はいいですか？<br><strong>ASDF</strong> と <strong>JKL;</strong> に指を置きましょう。", start:"練習開始", restart:"やり直す", pause:"一時停止", resume:"再開", paused:"一時停止中", pauseAnnounce:"練習を一時停止しました。", resumeAnnounce:"練習を再開しました。", initialInstruction:"練習モードを選び、「練習開始」を押してください。", penaltyOn:"ミス減点あり", penaltyOff:"ミス減点なし", roundMode:"今回：{mode} · {penalty}。{description}", remainingStars:"残り {count} 個の星", inputAria:"{target} を入力", leftShift:"左 Shift", rightShift:"右 Shift", correspondingFinger:"指定された指", guidanceShiftBadge:"{shift} + {finger}", guidanceShift:"{shift} を押しながら、{finger}で {character} を入力してください。", guidance:"{finger}で {character} を入力してください。", space:"スペース", homeKey:"ホームキー", keyAria:"{key}、{finger}{home}", poppedFeedback:"割れた！ +{points}", retryFeedback:"大丈夫、もう一度！", missedFeedback:"バルーンが逃げました。次はきっと大丈夫！", resultPrompt:"ニックネームを入力して保存します。空欄の場合は「{nickname}」になります。", saveContinue:"保存して続ける", skipContinue:"「{nickname}」で続ける", playAgain:"もう一度", noPopsResult:"ASDF と JKL; に指を戻して、ゆっくり進めましょう。丁寧な挑戦が上達につながります！", greatResult:"すばらしい！正確で安定しています。指をホームキーに戻すことも続けましょう。", goodResult:"よくできました！次はキーを押す前に指使いガイドを確認してみましょう。", keepGoingResult:"練習を始められました！急がず、速さより正しい指を見つけることを大切にしましょう。", boardContext:"{mode} · {penalty} · ローカル TOP 10{session}", penaltyEnabled:"ミス減点あり", penaltyDisabled:"ミス減点なし", sessionOnly:"（このページのセッション）", emptyBoard:"まだスコアがありません。最初のラウンドを始めましょう！", points:"{score} 点", boardDetail:"正確率 {accuracy}% · 完了 {completed} · 最長連続 {streak} · ミス {errors}", rankOutside:"今回のスコアはトップ 10 圏外ですが、このページのセッションには記録されました。", rankSuccess:"おめでとうございます！今回の順位は {rank} 位です。", confirmRestart:"このラウンドはまだ終わっていません。スコアを破棄してやり直しますか？", storageUnreadable:"既存のランキングを読み取れませんでした。新しいスコアはページを閉じるまで保持され、既存データは上書きされません。", storageMalformed:"ランキングに読み取れない記録がありました。有効なスコアは保持し、壊れた内容は無視しました。", storageUnavailable:"ブラウザーのローカルストレージを利用できません。新しいスコアはページを閉じるまで保持されます。", storageSaveFailed:"ランキングをブラウザーに保存できません。このページにはスコアが残りますが、更新または終了後に消える可能性があります。",
    modes:{"home-row":["入門","ホームポジション周辺の A、S、D、F、J、K、L を練習します。大文字と小文字は区別しません。"],letters:["26 文字","A から Z を練習します。大文字と小文字は区別しません。"],"common-characters":["よく使う文字","小文字、数字、スペース、よく使う句読点を練習します。英字の大文字と小文字は区別しません。"],"full-keyboard":["キーボード全体","米国キーボードの印字可能な 95 文字すべてを練習します。大文字と記号は正確に入力します。"],"common-words":["よく使う単語","子ども向けのよく使う英単語を 1 文字ずつ練習します。大文字と小文字は区別しません。"],cpp:["C++ プログラミング","C++ の基本記号、演算子、キーワード、一般的なトークンを 1 文字ずつ正確に入力します。"]},
    fingers:{"left-pinky":"左手小指","left-ring":"左手薬指","left-middle":"左手中指","left-index":"左手人差し指","right-index":"右手人差し指","right-middle":"右手中指","right-ring":"右手薬指","right-pinky":"右手小指","thumb":"親指"},
  },
};

let currentLocale = "en";

function t(key, variables = {}) {
  const value = LOCALES[currentLocale][key] ?? LOCALES.en[key] ?? key;
  return typeof value === "string"
    ? value.replace(/\{(\w+)\}/g, (match, name) => String(variables[name] ?? match))
    : value;
}

function getModeText(modeId) {
  const localized = LOCALES[currentLocale].modes[modeId] || LOCALES.en.modes[modeId];
  return { label: localized[0], description: localized[1] };
}

function getFingerLabel(fingerId) {
  return LOCALES[currentLocale].fingers[fingerId] || LOCALES.en.fingers[fingerId] || t("correspondingFinger");
}

function getDefaultNickname() {
  return t("defaultNickname");
}

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
  "left-pinky": "#ec7b53", "left-ring": "#a969d8", "left-middle": "#f5a946", "left-index": "#ff6b81",
  "right-index": "#6d78e8", "right-middle": "#6dc5a8", "right-ring": "#4fa5d5", "right-pinky": "#56a5db", "thumb": "#32a982",
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
const MAX_NICKNAME_LENGTH = 12;
const BALLOON_EDGE_GAP = 12;
const BALLOON_BOB_DISTANCE = 10;
// Keep in sync with --balloon-tail-height in styles.css.
const BALLOON_TAIL_HEIGHT = 72;
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
  languageSelect: document.querySelector("#language-select"),
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
  storageNoticeKey: null,
  resultOutcome: null,
};

const balloonResizeState = {
  observer: null,
  frameId: null,
  frameVersion: 0,
  pausedRecord: null,
  pending: null,
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
    savePendingResult(getDefaultNickname());
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
  elements.startButton.textContent = t("restart");
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

function updatePauseControl(announcement = null) {
  elements.pauseButton.disabled = !game.active;
  elements.pauseButton.textContent = game.paused ? t("resume") : t("pause");
  elements.pauseButton.setAttribute("aria-pressed", String(game.paused));
  elements.stage.classList.toggle("is-paused", game.paused);
  const status = announcement ?? (game.paused ? t("pauseAnnounce") : "");
  if (elements.pauseStatus.textContent !== status) {
    elements.pauseStatus.textContent = status;
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
  balloon.setAttribute("aria-label", t("inputAria", { target: formatTargetForSpeech(target) }));
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
  configureBalloonRise(balloon, duration);
  positionBalloon(balloon);
  game.currentBalloon = balloon;
  game.targetProgress = 0;
  renderTargetProgress();
  updateTargetGuidance();
}

function getRiseSpeed(baseDuration) {
  return (window.innerHeight + 300) / baseDuration;
}

function measureBalloonGeometry(balloon) {
  const balloonRect = balloon.getBoundingClientRect();
  const layerRect = elements.balloonLayer.getBoundingClientRect();
  return {
    balloonBottom: balloonRect.bottom,
    layerTop: layerRect.top,
  };
}

function getBalloonClearanceDistance(balloonBottom, layerTop) {
  return Math.max(1, balloonBottom + BALLOON_TAIL_HEIGHT - layerTop);
}

function configureBalloonRise(balloon, baseDuration, geometry = measureBalloonGeometry(balloon)) {
  const remainingDistance = getBalloonClearanceDistance(geometry.balloonBottom, geometry.layerTop);
  const riseSpeed = getRiseSpeed(baseDuration);
  balloon.dataset.riseSpeed = String(riseSpeed);
  balloon.style.setProperty("--rise-start-distance", "0px");
  balloon.style.setProperty("--rise-distance", `${remainingDistance}px`);
  balloon.style.setProperty("--rise-duration", `${remainingDistance / riseSpeed}s`);
}

function restartBalloonRiseFromGeometry(balloon, geometry) {
  const desiredBalloonBottom = geometry.balloonBottom;

  // Removing the animation exposes the layout position, so this is an absolute
  // transform from the new base geometry rather than a delta between snapshots.
  balloon.style.animation = "none";
  const baseGeometry = measureBalloonGeometry(balloon);
  const startDistance = baseGeometry.balloonBottom - desiredBalloonBottom;
  const remainingDistance = getBalloonClearanceDistance(desiredBalloonBottom, baseGeometry.layerTop);
  const riseSpeed = Number(balloon.dataset.riseSpeed);

  balloon.style.setProperty("--rise-start-distance", `${startDistance}px`);
  balloon.style.setProperty("--rise-distance", `${startDistance + remainingDistance}px`);
  balloon.style.setProperty("--rise-duration", `${remainingDistance / riseSpeed}s`);
  void balloon.offsetWidth;
  balloon.style.animation = "";
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

function invalidateBalloonResizeFrame() {
  balloonResizeState.frameVersion += 1;
  if (balloonResizeState.frameId !== null) {
    window.cancelAnimationFrame(balloonResizeState.frameId);
  }
  balloonResizeState.frameId = null;
}

function cancelBalloonResizeFrame() {
  invalidateBalloonResizeFrame();
  balloonResizeState.pausedRecord = null;
  balloonResizeState.pending = null;
}

function isCurrentBalloon(generation, balloon) {
  return (
    balloon instanceof HTMLElement
    && game.active
    && game.generation === generation
    && game.currentBalloon === balloon
    && balloon.isConnected
    && balloon.parentElement === elements.balloonLayer
    && !balloon.classList.contains("pop")
  );
}

function applyBalloonResize(record) {
  const { generation, balloon, geometry } = record;
  if (isCurrentBalloon(generation, balloon)) {
    restartBalloonRiseFromGeometry(balloon, geometry);
    clampActiveBalloon(generation, balloon);
  }
}

function isRecordForBalloon(record, generation, balloon) {
  return Boolean(record && record.generation === generation && record.balloon === balloon);
}

function scheduleBalloonResizeClamp() {
  const balloon = game.currentBalloon;
  const generation = game.generation;
  if (!isCurrentBalloon(generation, balloon)) {
    return;
  }

  if (game.paused) {
    if (isRecordForBalloon(balloonResizeState.pausedRecord, generation, balloon)) {
      balloonResizeState.pending = balloonResizeState.pausedRecord;
    } else if (!isRecordForBalloon(balloonResizeState.pending, generation, balloon)) {
      balloonResizeState.pending = {
        generation,
        balloon,
        geometry: measureBalloonGeometry(balloon),
      };
    }
    return;
  }
  if (balloonResizeState.frameId !== null) {
    return;
  }

  const record = {
    generation,
    balloon,
    geometry: measureBalloonGeometry(balloon),
  };
  const frameVersion = balloonResizeState.frameVersion;
  balloonResizeState.frameId = window.requestAnimationFrame(() => {
    if (frameVersion !== balloonResizeState.frameVersion) {
      return;
    }
    balloonResizeState.frameId = null;
    if (game.paused) {
      if (!isRecordForBalloon(balloonResizeState.pausedRecord, generation, balloon)
        && !isRecordForBalloon(balloonResizeState.pending, generation, balloon)) {
        balloonResizeState.pending = record;
      }
      return;
    }
    applyBalloonResize(record);
  });
}

function capturePausedBalloonGeometry() {
  const balloon = game.currentBalloon;
  const generation = game.generation;
  invalidateBalloonResizeFrame();
  if (!isCurrentBalloon(generation, balloon)) {
    balloonResizeState.pausedRecord = null;
    balloonResizeState.pending = null;
    return;
  }
  const geometry = measureBalloonGeometry(balloon);
  // This first post-pause snapshot is authoritative until resume. ResizeObserver
  // callbacks (including an already queued frame) may only reuse, never replace it.
  balloonResizeState.pausedRecord = {
    generation,
    balloon,
    geometry: {
      balloonBottom: geometry.balloonBottom,
      layerTop: geometry.layerTop,
    },
  };
  balloonResizeState.pending = balloonResizeState.pausedRecord;
}

function applyPendingBalloonResize() {
  const record = balloonResizeState.pending;
  balloonResizeState.pausedRecord = null;
  balloonResizeState.pending = null;
  if (record && isCurrentBalloon(record.generation, record.balloon)) {
    applyBalloonResize(record);
  }
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
  showFeedback(t("poppedFeedback", { points }), "success", "poppedFeedback", { points });
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

  showFeedback(t("retryFeedback"), "error", "retryFeedback");
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
  showFeedback(t("missedFeedback"), "error", "missedFeedback");
  updateDashboard();

  if (game.misses >= MAX_MISSES) {
    endGame();
  } else {
    startTransition(MISS_TRANSITION_DELAY, generation, balloon, spawnBalloon);
  }
}

function endGame() {
  const completedResult = {
    nickname: getDefaultNickname(),
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
  elements.startButton.textContent = t("start");
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
  leaderboardState.resultOutcome = null;
  elements.resultRankSummary.textContent = t("resultPrompt", { nickname: getDefaultNickname() });
  elements.nicknameInput.value = "";
  prepareResultDialogForNextRound();
  elements.restartButton.hidden = true;
  elements.resultDialog.showModal();
  window.setTimeout(() => elements.nicknameInput.focus(), 0);
}

function getResultMessage(accuracy) {
  if (game.popped === 0) {
    return t("noPopsResult");
  }
  if (accuracy >= 85) {
    return t("greatResult");
  }
  if (accuracy >= 60) {
    return t("goodResult");
  }
  return t("keepGoingResult");
}

function updateDashboard() {
  const speedLevel = 1 + Math.floor(game.popped / SPEED_UP_EVERY);
  elements.score.textContent = game.score;
  elements.streak.textContent = game.streak;
  elements.lives.textContent = "★".repeat(MAX_MISSES - game.misses) + "☆".repeat(game.misses);
  elements.lives.setAttribute("aria-label", t("remainingStars", { count: MAX_MISSES - game.misses }));
  elements.speed.textContent = speedLevel;
}

function updateModePresentation() {
  renderSelectedLeaderboard();

  if (game.active) {
    const mode = getModeText(game.activeModeId);
    const penaltyText = game.penaltyEnabled ? t("penaltyOn") : t("penaltyOff");
    elements.modeDescription.textContent = t("roundMode", { mode: mode.label, penalty: penaltyText, description: mode.description });
    return;
  }

  const selectedModeId = MODES[elements.modeSelect.value] ? elements.modeSelect.value : "letters";
  elements.modeDescription.textContent = getModeText(selectedModeId).description;
}

function updateTargetGuidance() {
  const balloon = game.currentBalloon;
  if (!balloon) {
    return;
  }

  const expectedCharacter = balloon.dataset.target[game.targetProgress];
  const guidance = getCharacterGuidance(expectedCharacter);
  highlightTarget(guidance);
  balloon.style.background = FINGER_COLORS[guidance.fingerId] || "#6d78e8";
  balloon.dataset.finger = guidance.fingerId;

  const characterLabel = formatCharacterForDisplay(expectedCharacter);
  const fingerLabel = getFingerLabel(guidance.fingerId);
  if (guidance.shiftCode) {
    const shiftLabel = guidance.shiftCode === "ShiftLeft" ? t("leftShift") : t("rightShift");
    elements.fingerBadge.textContent = t("guidanceShiftBadge", { shift: shiftLabel, finger: fingerLabel });
    elements.instruction.textContent = t("guidanceShift", { shift: shiftLabel, finger: fingerLabel, character: characterLabel });
  } else {
    elements.fingerBadge.textContent = fingerLabel;
    elements.instruction.textContent = t("guidance", { finger: fingerLabel, character: characterLabel });
  }
}

function getCharacterGuidance(character) {
  const code = KEY_CODE_BY_CHARACTER[character];
  const keyElement = code ? document.querySelector(`[data-code="${code}"]`) : null;
  const fingerId = keyElement?.dataset.finger || null;
  const needsShift = SHIFTED_SYMBOLS.has(character)
    || (getActiveMode().caseSensitive && isUppercaseLetter(character));
  const shiftCode = needsShift ? (fingerId?.startsWith("left-") ? "ShiftRight" : "ShiftLeft") : null;

  return { code, fingerId, shiftCode };
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
  return character === " " ? t("space") : character;
}

function formatTargetForSpeech(target) {
  return [...target].map(formatCharacterForDisplay).join("");
}

function showFeedback(message, type, key = null, variables = {}) {
  game.feedbackKey = key;
  game.feedbackVariables = variables;
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${type}`;
}

function clearFeedback() {
  game.feedbackKey = null;
  game.feedbackVariables = {};
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
  return nickname || getDefaultNickname();
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

function showStorageNotice(messageKey) {
  leaderboardState.storageNoticeKey = messageKey;
  elements.storageNotice.textContent = t(messageKey);
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
      showStorageNotice("storageUnreadable");
      return;
    }

    const sanitizedData = sanitizeStoredBoards(storedData.boards);
    leaderboardState.boards = sanitizedData.boards;
    if (sanitizedData.hasMalformedData) {
      showStorageNotice("storageMalformed");
    }
  } catch (error) {
    leaderboardState.persistenceAvailable = false;
    showStorageNotice("storageUnavailable");
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
    showStorageNotice("storageSaveFailed");
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

  leaderboardState.resultOutcome = outcome;
  elements.resultRankSummary.textContent = outcome.rank === null
    ? t("rankOutside")
    : t("rankSuccess", { rank: outcome.rank });

  elements.nicknameInput.disabled = true;
  elements.saveResultButton.disabled = true;
  elements.skipResultButton.disabled = true;
  elements.restartButton.hidden = false;
  elements.restartButton.focus();
}

function renderSelectedLeaderboard() {
  const modeId = MODES[elements.modeSelect.value] ? elements.modeSelect.value : "letters";
  const penaltyEnabled = elements.penaltyCheckbox.checked;
  const mode = getModeText(modeId);
  const board = leaderboardState.boards[getBoardKey(modeId, penaltyEnabled)] || [];
  const penaltyLabel = penaltyEnabled ? t("penaltyEnabled") : t("penaltyDisabled");

  elements.leaderboardContext.textContent = t("boardContext", { mode: mode.label, penalty: penaltyLabel, session: leaderboardState.persistenceAvailable ? "" : t("sessionOnly") });
  elements.leaderboardList.replaceChildren();

  if (board.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "leaderboard-empty";
    emptyItem.textContent = t("emptyBoard");
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
    score.textContent = t("points", { score: entry.score });
    detail.textContent = t("boardDetail", { accuracy, completed: entry.completedTargets, streak: entry.longestStreak, errors: entry.incorrectInputs });
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
  if (game.active && !window.confirm(t("confirmRestart"))) {
    return;
  }

  resetGame();
}

function togglePause() {
  if (!game.active) {
    return;
  }

  if (game.paused) {
    const deferredMiss = game.deferredMiss;
    const hasCurrentDeferredMiss = Boolean(
      deferredMiss
      && deferredMiss.generation === game.generation
      && deferredMiss.balloon === game.currentBalloon
    );
    if (!hasCurrentDeferredMiss) {
      applyPendingBalloonResize();
      game.deferredMiss = null;
    }
    game.paused = false;
    updatePauseControl(t("resumeAnnounce"));
    if (hasCurrentDeferredMiss) {
      missBalloon(deferredMiss.balloon, deferredMiss.generation);
    } else {
      resumeTransition();
    }
    elements.stage.focus({ preventScroll: true });
    return;
  }

  game.paused = true;
  pauseTransition();
  updatePauseControl(t("pauseAnnounce"));
  capturePausedBalloonGeometry();
}

function handleModeChange() {
  if (game.active) {
    resetGame({ savePending: false });
    return;
  }
  updateModePresentation();
}


function loadLocalePreference() {
  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (SUPPORTED_LOCALES.includes(storedLocale)) {
      currentLocale = storedLocale;
    }
  } catch (error) {
    currentLocale = "en";
  }
  elements.languageSelect.value = currentLocale;
}

function persistLocalePreference() {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
  } catch (error) {
    // The in-memory selection remains active when persistence is unavailable.
  }
}

function formatKeySymbolsForAria(keyElement) {
  if (keyElement.dataset.code === "Space") return t("space");
  if (keyElement.dataset.modifier === "shift") return keyElement.dataset.code === "ShiftLeft" ? t("leftShift") : t("rightShift");
  const base = keyElement.dataset.key;
  const shifted = keyElement.dataset.shiftKey;
  return shifted && shifted !== base ? `${base} / ${shifted}` : base.toUpperCase();
}

function renderKeyboardLocalization() {
  document.querySelectorAll(".key[data-finger]").forEach((keyElement) => {
    const fingerLabel = getFingerLabel(keyElement.dataset.finger);
    keyElement.querySelector(".key-finger").textContent = fingerLabel;
    if (keyElement.dataset.code === "Space") {
      keyElement.querySelector(".key-symbols span").textContent = t("space");
    }
    const home = keyElement.classList.contains("home-key") ? `, ${t("homeKey")}` : "";
    keyElement.setAttribute("aria-label", t("keyAria", { key: formatKeySymbolsForAria(keyElement), finger: fingerLabel, home }));
  });
}

function renderStaticLocalization() {
  document.documentElement.lang = currentLocale;
  document.title = t("documentTitle");
  document.querySelector('meta[name="description"]').setAttribute("content", t("documentDescription"));
  document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder)); });
  elements.stage.dataset.pauseLabel = t("paused");
  elements.stageMessage.innerHTML = t("readyHtml");
  elements.saveResultButton.textContent = t("saveContinue");
  elements.skipResultButton.textContent = t("skipContinue", { nickname: getDefaultNickname() });
  elements.restartButton.textContent = t("playAgain");
  for (const option of elements.modeSelect.options) {
    option.textContent = getModeText(option.value).label;
  }
  renderKeyboardLocalization();
}

function renderLocalizedState() {
  renderStaticLocalization();
  elements.startButton.textContent = game.active ? t("restart") : t("start");
  updatePauseControl();
  updateDashboard();
  updateModePresentation();
  if (game.currentBalloon) {
    game.currentBalloon.setAttribute("aria-label", t("inputAria", { target: formatTargetForSpeech(game.currentBalloon.dataset.target) }));
    renderTargetProgress();
    updateTargetGuidance();
  } else if (!game.active) {
    elements.fingerBadge.textContent = getFingerLabel("left-index");
    elements.instruction.textContent = t("initialInstruction");
  }
  if (game.feedbackKey) {
    elements.feedback.textContent = t(game.feedbackKey, game.feedbackVariables);
  }
  if (leaderboardState.storageNoticeKey) {
    elements.storageNotice.textContent = t(leaderboardState.storageNoticeKey);
  }
  if (leaderboardState.pendingResult || leaderboardState.resultOutcome) {
    elements.resultMessage.textContent = getResultMessage(Number.parseInt(elements.finalAccuracy.textContent, 10) || 0);
  }
  if (leaderboardState.pendingResult) {
    elements.resultRankSummary.textContent = t("resultPrompt", { nickname: getDefaultNickname() });
  } else if (leaderboardState.resultOutcome) {
    elements.resultRankSummary.textContent = leaderboardState.resultOutcome.rank === null
      ? t("rankOutside")
      : t("rankSuccess", { rank: leaderboardState.resultOutcome.rank });
  }
}

function handleLanguageChange() {
  currentLocale = SUPPORTED_LOCALES.includes(elements.languageSelect.value) ? elements.languageSelect.value : "en";
  elements.languageSelect.value = currentLocale;
  persistLocalePreference();
  renderLocalizedState();
}

elements.startButton.addEventListener("click", startOrRestartRound);
elements.pauseButton.addEventListener("click", togglePause);
elements.saveResultButton.addEventListener("click", () => finishResultFlow(elements.nicknameInput.value));
elements.skipResultButton.addEventListener("click", () => finishResultFlow(getDefaultNickname()));
elements.nicknameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    finishResultFlow(elements.nicknameInput.value);
  }
});
elements.resultDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  finishResultFlow(getDefaultNickname());
});
elements.restartButton.addEventListener("click", () => {
  elements.resultDialog.close();
  resetGame();
});
elements.modeSelect.addEventListener("change", handleModeChange);
elements.languageSelect.addEventListener("change", handleLanguageChange);
elements.penaltyCheckbox.addEventListener("change", updateModePresentation);
document.addEventListener("keydown", handleKeyDown);
window.addEventListener("pagehide", disconnectBalloonResizeObserver);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initializeBalloonResizeObserver();
  }
});

loadLocalePreference();
renderLocalizedState();
initializeBalloonResizeObserver();
loadLeaderboards();
renderSelectedLeaderboard();
