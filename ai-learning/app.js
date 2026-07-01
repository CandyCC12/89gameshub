const stages = [
  { range: "0-6", max: 6, title: "语言与习惯", copy: "感知、表达、情绪、生活习惯" },
  { range: "7-12", max: 12, title: "基础学习力", copy: "阅读、数学、表达、逻辑" },
  { range: "13-18", max: 18, title: "自驱与探索", copy: "学科能力、兴趣、项目体验" },
  { range: "19-25", max: 25, title: "专业与入门", copy: "专业选择、AI 素养、职业试炼" },
  { range: "26-40", max: 40, title: "职业成长", copy: "工作能力、管理、表达、财富" },
  { range: "41-60", max: 60, title: "复利人生", copy: "领导力、家庭、健康、再学习" },
  { range: "61-100", max: 100, title: "健康与传承", copy: "认知维护、兴趣、陪伴、记录" }
];

const personas = {
	  child: {
	    age: 7,
	    name: "Your child",
	    learnerLabel: "Child",
    stage: "Foundational Expression",
    goal: "Retell a short story with character, goal, reason, and sequence.",
    time: "10 minutes",
    duration: "10 min",
    taskType: "Story Expression",
    taskTitle: "Retell the story in three clear sentences.",
	    taskBody: "The AI listens first, then asks one follow-up question to test whether the child can add the missing reason.",
    hero: "Find your child's expression gap in 3 minutes.",
    challengeTitle: "Assessment → Result → Course → Interaction → Report",
    challengeCopy: "A short expression assessment becomes a focused 7-day course with daily AI coaching and a parent-ready report.",
    teacherTitle: "The AI found one missing piece: the reason behind the action.",
    unlockTitle: "Reason Link Lv.1",
    unlockCopy: "Use one reason sentence to explain why the character acted.",
    tomorrowTitle: "Story Sequence",
    tomorrowCopy: "Use first, then, and finally to retell the story clearly.",
    score: "B+",
	    progress: "The questionnaire suggests the first trial should test whether your child can add one reason sentence.",
    next: "Tomorrow's lesson will train sequence words: first, then, finally.",
    percent: 68,
    ops: {
      streak: 12,
      xp: 420,
      gems: 86,
      hearts: "5/5",
      league: "Pearl League",
      rank: "#8",
      prompt: "Complete one more lesson to enter the promotion zone.",
      reward: "+15 XP · +3 Gems",
      heartsIcon: "❤️❤️❤️❤️❤️",
      hints: 2,
      quests: [
        ["Finish one AI coaching interaction", 100],
        ["Retell the story in at least 3 sentences", 66],
        ["Keep the learning streak to Day 13", 92]
      ]
    },
    skills: [
      ["Story Understanding", 72, "#244d3d"],
      ["Oral Expression", 58, "#315f8a"],
      ["Focus Time", 64, "#9a6b18"],
      ["Reason Link", 46, "#a8484d"]
    ],
    diagnosis: [
      ["Assess", "Use a 3-minute story retell to check clarity and completeness."],
	      ["Detect", "The child may name the character and goal, but often misses the reason and sequence."],
      ["Assign", "Today's course trains one skill: adding a reason sentence."]
    ],
    steps: ["Listen to a short story", "Retell it in 3 sentences", "Answer one AI follow-up", "Receive expression feedback"],
    chat: [
	      ["ai", "Today we only have one task. Tell me in three sentences: who is the character, what does she want, and what happened at the end?"],
      ["user", "The bunny went to the forest. She wanted to send a letter to the moon."],
      ["ai", "Good. You named the character and the goal. One key part is missing: why did she want to send the letter? Add that sentence to pass."]
    ],
    archive: ["Assessment: completed one story retell", "Current gap: reason link is incomplete", "Next lesson: practice first, then, and finally"]
  },
  teen: {
    age: 18,
    name: "Alex",
    learnerLabel: "Alex",
    stage: "青年方向探索",
    goal: "判断自己适合的专业方向，并完成一个小项目验证。",
    time: "25 分钟",
    duration: "25 min",
    taskType: "职业探索",
    taskTitle: "比较游戏策划、AI 产品经理、数据分析三个方向。",
    taskBody: "AI 老师根据兴趣、能力和可训练性，要求学生用一个真实小任务验证方向，而不是只看职业介绍。",
    hero: "Alex，今天完成 1 个职业判断任务，就能保住 Diamond League 前 5。",
    challengeTitle: "今日关卡：把兴趣变成可训练能力",
    challengeCopy: "不要只说喜欢什么，今天要说清楚你愿意长期练什么。",
    teacherTitle: "老师会帮你把兴趣翻译成职业能力。",
    unlockTitle: "方向判断 Lv.2",
    unlockCopy: "把“我喜欢”升级成“我能训练”。",
    tomorrowTitle: "竞品拆解任务",
    tomorrowCopy: "用 300 字拆一款游戏为什么让玩家第二天回来。",
    score: "A-",
    progress: "能够把兴趣转成可训练能力，已经从“喜欢什么”进入“能做什么”的判断。",
    next: "明天完成一份 300 字竞品功能拆解，重点写清目标用户和留存作用。",
    percent: 74,
    ops: {
      streak: 21,
      xp: 980,
      gems: 132,
      hearts: "4/5",
      league: "Diamond League",
      rank: "第 5 名",
      prompt: "再完成 1 个项目任务，本周可晋级前 3。",
      reward: "+25 XP · +5 Gems",
      heartsIcon: "❤️❤️❤️❤️♡",
      hints: 1,
      quests: [
        ["完成一次职业方向判断", 100],
        ["提交 300 字竞品拆解", 40],
        ["邀请朋友一起完成 Quest", 20]
      ]
    },
    skills: [
      ["兴趣清晰度", 78, "#315f8a"],
      ["项目意识", 62, "#244d3d"],
      ["表达结构", 70, "#9a6b18"],
      ["现实验证", 54, "#a8484d"]
    ],
    diagnosis: [
      ["测一测", "让学生解释自己为什么喜欢某个方向。"],
      ["判一判", "区分“兴趣描述”和“可长期训练的能力”。"],
      ["排任务", "安排一个 30 分钟小项目验证职业方向。"]
    ],
    steps: ["选择 3 个职业方向", "写出喜欢原因", "补充可训练能力", "生成一周验证项目"],
    chat: [
      ["ai", "Alex，今天不聊梦想，聊训练。你说喜欢游戏策划，那你愿意长期练哪一个能力？"],
      ["user", "我愿意练玩法拆解和写方案。"],
      ["ai", "这就对了。你把兴趣说成了可训练能力。下一步：选一款游戏，拆它为什么让玩家第二天还想回来。"]
    ],
    archive: ["方向偏好：游戏策划 / AI 产品", "待验证能力：玩法拆解、方案表达", "明日任务：完成 300 字竞品拆解"]
  },
  adult: {
    age: 32,
    name: "Chen",
    learnerLabel: "Chen",
    stage: "职业能力提升",
    goal: "把 AI 用进真实工作流，提高分析、表达和决策质量。",
    time: "20 分钟",
    duration: "20 min",
    taskType: "AI 工作力",
    taskTitle: "用 AI 分析一份业务日报，并提出 3 个行动建议。",
    taskBody: "AI 老师会检查建议是否有指标依据、是否可执行、是否能被团队理解和复盘。",
    hero: "Chen，今天完成 1 条带指标的建议，就能从排行榜危险区回来。",
    challengeTitle: "今日关卡：建议必须绑定指标",
    challengeCopy: "你已经能提出动作了，今天练把动作和目标指标绑在一起。",
    teacherTitle: "老师发现你的动作感不错，但证据链还不稳。",
    unlockTitle: "指标表达 Lv.1",
    unlockCopy: "每个业务建议都必须对应一个目标指标。",
    tomorrowTitle: "五段式复盘",
    tomorrowCopy: "把建议拆成现象、原因、动作、指标、风险。",
    score: "B",
    progress: "能提出动作，但数据证据和复盘设计还不够完整。",
    next: "明天练习把一个运营建议拆成：现象、原因、动作、指标、风险。",
    percent: 61,
    ops: {
      streak: 8,
      xp: 760,
      gems: 64,
      hearts: "3/5",
      league: "Emerald League",
      rank: "第 11 名",
      prompt: "完成一次日报分析，可回到安全区。",
      reward: "+20 XP · +4 Gems",
      heartsIcon: "❤️❤️❤️♡♡",
      hints: 2,
      quests: [
        ["提交一条带指标的业务建议", 80],
        ["完成一次 AI 复盘", 60],
        ["今天 20 分钟深度训练", 25]
      ]
    },
    skills: [
      ["AI 工具使用", 66, "#244d3d"],
      ["数据归因", 52, "#a8484d"],
      ["业务表达", 70, "#315f8a"],
      ["行动设计", 58, "#9a6b18"]
    ],
    diagnosis: [
      ["测一测", "给一份业务日报，让学习者找异常并提出建议。"],
      ["判一判", "识别是否会从现象拆到原因、指标和动作。"],
      ["排任务", "先训练“一个建议必须绑定一个指标”。"]
    ],
    steps: ["读取业务日报", "找出一个异常", "提出 3 个动作", "AI 检查指标依据"],
    chat: [
      ["ai", "Chen，你的第二条建议方向对，但老板会追问：影响哪个指标？请补目标指标和预期变化。"],
      ["user", "目标是提高 D7 留存，先处理新手第 3 天任务断点。"],
      ["ai", "可以，已经更像业务建议了。再补一层：你准备用什么数据证明第 3 天任务断点是主要原因？"]
    ],
    archive: ["工作力短板：数据归因不稳定", "已完成：一次日报行动建议", "明日任务：现象、原因、动作、指标、风险五段式"]
  },
  senior: {
    age: 68,
    name: "Wang",
    learnerLabel: "Wang",
    stage: "健康认知陪伴",
    goal: "保持认知活跃、生活规律，并持续学习感兴趣的内容。",
    time: "12 分钟",
    duration: "12 min",
    taskType: "认知维护",
    taskTitle: "完成一次记忆力小游戏，并记录今天的睡眠和散步。",
    taskBody: "AI 老师用低压力方式陪伴练习，同时把健康记录整理给本人和家人查看。",
    hero: "Wang，今天 12 分钟练习后，可以打开家庭回忆宝箱。",
    challengeTitle: "今日关卡：把记忆和今天连接起来",
    challengeCopy: "不是背答案，而是用词语讲一句今天真实发生的小事。",
    teacherTitle: "老师会慢慢陪你练，不赶时间。",
    unlockTitle: "生活记忆 Lv.3",
    unlockCopy: "把词语、情绪和真实生活连接起来。",
    tomorrowTitle: "家庭照片回忆",
    tomorrowCopy: "看一张照片，说出人物、地点和一件小事。",
    score: "A",
    progress: "记忆表现稳定，能够把词语和真实生活连接起来。",
    next: "明天继续 12 分钟练习，并加入一次家庭照片回忆任务。",
    percent: 82,
    ops: {
      streak: 34,
      xp: 560,
      gems: 118,
      hearts: "5/5",
      league: "Ruby League",
      rank: "第 3 名",
      prompt: "今天保持 12 分钟练习，可打开家庭回忆宝箱。",
      reward: "+12 XP · +6 Gems",
      heartsIcon: "❤️❤️❤️❤️❤️",
      hints: 3,
      quests: [
        ["完成 5 词记忆练习", 100],
        ["记录一次散步或睡眠", 80],
        ["和家人分享成长摘要", 30]
      ]
    },
    skills: [
      ["记忆唤起", 82, "#244d3d"],
      ["生活规律", 76, "#315f8a"],
      ["情绪表达", 70, "#9a6b18"],
      ["家庭连接", 88, "#a8484d"]
    ],
    diagnosis: [
      ["测一测", "用低压力词语回忆和生活记录观察认知状态。"],
      ["判一判", "判断记忆、表达、情绪和生活规律是否稳定。"],
      ["排任务", "安排短时认知练习和家庭回忆任务。"]
    ],
    steps: ["记住 5 个词", "讲一句今天的小事", "记录睡眠和散步", "生成家人可见摘要"],
    chat: [
      ["ai", "Wang，今天很稳。你记住了 5 个词中的 4 个，我们用其中两个词讲一句今天发生的小事。"],
      ["user", "我今天散步时看见了花，也想起孙女上周送我的书。"],
      ["ai", "很好，这不是死记硬背，你把词语和真实生活连接起来了。明天我们用一张家庭照片继续。"]
    ],
    archive: ["认知状态：稳定", "生活记录：已记录散步和睡眠", "明日任务：家庭照片回忆"]
  }
};

let currentPersona = "child";
let activeLessonTaskIndex = 0;
const trialState = {
  completed: false,
  firstSubmitted: false,
  firstAnswer: "",
  firstFeedback: "",
  improvedAnswer: "",
  answer: "",
  feedback: "",
  passed: false,
  taskKey: "",
  recordings: []
};

let activeRecorder = null;
let activeRecordingChunks = [];
let activeRecognition = null;
let activeRecordingPhase = "";
let activeTranscript = "";

const pageNodes = document.querySelectorAll("[data-page]");
const routeLinks = document.querySelectorAll("[data-route]");
const stageRail = document.getElementById("stageRail");
const ageRange = document.getElementById("ageRange");
const ageOutput = document.getElementById("ageOutput");
const personaButtons = document.querySelectorAll(".persona-card");

const fields = {
  personaName: document.getElementById("personaName"),
  personaStage: document.getElementById("personaStage"),
  goalText: document.getElementById("goalText"),
  timeText: document.getElementById("timeText"),
  skillList: document.getElementById("skillList"),
  diagnosisFlow: document.getElementById("diagnosisFlow"),
  lessonDuration: document.getElementById("lessonDuration"),
  taskType: document.getElementById("taskType"),
  taskTitle: document.getElementById("taskTitle"),
	  taskBody: document.getElementById("taskBody"),
	  practiceStory: document.getElementById("practiceStory"),
	  practiceMethod: document.getElementById("practiceMethod"),
	  practiceExample: document.getElementById("practiceExample"),
	  sceneQuestion: document.getElementById("sceneQuestion"),
	  dubbingLine: document.getElementById("dubbingLine"),
	  firstAttemptText: document.getElementById("firstAttemptText"),
	  improvedAttemptText: document.getElementById("improvedAttemptText"),
	  rubricList: document.getElementById("rubricList"),
	  trialPrompt: document.getElementById("trialPrompt"),
	  interactionOptions: document.getElementById("interactionOptions"),
	  lessonSteps: document.getElementById("lessonSteps"),
	  courseMapPath: document.getElementById("courseMapPath"),
  chatLog: document.getElementById("chatLog"),
  answerInput: document.getElementById("answerInput"),
  answerSubmit: document.getElementById("answerSubmit"),
  answerForm: document.getElementById("answerForm"),
  coachMode: document.getElementById("coachMode"),
	  scoreText: document.getElementById("scoreText"),
	  reportStatus: document.getElementById("reportStatus"),
	  reportQuizSignal: document.getElementById("reportQuizSignal"),
	  reportEvidence: document.getElementById("reportEvidence"),
	  progressText: document.getElementById("progressText"),
	  trialEvidenceCards: document.getElementById("trialEvidenceCards"),
  nextText: document.getElementById("nextText"),
  ringValue: document.getElementById("ringValue"),
  ringPercent: document.getElementById("ringPercent"),
  archiveList: document.getElementById("archiveList"),
  homeHeroTitle: document.getElementById("homeHeroTitle"),
  challengeBadge: document.getElementById("challengeBadge"),
  challengeTitle: document.getElementById("challengeTitle"),
  challengeCopy: document.getElementById("challengeCopy"),
  challengeReward: document.getElementById("challengeReward"),
  teacherTitle: document.getElementById("teacherTitle"),
  profileIntro: document.getElementById("profileIntro"),
  lessonHeroTitle: document.getElementById("lessonHeroTitle"),
  lessonIntro: document.getElementById("lessonIntro"),
  heartStatus: document.getElementById("heartStatus"),
  hintStatus: document.getElementById("hintStatus"),
  unlockTitle: document.getElementById("unlockTitle"),
  unlockCopy: document.getElementById("unlockCopy"),
  passLabel: document.getElementById("passLabel"),
  reportHeroTitle: document.getElementById("reportHeroTitle"),
  reportIntro: document.getElementById("reportIntro"),
  reportUnlock: document.getElementById("reportUnlock"),
  reportUnlockCopy: document.getElementById("reportUnlockCopy"),
	  tomorrowTitle: document.getElementById("tomorrowTitle"),
	  tomorrowCopy: document.getElementById("tomorrowCopy"),
	  reportCta: document.getElementById("reportCta"),
	  finishLesson: document.getElementById("finishLesson"),
	  teacherVideo: document.getElementById("teacherVideo"),
	  teacherStage: document.getElementById("teacherStage"),
	  teacherLine: document.getElementById("teacherLine"),
	  sceneVideo: document.getElementById("sceneVideo"),
	  scenePlay: document.getElementById("scenePlay"),
	  sceneCopyTitle: document.getElementById("sceneCopyTitle"),
	  sceneCopyBody: document.getElementById("sceneCopyBody"),
	  weakAnswerText: document.getElementById("weakAnswerText"),
	  weakAnswerNote: document.getElementById("weakAnswerNote"),
	  teacherPrimaryAction: document.getElementById("teacherPrimaryAction"),
	  teacherActionHint: document.getElementById("teacherActionHint"),
	  aiLine: document.getElementById("aiLine"),
	  playAiLine: document.getElementById("playAiLine"),
	  recordFirst: document.getElementById("recordFirst"),
	  recordSecond: document.getElementById("recordSecond"),
	  voiceStatus: document.getElementById("voiceStatus"),
	  voiceScore: document.getElementById("voiceScore"),
	  analysisMeter: document.getElementById("analysisMeter")
		};

const opsFields = {
  mobileStage: document.getElementById("mobileStage"),
  mobileStreak: document.getElementById("mobileStreak"),
  mobileXp: document.getElementById("mobileXp"),
  homeStreak: document.getElementById("homeStreak"),
  homeXp: document.getElementById("homeXp"),
  homeGems: document.getElementById("homeGems"),
  lessonReward: document.getElementById("lessonReward"),
  opsStreak: document.getElementById("opsStreak"),
  opsXp: document.getElementById("opsXp"),
  opsGems: document.getElementById("opsGems"),
  opsHearts: document.getElementById("opsHearts"),
  opsLeague: document.getElementById("opsLeague"),
  opsRank: document.getElementById("opsRank"),
  opsPrompt: document.getElementById("opsPrompt"),
  questList: document.getElementById("questList")
};

const modelLineAudio = new Audio("ad-assets/model-line-reading-corner.mp3");
const teacherIntroAudio = new Audio();

const quizNodes = {
  back: document.getElementById("quizBack"),
  stepText: document.getElementById("quizStepText"),
  progress: document.getElementById("quizProgress"),
  category: document.getElementById("quizCategory"),
  question: document.getElementById("quizQuestion"),
  hint: document.getElementById("quizHint"),
  options: document.getElementById("quizOptions"),
  continue: document.getElementById("quizContinue"),
  footerText: document.getElementById("quizFooterText")
};

const paymentDialog = document.getElementById("paymentDialog");
const paymentForm = document.getElementById("paymentReservationForm");
const paymentSummary = document.getElementById("paymentSummary");
const paymentEmail = document.getElementById("paymentEmail");
const paymentNote = document.getElementById("paymentNote");
const paymentStatus = document.getElementById("paymentStatus");
const paymentDialogClose = document.getElementById("paymentDialogClose");
let selectedPaymentPlan = "fourWeek";
let pendingPaymentSource = "paywall";
const freeTrialLessonLimit = 1;

function trackPaymentEvent(eventName, payload = {}) {
  const detail = {
    event: eventName,
    route: document.querySelector(".page.active")?.dataset.page || "unknown",
    timestamp: new Date().toISOString(),
    ...payload
  };
  window.dispatchEvent(new CustomEvent("payment_funnel_event", { detail }));
  if (window.dataLayer) window.dataLayer.push(detail);
  console.info("[payment]", detail);
}

function getPaymentPlan(planKey = selectedPaymentPlan) {
  return window.PAYMENT_CONFIG?.plans?.[planKey] || {
    name: "4-WEEK PLAN",
    price: "$19.99",
    label: "Most popular"
  };
}

function syncSelectedPaymentPlan(card) {
  const groupName = card.querySelector("input")?.name;
  if (!groupName) return;
  document.querySelectorAll(`.price-option input[name="${groupName}"]`).forEach((input) => {
    const option = input.closest(".price-option");
    const isSelected = option === card;
    option?.classList.toggle("selected", isSelected);
    input.checked = isSelected;
  });
  selectedPaymentPlan = card.dataset.planKey || card.querySelector("input")?.value || selectedPaymentPlan;
  trackPaymentEvent("plan_select", {
    plan_key: selectedPaymentPlan,
    plan_name: getPaymentPlan(selectedPaymentPlan).name
  });
}

function getActiveSelectedPaymentPlan() {
  const activePage = document.querySelector(".page.active") || document;
  const checked = activePage.querySelector(".price-option input:checked");
  return checked?.closest(".price-option")?.dataset.planKey || selectedPaymentPlan;
}

function openPaymentReservation(source = "paywall") {
  pendingPaymentSource = source;
  selectedPaymentPlan = getActiveSelectedPaymentPlan();
  const plan = getPaymentPlan(selectedPaymentPlan);
  const paymentLink = window.PAYMENT_CONFIG?.links?.[selectedPaymentPlan];
  trackPaymentEvent("payment_intent_click", {
    source,
    mode: window.PAYMENT_CONFIG?.mode || "reservation",
    plan_key: selectedPaymentPlan,
    plan_name: plan.name,
    price: plan.price
  });

  if (window.PAYMENT_CONFIG?.mode === "link" && paymentLink) {
    window.location.href = paymentLink;
    return;
  }

  if (!paymentDialog) return;
  if (paymentSummary) paymentSummary.textContent = `${plan.name} · ${plan.price} · ${plan.label}`;
  if (paymentStatus) paymentStatus.textContent = "";
  if (typeof paymentDialog.showModal === "function") {
    paymentDialog.showModal();
  } else {
    paymentDialog.setAttribute("open", "");
  }
  window.setTimeout(() => paymentEmail?.focus(), 50);
}

function closePaymentDialog() {
  if (!paymentDialog) return;
  if (typeof paymentDialog.close === "function") {
    paymentDialog.close();
  } else {
    paymentDialog.removeAttribute("open");
  }
}

function savePaymentReservation(email, note) {
  const plan = getPaymentPlan(selectedPaymentPlan);
  const record = {
    product: window.PAYMENT_CONFIG?.product || "89 AI Expression Camp",
    planKey: selectedPaymentPlan,
    planName: plan.name,
    price: plan.price,
    email,
    note,
    createdAt: new Date().toISOString()
  };
  try {
    const records = JSON.parse(localStorage.getItem("paymentReservations") || "[]");
    records.push(record);
    localStorage.setItem("paymentReservations", JSON.stringify(records));
  } catch (error) {
    console.warn("[payment] reservation storage failed", error);
  }
  trackPaymentEvent("payment_reservation_submit", {
    plan_key: record.planKey,
    plan_name: record.planName,
    price: record.price
  });
  return record;
}

const quizSteps = [
  {
    type: "question",
    category: "Profile",
    question: "How old is your child?",
    hint: "The course changes by age because expression skills develop in stages.",
    options: [
      ["6-7", "Early reader"],
      ["8-10", "Growing speaker"],
      ["11-12", "Pre-teen"],
      ["13+", "Teen"]
    ]
  },
  {
    type: "question",
    category: "Profile",
    question: "Which speaking moment worries you most right now?",
    hint: "Pick the moment you most want this course to improve first.",
    options: [
      ["🙋", "Answering a teacher's question"],
      ["📚", "Explaining a story after reading"],
      ["💬", "Saying more than one short sentence"],
      ["🤝", "Joining or resolving peer situations"]
    ]
  },
  {
    type: "question",
    category: "Challenge",
    question: "When your child is asked to explain an answer, what usually happens?",
    hint: "This is the strongest signal for the first lesson.",
    options: [
      ["😶", "They freeze or say \"I don't know\""],
      ["🟡", "They answer, but it is very short"],
      ["🔁", "They repeat the same idea"],
      ["✅", "They explain clearly most of the time"]
    ]
  },
  {
    type: "scale",
    category: "Current Level",
    question: "My child often has ideas, but needs help turning them into a clear answer.",
    hint: "This helps us decide whether to train confidence, structure, or story logic first.",
    options: [
      ["❌", "Strongly disagree"],
      ["👎", "Somewhat disagree"],
      ["➖", "Neutral"],
      ["👍", "Somewhat agree"],
      ["✅", "Strongly agree"]
    ]
  },
  {
    type: "question",
    category: "Story Skills",
    question: "When your child explains a story or opinion, what is usually missing?",
    hint: "The first trial will target the smallest missing piece.",
    options: [
      ["👤", "Who the story is about"],
      ["🎯", "What the character wants"],
      ["🔗", "A clear reason or because"],
      ["➡️", "What happened first, next, and last"]
    ]
  },
  {
    type: "insight",
    category: "Insight",
    question: "The problem is not your child's ideas. It is untrained expression.",
    hint: "Children often understand more than they can explain. Short daily practice closes that gap.",
    options: []
  },
  {
    type: "question",
    category: "Reading",
    question: "After reading, how often can your child explain the story clearly?",
    hint: "This helps us decide whether to start with comprehension or expression.",
    options: [
      ["✅", "Almost always"],
      ["🙂", "Sometimes"],
      ["😕", "Rarely"],
      ["❓", "I am not sure"]
    ]
  },
  {
    type: "question",
    category: "Classroom",
    question: "If an adult asks \"why?\", how does your child usually respond?",
    hint: "This tells us whether the first lesson should train reasons and evidence.",
    options: [
      ["😶", "They get stuck"],
      ["🗣", "They give a short reason"],
      ["📌", "They give a reason but no example"],
      ["✅", "They give a reason and example"]
    ]
  },
  {
    type: "question",
    category: "Practice Style",
    question: "What kind of speaker do you want your child to become?",
    hint: "This gives the course a clear end state.",
    options: [
      ["🌟", "Confident storyteller"],
      ["🙋", "Brave classroom speaker"],
      ["🤝", "Warm social communicator"],
      ["🧠", "Clear logical thinker"]
    ]
  },
  {
    type: "question",
    category: "Goals",
    question: "What stands in the way of consistent progress?",
    hint: "This helps us tune the course rhythm.",
    options: [
      ["😵", "Overthinking"],
      ["🧭", "Not knowing where to start"],
      ["😳", "Fear of judgment"],
      ["📅", "Busy schedule"],
      ["🔁", "Hard to commit"]
    ]
  },
  {
    type: "question",
    category: "Parent Role",
    question: "How do you want to support the course at home?",
    hint: "Parents can be hands-off or receive daily prompts.",
    options: [
      ["📩", "Just send me the report"],
      ["🧩", "Give me one parent prompt per day"],
      ["👪", "Let us do a short task together"],
      ["📊", "Show me progress only"]
    ]
  },
  {
    type: "question",
    category: "Time",
    question: "How much time can your child practice each day?",
    hint: "Short daily practice usually works better than long lessons.",
    options: [
      ["⏱", "5 minutes"],
      ["✅", "10 minutes"],
      ["💪", "15 minutes"],
      ["🔥", "20+ minutes"]
    ]
  },
  {
    type: "insight",
    category: "Trial Ready",
    question: "Your child's first speaking trial is ready.",
    hint: "We will test one skill first: can your child turn a short answer into a reason-based answer after one coach example?",
    options: []
  }
];

let quizIndex = 0;
const quizAnswers = new Array(quizSteps.length).fill(null);

const courseTemplates = {
  join: {
    taskType: "Join the Game",
    taskTitle: "Ask to join classmates without standing silently or interrupting.",
    taskBody: "A real school social scenario: the child wants to join classmates who are already playing. The lesson trains a request that is polite, specific, and easy to accept.",
    unlockTitle: "Join In Lv.1",
    unlockCopy: "Ask to join with a polite request and one helpful role.",
    passLabel: "Use request + role + friendly tone to pass",
    aiLine: "Sorry, we already started the game.",
    aiPrompt: "Two classmates are already playing a playground game. You want to join, but you do not want to interrupt awkwardly. Say one sentence that asks to join and offers a helpful role.",
    trialPrompt: "Write what you would say to join the game.",
    sceneQuestion: "What should Kai say if he wants to join the game?",
    dubbingLine: "Can I join? I can...",
    checkFocus: "joining a group without sounding awkward",
    teacherIntro: "To join a group, use three steps. Ask to join, offer a helpful role, and respect the answer. Now try the recess scene.",
    sceneTitle: "Kai wants to join classmates who already started a tower challenge.",
    sceneCopy: "After watching, the child practices asking to join with a specific helpful role.",
    weakAnswer: "“Can I play?”",
    weakAnswerNote: "It is polite, but too vague. The group still has to figure out how to include him.",
    media: {
      teacherVideo: "ad-assets/generated-course/day3-join-game-teacher-female-seedance.mp4",
      modelAudio: "ad-assets/generated-course/day3-model-line.wav",
      sceneVideo: "ad-assets/generated-course/day3-join-game-scene-clean.mp4"
    },
    material: "Kai sees three classmates building a tower challenge during recess. They are already laughing and taking turns. Kai wants to join, but he does not want to push in or stand there silently.",
    method: "Ask + Offer a role + Respect the answer",
    example: "Can I join the next round? I can help keep score, and if this round is full, I can wait for the next one.",
    choices: [
      ["Too vague", "Can I play?"],
      ["Better", "Can I join the next round? I can "],
      ["Strong", "Can I join the next round? I can help keep score, and "]
    ],
    rubric: ["Asks to join politely.", "Offers one clear role or contribution.", "Sounds friendly instead of demanding."]
  },
  character: {
    taskType: "Final Speaking Challenge",
    taskTitle: "Tell a complete story answer with who, goal, action, and why.",
    taskBody: "The final check asks the child to combine the week's skills: name the character, explain what they want, say what they did, and add one reason. This is the proof that the child can move beyond one-word answers.",
    unlockTitle: "Final Challenge Lv.1",
    unlockCopy: "Use one complete response that includes who, goal, action, and why.",
    passLabel: "Use who, goal, action, and why to pass",
    aiPrompt: "Watch the short story. Then answer in four parts: who is it about, what did they want, what did they do, and why did it matter?",
    trialPrompt: "Tell the full story answer: who is the character, what did she want, what did she do, and why did it matter?",
    sceneQuestion: "Can you explain the whole story clearly in one answer?",
    dubbingLine: "Mia wanted to help because...",
    checkFocus: "combining character, goal, action, and reason in one clear answer",
    teacherIntro: "Today is the final challenge. Tell the whole answer with four parts: who, goal, action, and why it mattered. Now try the new student story.",
    sceneTitle: "Mia notices a new student sitting alone during project time.",
    sceneCopy: "After watching, the child explains who the story is about, what Mia wanted, what she did, and why it mattered.",
    weakAnswer: "“Mia helped a girl and they made a poster.”",
    weakAnswerNote: "It names the action, but it does not explain Mia's goal or why the moment mattered.",
    media: {
      teacherVideo: "ad-assets/generated-course/day7-final-challenge-teacher.mp4",
      modelAudio: "ad-assets/generated-course/day7-model-line.mp3",
      sceneVideo: "ad-assets/generated-course/day7-new-student-scene-clean.mp4"
    },
    material: "Mia notices that a new student is sitting alone during project time. She wants the student to feel included, so she invites her to join the group and gives her a simple job. By the end, the group finishes the poster together.",
    method: "Who + Goal + Action + Why",
    example: "Mia is the main character. She wanted the new student to feel included, so she invited her to join the group and gave her a simple job. This mattered because the group worked together instead of leaving someone out.",
    choices: [
      ["Who", "Mia is the main character. She "],
      ["Goal", "Mia wanted the new student to feel included, so "],
      ["Full answer", "Mia is the main character. She wanted ___, so ___. This mattered because ___."]
    ],
    rubric: ["Names the character.", "Explains the goal.", "Connects the action to one reason."]
  },
  goal: {
    taskType: "Goal Clarity",
    taskTitle: "Explain what the character wants in one clear sentence.",
    taskBody: "The AI checks whether the child can move from naming events to explaining the character's goal.",
    unlockTitle: "Goal Clarity Lv.1",
    unlockCopy: "Make the character's goal clear before retelling the plot.",
    passLabel: "Add what the character wants to pass",
    aiPrompt: "Tell me the character's goal in one sentence. What did the character want, and what did they try to do?",
    trialPrompt: "Write one sentence that explains what Noah wanted and what he did.",
    sceneQuestion: "What did Noah want to do when he saw the smoke?",
    dubbingLine: "I saw smoke near the playground, so I...",
    checkFocus: "what the character wants",
    material: "Noah saw smoke near the playground. He ran to tell the teacher before the younger kids arrived.",
    method: "Character + Wanted to + Action",
    example: "Noah wanted to keep the younger kids safe, so he ran to tell the teacher about the smoke.",
    choices: [
      ["Noah wanted to ", "Noah wanted to "],
      ["So he ", "Noah wanted to keep them safe, so he "],
      ["Goal + action", "Noah wanted to keep the younger kids safe, so he ran to "]
    ],
    rubric: ["Says what the character wanted.", "Connects the goal to the action.", "Uses one complete sentence."]
  },
  reason: {
    taskType: "Reason Builder",
    taskTitle: "Turn a short answer into a clear opinion with evidence.",
    taskBody: "The AI captures the child's natural answer first, then teaches one reusable frame: choice, because, example.",
    unlockTitle: "Reason Builder Lv.1",
    unlockCopy: "Give a clear choice, one reason, and one concrete example.",
    passLabel: "Use choice, because, and one example to pass",
    aiPrompt: "A teacher asks the class to choose tomorrow's activity. Give a full answer with your choice, your reason, and one example.",
    trialPrompt: "Answer the teacher: should the class choose a reading corner or a game day? Explain your choice.",
    sceneQuestion: "Which activity should the class choose, and why?",
    dubbingLine: "I choose the reading corner because it helps everyone calm down. For example, we can read quietly after lunch.",
    checkFocus: "giving a reason with evidence",
    teacherIntro: "Hi, I am your speaking coach. Today, we will practice one simple skill: understanding what the character wants. When you know what someone wants, your answer becomes clearer, stronger, and easier to say. Let's try it together.",
    sceneTitle: "The class can choose a reading corner or a game day.",
    sceneCopy: "After watching, the child answers one question out loud: which one should they choose, and why?",
    weakAnswer: "“I don't know... maybe the reading corner.”",
    weakAnswerNote: "It sounds unsure and gives the listener nothing to respond to.",
    media: {
      teacherVideo: "ad-assets/AI School Coach Intro Human Video.mp4",
      modelAudio: "ad-assets/model-line-reading-corner.mp3",
      sceneVideo: "ad-assets/reading-corner-scene-narrated.mp4"
    },
    material: "The class earned 30 minutes of free activity. Some students want a cozy reading corner. Others want a game day. The teacher asks each student to explain one choice.",
    method: "Choice + Because + Example",
    example: "I choose the reading corner because it helps everyone calm down after lunch. For example, students can read quietly, share favorite books, and come back ready to learn.",
    choices: [
      ["I choose", "I choose the reading corner because "],
      ["Because", "I choose game day because "],
      ["For example", "I choose the reading corner because it helps the class focus. For example, "]
    ],
    rubric: ["Makes one clear choice.", "Uses because to explain the reason.", "Adds one concrete example, not only a feeling."]
  },
  sequence: {
    taskType: "Story Sequence",
    taskTitle: "Retell one story in order without jumping around.",
    taskBody: "The AI helps the child turn scattered details into a clean beginning, middle, and ending.",
    unlockTitle: "Story Sequence Lv.1",
    unlockCopy: "Use first, then, and finally to make the story easy to follow.",
    passLabel: "Use first, then, and finally to pass",
    aiPrompt: "Retell the story using three words: first, then, and finally. Keep each part short and do not add extra details.",
    trialPrompt: "Retell the lost lunchbox story using first, then, and finally.",
    sceneQuestion: "What happened first, then, and finally in the lunchbox story?",
    dubbingLine: "First, I found the lunchbox. Then...",
    checkFocus: "what happened first, next, and last",
    teacherIntro: "Story order is simple. Use first, then, finally. Tell the start, the action, and the ending. Now try the lunchbox story.",
    sceneTitle: "Mia finds a blue lunchbox under the art table.",
    sceneCopy: "After watching, the child retells what happened using first, then, and finally.",
    weakAnswer: "“She found it and then Ben had lunch, I think.”",
    weakAnswerNote: "The events are mixed together, so the listener cannot follow the order.",
    media: {
      teacherVideo: "ad-assets/generated-course/day2-story-order-teacher-female-seedance.mp4",
      modelAudio: "ad-assets/generated-course/day2-model-line.wav",
      sceneVideo: "ad-assets/generated-course/day2-lunchbox-scene.mp4"
    },
    material: "Mia finds a blue lunchbox under the art table. She checks the name tag, brings it to the teacher, and the teacher returns it to Ben before lunch starts.",
    method: "First + Then + Finally",
    example: "First, Mia found the lunchbox under the art table. Then, she checked the name tag and gave it to the teacher. Finally, Ben got his lunchbox back before lunch.",
    choices: [
      ["First", "First, Leo "],
      ["Then", "First, Leo found a paper boat. Then, he "],
      ["Finally", "First, Leo found a paper boat. Then, he read the message. Finally, he "]
    ],
    rubric: ["Uses first, then, and finally.", "Puts events in the correct order.", "Keeps the retell under four sentences."]
  },
  confidence: {
    taskType: "Classroom Answer",
    taskTitle: "Turn a quiet moment into one safe, complete answer.",
    taskBody: "The AI trains a low-pressure classroom response: start with I think, add because, then point to one clue.",
    unlockTitle: "Safe Answer Lv.1",
    unlockCopy: "Give one classroom answer without freezing or stopping at one word.",
    passLabel: "Use I think, because, and one clue to pass",
    aiPrompt: "Imagine the teacher asks a question and you are not fully sure. Give a safe answer with: I think..., because..., one clue is...",
    trialPrompt: "Answer the teacher: why did the character ask a friend for help?",
    sceneQuestion: "How can you answer even if you are not 100% sure?",
    dubbingLine: "I think she asked for help because...",
    checkFocus: "opening with a safe complete answer",
    teacherIntro: "When you are not fully sure, do not freeze. Start with I think, add because, and point to one clue. Now try the classroom question.",
    sceneTitle: "Ava asks Sam for help with a science poster before the bell.",
    sceneCopy: "After watching, the child gives a safe classroom answer using one reason and one clue.",
    weakAnswer: "“Because she needed help.”",
    weakAnswerNote: "It is true, but too short. The listener still does not know what clue proves the answer.",
    media: {
      teacherVideo: "ad-assets/generated-course/day5-classroom-answer-teacher-female-seedance.mp4",
      modelAudio: "ad-assets/generated-course/day5-model-line.mp3",
      sceneVideo: "ad-assets/generated-course/day5-classroom-answer-scene-clean.mp4"
    },
    material: "In the story, Ava could not finish the science poster alone. She asked Sam for help, and they finished it before the bell. The teacher asks: why did Ava ask for help?",
    method: "I think + Because + One clue",
    example: "I think Ava asked for help because the poster was too hard to finish alone. One clue is that she finished faster after Sam joined her.",
    choices: [
      ["I think", "I think Ava asked for help because "],
      ["Because", "Ava asked for help because "],
      ["One clue", "I think Ava asked for help because the poster was hard. One clue is "]
    ],
    rubric: ["Starts with a safe phrase like I think.", "Uses because to give a reason.", "Points to one clue from the story."]
  },
  organize: {
    taskType: "Idea Structure",
    taskTitle: "Turn scattered thoughts into one answer people can follow.",
    taskBody: "The child may already have ideas, but the value is learning how to sort them before speaking. This lesson trains a repeatable answer shape for classroom discussion, interviews, and everyday explanation.",
    unlockTitle: "Idea Structure Lv.1",
    unlockCopy: "Use main point, two supports, and a closing sentence to make an answer sound prepared.",
    passLabel: "Use main point, support, and closing to pass",
    aiPrompt: "Answer like a mini speech: my main point is..., one reason is..., another reason is..., so I think...",
    trialPrompt: "The class can spend Friday afternoon on a science fair booth or a class podcast. Choose one and give a structured answer.",
    sceneQuestion: "Which project should the class choose for Friday afternoon?",
    dubbingLine: "My main point is that we should choose...",
    checkFocus: "turning scattered thoughts into an organized answer",
    teacherIntro: "Today we turn scattered ideas into a short prepared answer. Use one main point, two supports, and a closing sentence. Now try the class project choice.",
    sceneTitle: "The class must choose one Friday project: a science booth or a podcast.",
    sceneCopy: "After watching, the child makes a structured recommendation with two supports and a closing sentence.",
    weakAnswer: "“I choose the podcast because it is fun.”",
    weakAnswerNote: "It gives a choice and one feeling, but it does not sound prepared or convincing yet.",
    media: {
      teacherVideo: "ad-assets/generated-course/day6-ai-tutor-combined.mp4",
      modelAudio: "ad-assets/generated-course/day6-model-line.mp3",
      sceneVideo: "ad-assets/generated-course/day6-ai-tutor-part-b-scene-with-teacher-pip.mp4",
      singleTutorVideo: true
    },
    material: "The class has one Friday afternoon for a special project. One option is a science fair booth where students build a small experiment. The other option is a class podcast where students record short interviews. The teacher asks each student to make a clear recommendation.",
    method: "Main Point + Two Supports + Close",
    example: "My main point is that we should choose the class podcast. One reason is that everyone can have a speaking role. Another reason is that we can share it with our families. So I think the podcast helps the whole class practice communication.",
    choices: [
      ["Main point", "My main point is that we should choose "],
      ["Support", "One reason is ___. Another reason is ___."],
      ["Close", "So I think this project helps us ___."]
    ],
    rubric: ["States one main point.", "Adds two supporting ideas.", "Ends with a clear closing sentence."]
  },
  social: {
    taskType: "Social Expression",
    taskTitle: "Disagree or handle a small conflict without sounding rude.",
    taskBody: "The AI trains the child to say what they feel and what they need without blaming. The goal is a sentence a child can actually use with classmates.",
    unlockTitle: "Warm Words Lv.1",
    unlockCopy: "Use I feel and I need to handle a small social conflict.",
    passLabel: "Use I feel and I need to pass",
    aiPrompt: "A friend interrupts your idea during group work. Say one calm sentence using: I feel... when... I need...",
    trialPrompt: "Write one calm sentence for a classmate who interrupts you.",
    sceneQuestion: "What can you say when a friend interrupts your idea?",
    dubbingLine: "I feel interrupted when...",
    checkFocus: "handling small social conflicts",
    teacherIntro: "To disagree politely, use this frame: I feel, when, I need. Say the problem clearly without sounding rude. Now try the group project scene.",
    sceneTitle: "Jordan interrupts Mia during a group poster project.",
    sceneCopy: "After watching, the child practices disagreeing without sounding rude.",
    weakAnswer: "“Stop talking. I was saying it first.”",
    weakAnswerNote: "It shows frustration, but it can make the conflict bigger.",
    media: {
      teacherVideo: "ad-assets/generated-course/day4-disagree-teacher-female-seedance.mp4",
      modelAudio: "ad-assets/generated-course/day4-model-line-20260623.mp3",
      sceneVideo: "ad-assets/generated-course/day4-disagree-scene-clean.mp4"
    },
    material: "During a group poster project, Jordan starts talking over Mia before she finishes her idea. Mia wants to keep the group friendly, but she also wants one minute to finish.",
    method: "I feel + When + I need",
    example: "I feel interrupted when I am still explaining, and I need one minute to finish my idea.",
    choices: [
      ["I feel", "I feel "],
      ["When", "I feel interrupted when "],
      ["I need", "I feel interrupted when I am explaining, and I need "]
    ],
    rubric: ["Uses I feel instead of blame.", "Names the situation clearly.", "Asks for one specific next action."]
  }
};

const answerSignals = {
  join: ["join", "next round", "can i", "help", "score", "rules", "play", "friendly"],
  character: ["mia", "main character", "wanted", "included", "join", "group", "because", "mattered"],
  goal: ["want", "wanted", "goal", "try", "tried", "hope", "needed"],
  reason: ["because", "choose", "choice", "example", "reading", "game", "focus", "reason"],
  sequence: ["first", "then", "finally", "next", "last", "after"],
  confidence: ["i think", "because", "clue", "help", "ava", "friend", "poster"],
  organize: ["main point", "one reason", "another reason", "so i think", "podcast", "science"],
  social: ["i feel", "i need", "please", "when you"]
};

function createTask(key) {
  return { key, ...courseTemplates[key] };
}

personas.child.courseTasks = ["reason", "sequence", "join", "social", "confidence", "organize", "character"].map(createTask);
personas.child.steps = personas.child.courseTasks.map((task) => task.taskTitle);
personas.child.tomorrowTitle = personas.child.courseTasks[1].taskType;
personas.child.tomorrowCopy = personas.child.courseTasks[1].taskTitle;

function resetTrialState() {
  trialState.completed = false;
  trialState.firstSubmitted = false;
  trialState.firstAnswer = "";
  trialState.firstFeedback = "";
  trialState.improvedAnswer = "";
  trialState.answer = "";
  trialState.feedback = "";
  trialState.passed = false;
  trialState.taskKey = "";
  trialState.recordings.forEach((recording) => {
    if (recording.url) URL.revokeObjectURL(recording.url);
  });
  trialState.recordings = [];
}

function evaluateTrialAnswer(text, task) {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const signals = answerSignals[task.key] || [];
  const matchedSignals = signals.filter((signal) => lower.includes(signal));
  const hasEnoughLength = trimmed.length >= 18;
  const passed = hasEnoughLength && (matchedSignals.length >= 2 || task.key === "confidence");
  const missing = [];
  if (!hasEnoughLength) missing.push("answer is too short");
  if (matchedSignals.length === 0) missing.push(`does not show ${task.checkFocus}`);
  if (matchedSignals.length === 1 && task.key !== "confidence") missing.push("needs one more specific detail");

  return {
    passed,
    matchedSignals,
    feedback: passed
      ? `Trial feedback: this answer uses ${task.method}. It is enough for a first trial lesson.`
      : `Trial feedback: not enough to mark this skill as complete yet. Missing: ${missing.join(", ")}.`
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCoachingHint(task, result) {
  if (!task) return "Try again with one complete sentence.";
  if (task.key === "join") {
    return "Good first try. Now make it easier for the other kids to say yes: ask for the next round, offer one helpful role, and sound friendly. Try: Can I join the next round? I can ___, and I will ___.";
  }
  if (task.key === "reason") {
    return "Good first try. Now upgrade it into a complete answer: I choose ___ because ___. For example, ___. A strong answer does not just say what you like. It gives another person a reason to agree.";
  }
  if (task.key === "organize") {
    return "Good first try. Now make it sound prepared, not scattered: My main point is ___. One reason is ___. Another reason is ___. So I think ___.";
  }
  if (task.key === "character") {
    return "Good first try. Now make it a final challenge answer: who is it about, what did they want, what did they do, and why did it matter?";
  }
  if (task.key === "confidence") {
    return "Good first try. Now make it safer and clearer: I think ___ because ___. One clue is ___. This helps a child speak even when they are not 100% sure.";
  }
  const missingText = result.matchedSignals.length
    ? "Good start. Now make the answer easier for another person to follow."
    : `Start by showing ${task.checkFocus}.`;
  return `${missingText} Use this frame: ${task.method}. Keep it short, but include one specific detail from the scene.`;
}

function teacherScriptFor(task, segment = "intro") {
  if (!task) {
    return {
      stage: "Intro",
      line: "Hi, I am your AI speaking coach. Today we will practice one real answer."
    };
  }
  const scripts = {
    intro: {
      stage: "Intro",
      line: task.teacherIntro || "Hi, I am your speaking coach. Today, we will practice one simple skill. Listen first, then try one answer."
    },
    prompt: {
      stage: "Your Turn",
      line: `Now it is your turn. Press the microphone or type one answer. Try this frame: ${task.method}.`
    },
    coach: {
      stage: "Coach Hint",
      line: trialState.firstSubmitted
        ? trialState.feedback
        : `Before you answer, I will listen for three things: ${task.rubric.join(" ")}`
    },
    wrap: {
      stage: trialState.completed ? "Result" : "Not Done Yet",
      line: trialState.completed
        ? `Good retry. I saved your first answer and your improved answer, so the parent report can show what changed.`
        : "Finish one first try and one coached retry before opening the real report."
    }
  };
  return scripts[segment] || scripts.intro;
}

function updateLessonMedia(task) {
  const fallbackVideo = "ad-assets/AI School Coach Intro Human Video.mp4";
  const fallbackAudio = "ad-assets/model-line-reading-corner.mp3";
  const fallbackSceneVideo = "ad-assets/reading-corner-scene-narrated.mp4";
  const nextVideo = task?.media?.teacherVideo || fallbackVideo;
  const nextAudio = task?.media?.modelAudio || fallbackAudio;
  const nextTeacherAudio = task?.media?.teacherAudio || "";
  const nextSceneVideo = task?.media?.sceneVideo || fallbackSceneVideo;

  if (fields.teacherVideo && fields.teacherVideo.getAttribute("src") !== nextVideo) {
    fields.teacherVideo.pause();
    fields.teacherVideo.setAttribute("src", nextVideo);
    fields.teacherVideo.load();
    document.querySelectorAll(".video-play").forEach((button) => button.classList.remove("is-playing"));
  }

  if (modelLineAudio.src !== new URL(nextAudio, window.location.href).href) {
    modelLineAudio.pause();
    modelLineAudio.src = nextAudio;
    modelLineAudio.load();
  }

  if (nextTeacherAudio) {
    if (teacherIntroAudio.src !== new URL(nextTeacherAudio, window.location.href).href) {
      teacherIntroAudio.pause();
      teacherIntroAudio.src = nextTeacherAudio;
      teacherIntroAudio.load();
    }
  } else {
    teacherIntroAudio.pause();
    teacherIntroAudio.removeAttribute("src");
  }

  if (fields.sceneVideo && fields.sceneVideo.getAttribute("src") !== nextSceneVideo) {
    fields.sceneVideo.pause();
    fields.sceneVideo.setAttribute("src", nextSceneVideo);
    fields.sceneVideo.load();
    if (fields.scenePlay) fields.scenePlay.classList.remove("is-playing");
  }
}

function updateLessonScene(task) {
  if (!task) return;
  const sceneCard = fields.sceneVideo?.closest(".scene-video-card");
  if (sceneCard) sceneCard.style.display = task?.media?.singleTutorVideo ? "none" : "";
  if (fields.sceneCopyTitle) fields.sceneCopyTitle.textContent = task.sceneTitle || task.sceneQuestion || "Watch the scene.";
  if (fields.sceneCopyBody) fields.sceneCopyBody.textContent = task.sceneCopy || "After watching, answer one question out loud.";
  if (fields.weakAnswerText) fields.weakAnswerText.textContent = task.weakAnswer || "“I am not sure.”";
  if (fields.weakAnswerNote) fields.weakAnswerNote.textContent = task.weakAnswerNote || "It is a start, but the listener still needs more detail.";
}

function currentLessonTask() {
  return personas[currentPersona]?.courseTasks?.[activeLessonTaskIndex];
}

function hasTeacherAudio(task = currentLessonTask()) {
  return Boolean(task?.media?.teacherAudio);
}

function pauseTeacherIntroAudio() {
  teacherIntroAudio.pause();
  markTeacherPlayback(false);
}

function playTeacherIntroAudio() {
  const task = currentLessonTask();
  if (!hasTeacherAudio(task)) return Promise.resolve(false);
  teacherIntroAudio.currentTime = 0;
  return teacherIntroAudio.play().then(() => true);
}

function markTeacherPlayback(isPlaying) {
  document.querySelectorAll(".video-play").forEach((button) => button.classList.toggle("is-playing", isPlaying));
}

function setLessonFlowStep(step = "intro") {
  document.querySelectorAll("[data-flow-step]").forEach((button) => {
    const order = ["intro", "scene", "model", "speak"];
    const current = order.indexOf(step);
    const index = order.indexOf(button.dataset.flowStep);
    button.classList.toggle("active", button.dataset.flowStep === step);
    button.classList.toggle("done", current > index && index >= 0);
  });
}

function setTeacherSegment(segment = "intro", shouldSpeak = false) {
  const task = personas[currentPersona]?.courseTasks?.[activeLessonTaskIndex];
  const script = teacherScriptFor(task, segment);
  if (fields.teacherStage) fields.teacherStage.textContent = script.stage;
  if (fields.teacherLine) fields.teacherLine.textContent = script.line;
  setLessonFlowStep(segment === "intro" ? "intro" : "speak");
  if (shouldSpeak) speakLine(script.line);
}

function currentLessonSegment() {
  if (trialState.completed) return "wrap";
  if (trialState.firstSubmitted) return "coach";
  return "prompt";
}

function updateLessonAction() {
  const task = personas[currentPersona]?.courseTasks?.[activeLessonTaskIndex];
  const segment = currentLessonSegment();
  if (!fields.teacherPrimaryAction || !fields.teacherActionHint) return;
  if (segment === "prompt") {
    fields.teacherPrimaryAction.textContent = "Start First Try";
    fields.teacherActionHint.textContent = `Answer once using the scene. Target skill: ${task?.method || "one complete answer"}.`;
  } else if (segment === "coach") {
    fields.teacherPrimaryAction.textContent = "Try Again After Coach";
    fields.teacherActionHint.textContent = "Use the coach hint to improve the same answer. This creates the before/after report.";
  } else {
    fields.teacherPrimaryAction.textContent = "View Parent Report";
    fields.teacherActionHint.textContent = "The trial is complete. The report now uses the child's two real answers.";
  }
}

function describeAnswerGrowth(task) {
  if (!trialState.firstAnswer || !trialState.improvedAnswer) {
    return "No before/after evidence yet.";
  }
  if (trialState.passed) {
    if (task.key === "join") {
      return "The second answer changed from a vague request into a usable school sentence: it asks for a specific moment, offers a role, and lowers the social friction for the other kids.";
    }
    if (task.key === "reason") {
      return "The second answer moved from a short preference to a complete opinion: choice, reason, and example. That is the first skill behind confident classroom speaking.";
    }
    if (task.key === "confidence") {
      return "The second answer moved from a nervous short response to a safe classroom answer: I think, because, and one clue. This is useful because it gives the child a way to start speaking before they feel perfect.";
    }
    return `The second answer is usable because it follows ${task.method} and gives the teacher something specific to respond to.`;
  }
  return `The second answer is longer, but it still needs a clearer ${task.checkFocus}. This should be practiced before moving ahead.`;
}

function getVoiceRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return null;
  const recognition = new Recognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  return recognition;
}

function speakLine(text) {
  if (!("speechSynthesis" in window) || !text) {
    if (fields.voiceStatus) fields.voiceStatus.textContent = "Audio is not supported here. Read the line and try speaking.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.88;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
  if (fields.voiceStatus) fields.voiceStatus.textContent = "Listen to the AI classmate, then record your answer.";
}

function scoreVoiceAnswer(text, task) {
  const lower = text.toLowerCase();
  const checks = task.key === "join"
    ? [
        ["request", lower.includes("join") || lower.includes("play")],
        ["specific timing", lower.includes("next") || lower.includes("round")],
        ["helpful role", lower.includes("help") || lower.includes("score") || lower.includes("rules")]
      ]
    : [
        ["complete answer", text.trim().split(/\s+/).length >= 5],
        ["target phrase", (answerSignals[task.key] || []).some((signal) => lower.includes(signal))],
        ["clear detail", text.trim().length >= 36]
      ];
  const hits = checks.filter(([, passed]) => passed).length;
  const label = hits >= 3 ? "Strong" : hits === 2 ? "Good start" : "Needs coaching";
  return { label, checks };
}

function updateVoiceDisplay() {
  const task = personas[currentPersona]?.courseTasks?.[activeLessonTaskIndex];
  const isRecording = activeRecorder?.state === "recording";
  if (fields.recordSecond) {
    fields.recordSecond.disabled = !isRecording && (!trialState.firstSubmitted || trialState.completed);
    fields.recordSecond.textContent = isRecording && activeRecordingPhase === "second" ? "Stop recording" : "Retry with the frame";
  }
  if (fields.recordFirst) {
    fields.recordFirst.disabled = !isRecording && (trialState.firstSubmitted || trialState.completed);
    fields.recordFirst.innerHTML = isRecording && activeRecordingPhase === "first"
      ? "<span>■</span>Stop recording"
      : "<span>🎙</span>Start recording";
  }
  if (fields.voiceScore) {
    fields.voiceScore.textContent = trialState.completed
      ? "After answer saved"
      : trialState.firstSubmitted
        ? "Coach tip ready"
        : "Not started";
  }
  if (fields.voiceStatus && !trialState.firstSubmitted) {
    fields.voiceStatus.textContent = task?.key === "join"
      ? "Listen to the classmate. Then record what your child would say."
      : "Tap the microphone and answer out loud.";
  }
}

function updateAnalysisMeter(score) {
  if (!fields.analysisMeter) return;
  const values = trialState.completed
    ? [92, 88, 82, 90]
    : trialState.firstSubmitted
      ? [68, 54, 18, 62]
      : [12, 0, 0, 10];
  const task = currentLessonTask();
  const labelMap = {
    reason: ["Clear choice", "Because", "Example", "Completeness"],
    sequence: ["First", "Then", "Finally", "Order"],
    join: ["Ask", "Helpful role", "Friendly tone", "Specificity"],
    social: ["I feel", "When", "I need", "Calm tone"],
    confidence: ["Safe start", "Because", "Story clue", "Completeness"],
    organize: ["Main point", "Support 1", "Support 2", "Closing"],
    character: ["Who", "Goal", "Action", "Why it matters"]
  };
  const labels = labelMap[task?.key] || ["Clarity", "Structure", "Detail", "Completeness"];
  fields.analysisMeter.innerHTML = labels
    .map((label, index) => `<div><span>${label}</span><i style="--meter: ${values[index]}%"></i></div>`)
    .join("");
  if (fields.voiceScore && score?.label) fields.voiceScore.textContent = score.label;
}

function demoSpokenAnswer(task, phase) {
  if (!task) return "I think so, because I have one clear reason.";
  if (phase === "second") return task.example;
  const samples = {
    join: "Can I play with you?",
    character: "Mia helped the new student join the group.",
    goal: "Noah wanted to tell the teacher.",
    reason: "I choose the reading corner because it is good.",
    sequence: "First the boat floated away, then she found it.",
    confidence: "I think she asked for help because the work was hard.",
    organize: "I choose the podcast because it is fun.",
    social: "I feel upset and I need my turn."
  };
  return samples[task.key] || task.example;
}

function submitSpokenAnswer(text) {
  fields.answerInput.value = text;
  fields.answerForm.requestSubmit();
}

function saveRecordedAnswer(blob, transcript, phase) {
  const url = URL.createObjectURL(blob);
  trialState.recordings.push({
    phase,
    url,
    blob,
    transcript: transcript || "",
    createdAt: Date.now()
  });
  if (transcript) {
    fields.voiceStatus.textContent = `Recording saved. Heard: "${transcript}"`;
    submitSpokenAnswer(transcript);
    return;
  }
  fields.voiceStatus.textContent = "Recording saved. This browser did not return a transcript, so real AI scoring is pending.";
  fields.voiceScore.textContent = "Audio saved";
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("user", "Recorded audio", "Audio answer saved. Transcript and AI score need an ASR/API connection.")
  );
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("ai", "89 Teacher", "I saved the recording. To score it honestly, connect speech-to-text and AI feedback instead of using a demo answer.")
  );
  fields.chatLog.scrollTop = fields.chatLog.scrollHeight;
}

function stopRecording() {
  if (activeRecognition) {
    activeRecognition.onend = null;
    activeRecognition.stop();
    activeRecognition = null;
  }
  if (activeRecorder && activeRecorder.state !== "inactive") {
    activeRecorder.stop();
  }
}

async function captureVoiceAttempt(phase) {
  if (activeRecorder && activeRecorder.state === "recording") {
    stopRecording();
    return;
  }
  const persona = personas[currentPersona];
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    fields.voiceStatus.textContent = "Real recording is not supported in this browser. Use Chrome/Safari with microphone permission.";
    fields.voiceScore.textContent = "No recorder";
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    activeRecordingChunks = [];
    activeTranscript = "";
    activeRecordingPhase = phase;
    activeRecorder = new MediaRecorder(stream);
    activeRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) activeRecordingChunks.push(event.data);
    };
    activeRecorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(activeRecordingChunks, { type: activeRecorder.mimeType || "audio/webm" });
      activeRecorder = null;
      saveRecordedAnswer(blob, activeTranscript.trim(), activeRecordingPhase);
      updateVoiceDisplay();
    };

    const recognition = getVoiceRecognition();
    if (recognition) {
      activeRecognition = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        activeTranscript = event.results?.[0]?.[0]?.transcript || "";
        const score = scoreVoiceAnswer(activeTranscript, task);
        fields.voiceScore.textContent = score.label;
      };
      recognition.onerror = () => {
        fields.voiceStatus.textContent = "Recording continues. Speech-to-text did not return a transcript yet.";
      };
      recognition.start();
    }

    activeRecorder.start();
    fields.voiceStatus.textContent = phase === "first"
      ? "Recording your first answer. Tap again to stop."
      : "Recording your improved answer. Tap again to stop.";
    fields.voiceScore.textContent = "Recording";
    setLessonFlowStep("speak");
    const activeButton = phase === "first" ? fields.recordFirst : fields.recordSecond;
    if (activeButton) activeButton.textContent = "Stop recording";
  } catch (error) {
    fields.voiceStatus.textContent = "Microphone permission was not granted, so recording could not start.";
    fields.voiceScore.textContent = "Mic blocked";
  }
}

function renderTrialEvidenceCards(task) {
  if (!fields.trialEvidenceCards) return;
  if (!trialState.completed) {
    const baseline = trialState.firstAnswer
      ? `<article><span>Baseline answer saved</span><p>${escapeHtml(trialState.firstAnswer)}</p></article>
         <article><span>Still needed</span><p>One coached retry using ${escapeHtml(task.method)}. The report should not score the child until that retry is captured.</p></article>`
      : `<article><span>No child response yet</span><p>This page is only a questionnaire summary. A real report needs one spoken answer and one coached retry.</p></article>`;
    fields.trialEvidenceCards.innerHTML = baseline;
    return;
  }
  fields.trialEvidenceCards.innerHTML = `
    <article>
      <span>Before coaching</span>
      <p>${escapeHtml(trialState.firstAnswer)}</p>
    </article>
    <article>
      <span>After one hint</span>
      <p>${escapeHtml(trialState.improvedAnswer)}</p>
    </article>
    <article class="evidence-result">
      <span>What changed</span>
      <p>${escapeHtml(describeAnswerGrowth(task))}</p>
    </article>
  `;
}

function updateTrialDisplay() {
  if (fields.firstAttemptText) {
    fields.firstAttemptText.textContent = trialState.firstAnswer || "Submit the first answer to capture the baseline.";
  }
  if (fields.improvedAttemptText) {
    fields.improvedAttemptText.textContent = trialState.improvedAnswer || "Try again after the AI gives a hint.";
  }
  if (fields.finishLesson) {
    fields.finishLesson.textContent = trialState.completed ? "View Trial Report" : "Finish Trial First";
    fields.finishLesson.disabled = !trialState.completed;
  }
  if (fields.answerSubmit) {
    fields.answerSubmit.textContent = trialState.firstSubmitted ? "Submit Improved Answer" : "Submit First Try";
  }
  if (fields.answerInput) {
    fields.answerInput.placeholder = trialState.firstSubmitted
      ? "Second try: use the AI hint and make the answer clearer."
      : "First try: type what the child would naturally say.";
  }
  updateLessonAction();
  updateVoiceDisplay();
}

function getStageSummary() {
  const primaryMoment = quizAnswers[1];
  const explainBehavior = quizAnswers[2];
  const structureNeed = quizAnswers[3];
  const missingPiece = quizAnswers[4];
  const readingClarity = quizAnswers[6];
  const whyResponse = quizAnswers[7];
  let risk = 1;
  if (explainBehavior <= 1) risk += 1;
  if (structureNeed >= 3) risk += 1;
  if (readingClarity >= 2) risk += 1;
  if (missingPiece === 2) risk += 1;
  if (whyResponse <= 2) risk += 1;
  const level = risk >= 4 ? "Stage 2" : risk >= 3 ? "Stage 1+" : "Stage 1";
  const label = risk >= 4 ? "Needs guided structure" : risk >= 3 ? "Emerging expression" : "Ready for coached trial";
  const comments = {
    0: "The questionnaire suggests a classroom answering gap. The first trial should make speaking feel safe and structured.",
    1: "The questionnaire points to story explanation. The first trial should test whether the child can connect an answer to a clear reason.",
    2: "The questionnaire suggests the child may have ideas but needs a repeatable answer frame.",
    3: "The questionnaire points to social expression. The first trial should use one realistic peer situation."
  };
  const reasonGap = missingPiece === 2 || whyResponse <= 2 || explainBehavior <= 1;
  const comment = reasonGap
    ? "The strongest signal is a reason gap: your child may answer, but not yet explain why. Day 1 tests Choice + Because + Example."
    : comments[primaryMoment] || "The first trial should capture one real answer before making a stronger claim.";
  return {
    score: `${level}: ${label}`,
    comment
  };
}

function getQuizPlanInsight() {
  const summary = getStageSummary();
  const primaryMoment = quizAnswers[1];
  const explainBehavior = quizAnswers[2];
  const missingPiece = quizAnswers[4];
  const whyResponse = quizAnswers[7];
  const speakerGoal = quizAnswers[8];
  const momentSignal = quizSteps[1].options[primaryMoment]?.[1] || "explaining an answer";
  const explainSignal = quizSteps[2].options[explainBehavior]?.[1] || "answers briefly";
  const missingSignal = quizSteps[4].options[missingPiece]?.[1] || "a clear reason";
  const whySignal = quizSteps[7].options[whyResponse]?.[1] || "gives a short reason";
  const goalSignal = quizSteps[8].options[speakerGoal]?.[1] || "clear logical thinker";

  return {
    score: summary.score,
    momentSignal,
    explainSignal,
    missingSignal,
    whySignal,
    goalSignal,
    now: explainBehavior <= 1
      ? `Right now, your child may understand the answer but stop at "${explainSignal.toLowerCase()}."`
      : `Right now, your child can answer, but the assessment still points to "${missingSignal.toLowerCase()}."`,
    goal: `The target is a child who can become a ${goalSignal.toLowerCase()}: one clear choice, one reason, and one example.`,
    recommendation: "Recommended paid track: 7-Day Reason Builder",
    reason: summary.comment
  };
}

function uniqueTasks(keys) {
  return keys.filter((key, index) => keys.indexOf(key) === index).map(createTask);
}

function choosePrimaryCourseKey({ primaryMoment, explainBehavior, structureNeed, missingPiece, readingClarity, whyResponse, speakerGoal }) {
  const storyGapKeys = ["character", "goal", "reason", "sequence"];

  if (missingPiece === 2 || whyResponse <= 2 || explainBehavior === 1) return "reason";
  if (primaryMoment === 3 || speakerGoal === 2) return "social";
  if (primaryMoment === 2 || speakerGoal === 3 || structureNeed >= 3) return "organize";
  if (primaryMoment === 1) return storyGapKeys[missingPiece] || (readingClarity >= 2 ? "character" : "reason");
  if (primaryMoment === 0) {
    if (explainBehavior === 0) return "confidence";
    return whyResponse <= 2 ? "reason" : "confidence";
  }

  if (readingClarity >= 2) return "character";
  return storyGapKeys[missingPiece] || "reason";
}

function buildCourseFromQuizAnswers() {
  const primaryMoment = quizAnswers[1];
  const explainBehavior = quizAnswers[2];
  const structureNeed = quizAnswers[3];
  const missingPiece = quizAnswers[4];
  const readingClarity = quizAnswers[6];
  const whyResponse = quizAnswers[7];
  const speakerGoal = quizAnswers[8];
  const blocker = quizAnswers[9];
  const parentRole = quizAnswers[10];
  const dailyTime = quizAnswers[11];

  const storyGapKeys = ["character", "goal", "reason", "sequence"];
  const recommended = choosePrimaryCourseKey({
    primaryMoment,
    explainBehavior,
    structureNeed,
    missingPiece,
    readingClarity,
    whyResponse,
    speakerGoal
  });
  const primary = "reason";

  const support = [];
  support.push(
    primaryMoment === 0 ? "confidence" :
    primaryMoment === 2 ? "organize" :
    primaryMoment === 3 ? "social" :
    storyGapKeys[missingPiece] || "reason"
  );
  if (missingPiece === 2 || whyResponse <= 2 || explainBehavior <= 1) support.push("reason");
  if (readingClarity >= 2) support.push("character");
  if (explainBehavior === 0) support.push("confidence");
  if (speakerGoal === 3 || structureNeed >= 3) support.push("organize");
  if (speakerGoal === 2) support.push("social");
  if (blocker === 1) support.push("sequence");

  const tasks = uniqueTasks([primary, "sequence", "join", "social", recommended, ...support, "confidence", "organize", "character", "goal"]).slice(0, 7);
  const firstTask = tasks[0];
  const timeLabels = ["5 min", "10 min", "15 min", "20 min"];
  const parentModes = ["Daily report only", "One parent prompt per day", "Parent-child mini task", "Progress dashboard"];
  const time = timeLabels[dailyTime] || "10 min";
  const parentMode = parentModes[parentRole] || "Daily report only";
  const momentSignal = quizSteps[1].options[primaryMoment]?.[1] || "Explaining an answer";
  const explainSignal = quizSteps[2].options[explainBehavior]?.[1] || "Answers briefly";
  const missingSignal = quizSteps[4].options[missingPiece]?.[1] || "A clear reason or because";
  const whySignal = quizSteps[7].options[whyResponse]?.[1] || "They give a short reason";
  const recommendationReason = `Parent signals: "${momentSignal}", "${explainSignal}", missing piece: "${missingSignal}", why response: "${whySignal}".`;
  const courseRationale = `For this first trial, we start with Reason Builder because giving a clear reason is the shared foundation behind classroom answers, story retells, and social speaking.`;

  personas.child = {
    ...personas.child,
    duration: time,
    time,
    stage: `Personal ${firstTask.taskType} Course`,
    goal: `Start with ${firstTask.checkFocus}, then unlock the next expression skill.`,
    taskType: firstTask.taskType,
    taskTitle: firstTask.taskTitle,
    taskBody: firstTask.taskBody,
    teacherTitle: `The quiz recommends ${firstTask.taskType}: ${firstTask.checkFocus}.`,
    unlockTitle: firstTask.unlockTitle,
    unlockCopy: firstTask.unlockCopy,
	    tomorrowTitle: tasks[1]?.taskType || "Story Sequence",
	    tomorrowCopy: tasks[1]?.taskTitle || "Use first, then, and finally to retell the story clearly.",
    progress: `${recommendationReason} ${courseRationale} This is only a pre-trial recommendation until the child records an answer.`,
    next: `Tomorrow's lesson will train ${tasks[1]?.checkFocus || "story sequence"}.`,
    reportQuizSignal: `${recommendationReason} ${courseRationale}`,
    reportEvidence: `The first trial will check one method: "${firstTask.method}". Pass standard: ${firstTask.rubric.join(" / ")}.`,
    passLabel: firstTask.passLabel,
    skills: [
      ["Story Understanding", firstTask.key === "character" ? 54 : 70, "#244d3d"],
      ["Oral Expression", firstTask.key === "confidence" ? 46 : 58, "#315f8a"],
      ["Idea Structure", firstTask.key === "organize" ? 44 : 62, "#9a6b18"],
      [firstTask.unlockTitle.replace(" Lv.1", ""), 42, "#a8484d"]
    ],
    diagnosis: [
      ["Quiz Signal", recommendationReason],
      ["Current Gap", `The first course is ${firstTask.taskType} because it trains ${firstTask.checkFocus}, not a generic speaking lesson.`],
      ["Assigned Plan", `${tasks.length} micro-tasks, ${time} per day, ${parentMode.toLowerCase()}.`]
    ],
    courseTasks: tasks,
    steps: tasks.map((task) => task.taskTitle),
	    chat: [
	      ["ai", `Your questionnaire suggests we should test ${firstTask.checkFocus} first.`],
	      ["ai", firstTask.aiPrompt]
    ],
    archive: [
      `Quiz result: ${firstTask.taskType}`,
      `Current gap: ${firstTask.checkFocus}`,
      `Home support: ${parentMode}`
    ]
	  };
	  activeLessonTaskIndex = 0;
	  resetTrialState();
	}

function getStageIndex(age) {
  return stages.findIndex((stage) => age <= stage.max);
}

function renderStages(age) {
  const activeIndex = getStageIndex(age);
  stageRail.innerHTML = stages
    .map(
      (stage, index) => `
        <article class="stage-card ${index === activeIndex ? "active" : ""}">
          <span>${stage.range}</span>
          <strong>${stage.title}</strong>
          <p>${stage.copy}</p>
        </article>
      `
    )
    .join("");
}

function renderSkills(skills) {
  fields.skillList.innerHTML = skills
    .map(
      ([name, level, color]) => `
        <div class="skill-row">
          <header>
            <span>${name}</span>
            <span>${level}%</span>
          </header>
          <div class="bar" style="--skill-color: ${color}">
            <span style="--level: ${level}%"></span>
          </div>
        </div>
      `
    )
    .join("");
}

function setRing(percent) {
  if (!fields.ringValue || !fields.ringPercent) return;
  const circumference = 301.6;
  const offset = circumference - (percent / 100) * circumference;
  fields.ringValue.style.setProperty("--offset", offset);
  fields.ringPercent.textContent = `${percent}%`;
}

function renderDiagnosis(persona) {
  fields.diagnosisFlow.innerHTML = persona.diagnosis
    .map(
      ([title, copy], index) => `
        <div class="flow-step">
          <span>${index + 1}</span>
          <div>
            <strong>${title}</strong>
            <p>${copy}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function renderLessonSteps(persona) {
  const steps = persona.courseTasks || persona.steps.map((step, index) => ({
    key: `step-${index}`,
    taskTitle: step
  }));
  fields.lessonSteps.innerHTML = steps
    .map(
      (step, index) => {
        const isLocked = index >= freeTrialLessonLimit;
        return `
        <button class="lesson-step ${index === activeLessonTaskIndex ? "active" : ""} ${index < activeLessonTaskIndex ? "done" : ""} ${isLocked ? "locked" : ""}" type="button" data-lesson-task="${index}" ${isLocked ? `aria-label="Day ${index + 1} locked. Reserve early access to unlock."` : ""}>
          <span>${index + 1}</span>
          <p><strong>${step.taskType || `Task ${index + 1}`}</strong>${step.taskTitle}${isLocked ? "<small>Locked</small>" : ""}</p>
        </button>
      `;
      }
    )
    .join("");
}

function renderCourseMap(persona) {
  if (!fields.courseMapPath) return;
  const tasks = persona.courseTasks || ["reason", "sequence", "join", "social", "confidence", "organize", "character"].map(createTask);
  const dayLabels = ["Today", "Locked", "Locked", "Locked", "Locked", "Locked", "Locked"];
  fields.courseMapPath.innerHTML = tasks
    .slice(0, 7)
    .map((task, index) => {
      const isActive = index === activeLessonTaskIndex;
      const title = index === 0 ? "Give a reason" :
        index === 1 ? "Tell it in order" :
        index === 2 ? "Join a group" :
        index === 3 ? "Disagree politely" :
        task.taskType;
      const classes = [
        index < freeTrialLessonLimit ? "done" : "locked",
        isActive ? "active" : ""
      ].filter(Boolean).join(" ");
      return `
        <button type="button" class="${classes}" data-course-day="${index}" aria-label="${index >= freeTrialLessonLimit ? "Locked" : "Open"} Day ${index + 1}: ${escapeHtml(task.taskTitle)}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(title)}<em>${escapeHtml(task.taskTitle)}</em></strong>
          <small>${isActive ? "Open" : dayLabels[index] || "Preview"}</small>
        </button>
      `;
    })
    .join("");
}

function renderChat(persona) {
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const chat = task
    ? [
        ["ai", "Hi. I will ask one question. Answer out loud."],
        ["ai", task.sceneQuestion]
      ]
    : persona.chat;
  fields.chatLog.innerHTML = chat
    .map(([role, text]) => messageTemplate(role, role === "ai" ? "89 Teacher" : persona.learnerLabel, text))
    .join("");
}

function applyLessonTask(persona) {
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  if (!task) return;
  fields.taskType.textContent = task.taskType;
  fields.taskTitle.textContent = task.taskTitle;
  fields.taskBody.textContent = task.taskBody;
  fields.practiceStory.textContent = task.material;
  fields.practiceMethod.textContent = task.method;
  fields.practiceExample.textContent = task.example;
  fields.sceneQuestion.textContent = task.sceneQuestion;
  fields.dubbingLine.textContent = task.dubbingLine;
  if (fields.aiLine) fields.aiLine.textContent = task.aiLine || task.dubbingLine || "Listen, then say your answer.";
  fields.trialPrompt.textContent = task.trialPrompt;
  fields.interactionOptions.innerHTML = (task.choices || [])
    .map(
      ([label, value]) => `
        <button type="button" data-choice-starter="${value}">
          <span>${label}</span>
        </button>
      `
    )
    .join("");
  fields.rubricList.innerHTML = task.rubric.map((item) => `<li>${item}</li>`).join("");
  fields.unlockTitle.textContent = task.unlockTitle;
  fields.unlockCopy.textContent = task.unlockCopy;
  fields.passLabel.textContent = task.passLabel;
  fields.lessonHeroTitle.textContent = `Day ${activeLessonTaskIndex + 1} Course: ${task.taskType}`;
  fields.lessonIntro.textContent = `This trial tests one observable skill: ${task.checkFocus}. The child answers once, gets one coaching hint, then retries.`;
  updateLessonMedia(task);
  updateLessonScene(task);
  setTeacherSegment(trialState.firstSubmitted || trialState.completed ? currentLessonSegment() : "intro");
  updateTrialDisplay();
  updateVoiceDisplay();
  updateReportForTask(persona, task);
}

function updateReportForTask(persona, task = persona.courseTasks?.[activeLessonTaskIndex]) {
  if (!task) return;
  const nextTask = persona.courseTasks?.[activeLessonTaskIndex + 1] || persona.courseTasks?.[0];
  const summary = getStageSummary();
  const currentDay = activeLessonTaskIndex + 1;
  renderTrialEvidenceCards(task);
  if (!trialState.completed) {
    fields.reportHeroTitle.textContent = `Day ${currentDay} speaking trial is ready.`;
    fields.reportStatus.textContent = trialState.firstSubmitted
      ? `${summary.score}. Baseline answer saved. Coached retry not completed yet.`
      : `${summary.score}. Based on parent answers only.`;
    fields.reportQuizSignal.textContent = trialState.firstSubmitted
      ? `Baseline captured for Day ${currentDay}: ${task.taskType}. The retry should use ${task.method}.`
      : `Selected lesson: Day ${currentDay} ${task.taskType}. This trial checks whether the child can use ${task.method} in a real speaking scene.`;
    fields.scoreText.textContent = trialState.firstSubmitted ? "Baseline" : "Pre-trial";
    fields.progressText.textContent = trialState.firstSubmitted
      ? "One real answer is saved. The next step is to see whether the child can improve after one coach example."
      : `Recommended trial: "${task.taskTitle}"`;
    fields.reportEvidence.textContent = trialState.firstSubmitted
      ? `Teacher note: the first answer gives us a baseline. Ask the child to retry with ${task.method}; then the report can show the before/after change.`
      : `What we can infer: this selected trial will test ${task.checkFocus}. No child response has been submitted yet, so the report will not score the child until one first try and one coached retry are completed.`;
    fields.nextText.textContent = trialState.firstSubmitted
      ? "Return to the trial lesson and complete the improved answer."
      : `Start Day ${currentDay} to test ${task.method} with one real spoken response.`;
    fields.reportIntro.textContent = "This is a parent-facing pre-trial summary for the selected lesson. A real report appears after the child completes one first answer and one coached retry.";
    fields.reportUnlock.textContent = "Paid plan recommended";
    fields.reportUnlockCopy.textContent = "Unlock coached trials, daily practice scenes, and parent reports with the 7-day plan.";
    fields.tomorrowTitle.textContent = `Day ${currentDay}: ${task.taskType}`;
    fields.tomorrowCopy.textContent = task.taskTitle;
    fields.reportCta.textContent = "Reserve Early Access";
    fields.reportCta.removeAttribute("data-go");
    fields.reportCta.dataset.paymentTrigger = "report";
    return;
  }
  fields.reportHeroTitle.textContent = "Trial result: one small speaking habit can be trained.";
  fields.reportStatus.textContent = `${summary.score}. Questionnaire signal plus one completed trial.`;
  fields.reportQuizSignal.textContent = `Completed trial: Day ${currentDay} ${task.taskType}. The report is based on the child's first answer, coached retry, and the ${task.method} frame.`;
  fields.scoreText.textContent = trialState.passed ? "Ready" : "Practice";
  fields.progressText.textContent = "This report uses the child's first answer and improved answer from this session only.";
  fields.reportEvidence.textContent = `Teacher note: ${describeAnswerGrowth(task)}`;
  fields.nextText.textContent = nextTask && nextTask !== task
    ? `Next lesson trains ${nextTask.taskType}: ${nextTask.taskTitle}`
    : `Next lesson repeats ${task.taskType} with a harder scene.`;
  fields.reportIntro.textContent = "This is the proof point for the parent: the child did not just watch a lesson, they produced an answer, received a frame, and tried again.";
  fields.reportUnlock.textContent = trialState.passed ? "7-Day Plan Recommended" : `Repeat Day ${currentDay} Recommended`;
  fields.reportUnlockCopy.textContent = trialState.passed
    ? `${task.unlockCopy} The next paid step should unlock daily coached scenes, AI feedback, and parent summaries.`
    : "The child needs another guided attempt before a harder lesson. The paid plan should repeat this skill with easier examples first.";
  fields.reportCta.textContent = "Reserve Early Access";
  fields.reportCta.removeAttribute("data-go");
  fields.reportCta.dataset.paymentTrigger = "report";
  fields.tomorrowTitle.textContent = nextTask?.taskType || persona.tomorrowTitle;
  fields.tomorrowCopy.textContent = nextTask?.taskTitle || persona.tomorrowCopy;
}

function selectLessonTask(index) {
  const persona = personas[currentPersona];
  if (!persona.courseTasks || !persona.courseTasks[index]) return;
  if (index >= freeTrialLessonLimit) {
    openPaymentReservation("locked_day");
    return;
  }
  activeLessonTaskIndex = index;
  resetTrialState();
  applyLessonTask(persona);
  renderLessonSteps(persona);
  renderCourseMap(persona);
  renderChat(persona);
  fields.answerInput.value = "";
  updateTrialDisplay();
}

function renderArchive(persona) {
  fields.archiveList.innerHTML = persona.archive
    .map(
      (item) => `
        <div class="archive-item">
          <span></span>
          <p>${item}</p>
        </div>
      `
    )
    .join("");
}

function renderOps(persona) {
  const ops = persona.ops;
  opsFields.mobileStage.textContent = persona.stage;
  opsFields.mobileStreak.textContent = `${ops.streak}🔥`;
  opsFields.mobileXp.textContent = `${ops.xp} XP`;
  opsFields.homeStreak.textContent = `${ops.streak}-day streak`;
  opsFields.homeXp.textContent = `${ops.xp} XP`;
  opsFields.homeGems.textContent = `${ops.gems} Gems`;
  opsFields.lessonReward.textContent = trialState.completed
    ? "Trial report ready"
    : trialState.firstSubmitted
      ? "Step 2: improve the answer"
      : "Step 1: capture first try";
  if (opsFields.opsLeague) opsFields.opsLeague.textContent = trialState.completed ? "Trial done" : "Not started";
  if (opsFields.opsRank) opsFields.opsRank.textContent = "Choose plan";
  if (opsFields.opsPrompt) {
    opsFields.opsPrompt.textContent = trialState.completed
      ? "The next recommendation is based on the submitted answer and questionnaire."
      : "Unlock the next interactive lesson after choosing a 7-day plan.";
  }
  const tasks = persona.courseTasks || [];
  if (opsFields.questList) {
    opsFields.questList.innerHTML = tasks.slice(0, 3)
      .map(
        (task, index) => `
          <div class="quest-item">
            <div>
              <strong>${index === 0 ? "Current check" : `Next check ${index}`}: ${task.taskType}</strong>
              <span>${index === 0 && trialState.completed ? "done" : "pending"}</span>
            </div>
            <p>${task.taskTitle}</p>
          </div>
        `
      )
      .join("");
  }
}

function renderQuiz() {
  if (!quizNodes.question) return;
  const step = quizSteps[quizIndex];
  const selected = quizAnswers[quizIndex];
  const isContinueDisabled = step.type !== "insight" && selected === null;
  const continueText = quizIndex === quizSteps.length - 1 ? "View Recommended Plan" : "Continue";
  quizNodes.stepText.textContent = `${quizIndex + 1} / ${quizSteps.length}`;
  quizNodes.progress.style.width = `${((quizIndex + 1) / quizSteps.length) * 100}%`;
  quizNodes.category.textContent = step.category;
  quizNodes.question.textContent = step.question;
  quizNodes.hint.textContent = step.hint;
  quizNodes.back.disabled = quizIndex === 0;
  [quizNodes.continue].forEach((button) => {
    if (!button) return;
    button.disabled = isContinueDisabled;
    button.textContent = continueText;
  });
  quizNodes.footerText.textContent =
    quizIndex === quizSteps.length - 1
      ? "Continue to the paid plan recommendation."
      : `Answer ${quizSteps.length} quick questions to unlock the course plan.`;
	  if (step.type === "insight") {
      const insight = getQuizPlanInsight();
	    quizNodes.options.innerHTML = `
	      <div class="questionnaire-insight result-summary" aria-label="Personalized questionnaire result">
	        <article class="result-hero-card">
	          <span>Personalized result</span>
	          <strong>${insight.score}</strong>
	          <p>${insight.reason}</p>
	        </article>
	        <div class="before-after-result">
	          <article>
	            <span>Now</span>
	            <strong>${insight.now}</strong>
	          </article>
	          <article>
	            <span>Goal</span>
	            <strong>${insight.goal}</strong>
	          </article>
	        </div>
	        <article class="course-recommendation-card">
	          <span>Course recommendation</span>
	          <strong>${insight.recommendation}</strong>
	          <p>Why this track: parent selected "${insight.momentSignal}", the missing piece was "${insight.missingSignal}", and the first paid lesson tests whether one coach example can improve the answer.</p>
	        </article>
	      </div>
	    `;
	    return;
	  }
  quizNodes.options.innerHTML = step.options
    .map(
      ([icon, label], index) => `
        <button class="quiz-option ${selected === index ? "selected" : ""}" type="button" data-quiz-option="${index}">
          <span>${icon}</span>
          <strong>${label}</strong>
          <i></i>
        </button>
      `
    )
    .join("");
}

function messageTemplate(role, label, text) {
  return `
    <div class="message ${role}">
      <span>${label}</span>
      <p>${text}</p>
    </div>
  `;
}

function setPersona(key) {
  currentPersona = key;
  activeLessonTaskIndex = 0;
  const persona = personas[key];
  personaButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.persona === key);
  });

  ageRange.value = persona.age;
  ageOutput.textContent = `${persona.age}`;
  renderStages(persona.age);

  fields.personaName.textContent = `${persona.name}'s Assessment Result`;
  fields.personaStage.textContent = persona.stage;
  fields.goalText.textContent = persona.goal;
  fields.timeText.textContent = persona.time;
  fields.lessonDuration.textContent = persona.duration;
  fields.taskType.textContent = persona.taskType;
  fields.taskTitle.textContent = persona.taskTitle;
  fields.taskBody.textContent = persona.taskBody;
  fields.scoreText.textContent = persona.score;
  fields.reportQuizSignal.textContent = persona.reportQuizSignal || `Quiz signal: ${persona.teacherTitle}`;
  fields.reportEvidence.textContent = persona.reportEvidence || `AI checked today's answer against the course pass standard.`;
  fields.progressText.textContent = persona.progress;
  fields.nextText.textContent = persona.next;
  fields.coachMode.textContent = persona.age < 13 ? "Parent visible" : "Guided";
  fields.homeHeroTitle.textContent = persona.hero;
  fields.challengeBadge.textContent = persona.age === 7 ? "Cold Start MVP" : `🔥 ${persona.ops.streak}-day streak`;
  fields.challengeTitle.textContent = persona.challengeTitle;
  fields.challengeCopy.textContent = persona.challengeCopy;
  fields.challengeReward.textContent = persona.age === 7 ? "Assessment → Course → Report" : persona.ops.reward;
  fields.teacherTitle.textContent = persona.teacherTitle;
  fields.profileIntro.textContent = `The assessment found ${persona.name}'s smallest current gap and assigned one focused course task.`;
  fields.lessonHeroTitle.textContent = `Day 1 Course: ${persona.taskType}`;
  fields.lessonIntro.textContent = persona.challengeCopy;
  fields.heartStatus.textContent = persona.ops.heartsIcon;
  fields.hintStatus.textContent = `${persona.ops.hints} hints left`;
  fields.unlockTitle.textContent = persona.unlockTitle;
  fields.unlockCopy.textContent = persona.unlockCopy;
  fields.passLabel.textContent = persona.passLabel || (persona.age < 13 ? "Add one reason sentence to pass" : "Add one piece of evidence to pass");
  fields.reportHeroTitle.textContent = `${persona.name} completed Day 1.`;
  fields.reportIntro.textContent = `Skill unlocked: ${persona.unlockTitle}. Tomorrow will continue with the next lesson.`;
  fields.reportUnlock.textContent = persona.unlockTitle;
  fields.reportUnlockCopy.textContent = persona.unlockCopy;
  fields.tomorrowTitle.textContent = persona.tomorrowTitle;
  fields.tomorrowCopy.textContent = persona.tomorrowCopy;

  renderSkills(persona.skills);
  renderDiagnosis(persona);
  renderLessonSteps(persona);
  renderCourseMap(persona);
  renderChat(persona);
  applyLessonTask(persona);
  renderArchive(persona);
  renderOps(persona);
  setRing(persona.percent);
}

function setRoute(route) {
  const safeRoute = ["landing", "loading", "plan", "lesson", "report"].includes(route) ? route : "landing";
  const funnelRoutes = ["landing", "loading", "plan", "lesson", "report"];
  if (safeRoute === "landing") {
    quizIndex = 0;
    quizAnswers.fill(null);
    renderQuiz();
  }
  if (safeRoute === "lesson" && route !== "report") {
    resetTrialState();
    renderChat(personas[currentPersona]);
    applyLessonTask(personas[currentPersona]);
    updateAnalysisMeter();
  }
  pageNodes.forEach((page) => page.classList.toggle("active", page.dataset.page === safeRoute));
  routeLinks.forEach((link) => link.classList.toggle("active", link.dataset.route === safeRoute));
  document.body.classList.toggle("landing-mode", funnelRoutes.includes(safeRoute));

  if (window.location.hash !== `#${safeRoute}`) {
    history.pushState(null, "", `#${safeRoute}`);
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

function aiReplyFor(text, persona) {
  const trimmed = text.trim();
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const taskTitle = task?.taskType || persona.taskType;
  const focus = task?.checkFocus || "the missing detail";
  const signals = answerSignals[task?.key] || [];
  const lower = trimmed.toLowerCase();
  const matchedSignals = signals.filter((signal) => lower.includes(signal));

  if (!trimmed) {
    return `Start with the method: ${task?.method || "one clear sentence"}. Use the practice material above, then I will check it against the pass standard.`;
  }

  if (lower.includes("hint") || lower.includes("try again")) {
    return `Hint for ${taskTitle}: use this frame: ${task?.method || "one clear sentence"}. You can copy the structure, but change the words to fit the story.`;
  }

  if (lower.includes("check")) {
    return `Send the child's actual answer and I will check it against three standards: ${task?.rubric.join(" / ") || focus}.`;
  }

  const result = evaluateTrialAnswer(trimmed, task);
  if (!result.passed) return result.feedback;
  return `${result.feedback} Next time, we can make it faster and more natural.`;
}

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute(link.dataset.route);
  });
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => setRoute(button.dataset.go));
});

if (fields.reportCta) {
  fields.reportCta.addEventListener("click", () => {
    if (fields.reportCta.dataset.go) setRoute(fields.reportCta.dataset.go);
  });
}

document.querySelectorAll(".price-option").forEach((card) => {
  card.addEventListener("click", () => syncSelectedPaymentPlan(card));
});

document.querySelectorAll("[data-payment-trigger]").forEach((button) => {
  button.addEventListener("click", () => openPaymentReservation(button.dataset.paymentTrigger));
});

if (paymentDialogClose) {
  paymentDialogClose.addEventListener("click", closePaymentDialog);
}

if (paymentDialog) {
  paymentDialog.addEventListener("click", (event) => {
    if (event.target === paymentDialog) closePaymentDialog();
  });
}

if (paymentForm) {
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = paymentEmail?.value.trim();
    if (!email) return;
    savePaymentReservation(email, paymentNote?.value.trim() || "");
    if (paymentStatus) {
      paymentStatus.textContent = "Reserved. We will send access when checkout opens.";
    }
    const submitButton = paymentForm.querySelector("button[type='submit']");
    if (submitButton) submitButton.textContent = "Reservation Saved";
    window.setTimeout(() => {
      closePaymentDialog();
      paymentForm.reset();
      if (submitButton) submitButton.textContent = "Reserve Early Access";
      if (pendingPaymentSource === "plan") {
        setRoute("lesson");
      }
    }, 1200);
  });
}

if (quizNodes.options) {
  quizNodes.options.addEventListener("click", (event) => {
    const option = event.target.closest("[data-quiz-option]");
    if (!option) return;
    quizAnswers[quizIndex] = Number(option.dataset.quizOption);
    renderQuiz();
  });
}

let quizAdvanceLocked = false;

function continueQuiz() {
  if (quizAdvanceLocked) return;
  if (quizSteps[quizIndex].type !== "insight" && quizAnswers[quizIndex] === null) return;
  quizAdvanceLocked = true;
  if (quizIndex < quizSteps.length - 1) {
    quizIndex += 1;
    renderQuiz();
    window.setTimeout(() => {
      quizAdvanceLocked = false;
    }, 180);
    return;
  }
  buildCourseFromQuizAnswers();
  setPersona("child");
  setRoute("plan");
  window.setTimeout(() => {
    quizAdvanceLocked = false;
  }, 180);
}

[quizNodes.continue].forEach((button) => {
  if (!button) return;
  button.addEventListener("click", continueQuiz);
  button.addEventListener("pointerup", (event) => {
    event.preventDefault();
    continueQuiz();
  });
});

if (quizNodes.back) {
  quizNodes.back.addEventListener("click", () => {
    if (quizIndex === 0) return;
    quizIndex -= 1;
    renderQuiz();
  });
}

personaButtons.forEach((button) => {
  button.addEventListener("click", () => setPersona(button.dataset.persona));
});

ageRange.addEventListener("input", (event) => {
  const age = Number(event.target.value);
  ageOutput.textContent = `${age}`;
  renderStages(age);
});

document.querySelectorAll("[data-hint]").forEach((button) => {
  button.addEventListener("click", () => {
    const persona = personas[currentPersona];
    fields.chatLog.insertAdjacentHTML(
      "beforeend",
      messageTemplate("user", persona.learnerLabel, button.dataset.hint)
    );
    fields.chatLog.insertAdjacentHTML(
      "beforeend",
      messageTemplate("ai", "89 Teacher", aiReplyFor(button.dataset.hint, persona))
    );
    fields.chatLog.scrollTop = fields.chatLog.scrollHeight;
  });
});

if (fields.playAiLine) {
  fields.playAiLine.addEventListener("click", () => {
    setLessonFlowStep("model");
    modelLineAudio.currentTime = 0;
    modelLineAudio.play().catch(() => {
      const task = personas[currentPersona].courseTasks?.[activeLessonTaskIndex];
      speakLine(task?.aiLine || fields.aiLine?.textContent || "");
    });
    if (fields.voiceStatus) fields.voiceStatus.textContent = "Playing the real model-line audio. Then record your answer.";
  });
}

if (fields.recordFirst) {
  fields.recordFirst.addEventListener("click", () => captureVoiceAttempt("first"));
}

if (fields.recordSecond) {
  fields.recordSecond.addEventListener("click", () => captureVoiceAttempt("second"));
}

document.querySelectorAll("[data-teacher-segment]").forEach((button) => {
  button.addEventListener("click", () => {
    const isVideoPlay = button.classList.contains("video-play");
    setTeacherSegment(button.dataset.teacherSegment, !isVideoPlay);
    if (isVideoPlay && fields.teacherVideo) {
      const task = currentLessonTask();
      const useSeparateTeacherAudio = hasTeacherAudio(task);
      button.classList.add("is-playing");
      fields.teacherVideo.muted = useSeparateTeacherAudio;
      if (fields.teacherVideo.ended) fields.teacherVideo.currentTime = 0;
      if (useSeparateTeacherAudio) {
        fields.teacherVideo.pause();
        fields.teacherVideo.currentTime = 0;
        teacherIntroAudio.pause();
        teacherIntroAudio.currentTime = 0;
        markTeacherPlayback(true);
        playTeacherIntroAudio().catch(() => {
          markTeacherPlayback(false);
          speakLine(fields.teacherLine?.textContent || "");
        });
        return;
      }
      fields.teacherVideo.play().then(() => {
        button.classList.add("is-playing");
      }).catch(() => {
        button.classList.remove("is-playing");
        speakLine(fields.teacherLine?.textContent || "");
      });
      return;
    }
    if (button.dataset.teacherSegment === "prompt" && fields.answerInput) {
      fields.answerInput.focus();
    }
  });
});

if (fields.teacherVideo) {
  fields.teacherVideo.addEventListener("click", () => {
    const task = currentLessonTask();
    const useSeparateTeacherAudio = hasTeacherAudio(task);
    fields.teacherVideo.muted = useSeparateTeacherAudio;
    if (useSeparateTeacherAudio) {
      if (!teacherIntroAudio.paused) {
        pauseTeacherIntroAudio();
        markTeacherPlayback(false);
      } else {
        fields.teacherVideo.pause();
        fields.teacherVideo.currentTime = 0;
        markTeacherPlayback(true);
        playTeacherIntroAudio().catch(() => markTeacherPlayback(false));
      }
      return;
    }
    if (fields.teacherVideo.paused) {
      fields.teacherVideo.play().catch(() => {});
    } else {
      fields.teacherVideo.pause();
      pauseTeacherIntroAudio();
    }
  });
  fields.teacherVideo.addEventListener("play", () => {
    document.querySelectorAll(".video-play").forEach((button) => button.classList.add("is-playing"));
  });
  fields.teacherVideo.addEventListener("pause", () => {
    pauseTeacherIntroAudio();
    document.querySelectorAll(".video-play").forEach((button) => button.classList.remove("is-playing"));
  });
  fields.teacherVideo.addEventListener("ended", () => {
    pauseTeacherIntroAudio();
    document.querySelectorAll(".video-play").forEach((button) => button.classList.remove("is-playing"));
  });
}

teacherIntroAudio.addEventListener("ended", () => {
  markTeacherPlayback(false);
});

if (fields.sceneVideo && fields.scenePlay) {
  fields.scenePlay.addEventListener("click", () => {
    setLessonFlowStep("scene");
    fields.scenePlay.classList.add("is-playing");
    if (fields.sceneVideo.ended) fields.sceneVideo.currentTime = 0;
    fields.sceneVideo.play().catch(() => {
      fields.scenePlay.classList.remove("is-playing");
    });
  });
  fields.sceneVideo.addEventListener("click", () => {
    if (fields.sceneVideo.paused) {
      setLessonFlowStep("scene");
      fields.sceneVideo.play().catch(() => {});
    } else {
      fields.sceneVideo.pause();
    }
  });
  fields.sceneVideo.addEventListener("play", () => {
    setLessonFlowStep("scene");
    fields.scenePlay.classList.add("is-playing");
  });
  fields.sceneVideo.addEventListener("pause", () => {
    fields.scenePlay.classList.remove("is-playing");
  });
  fields.sceneVideo.addEventListener("ended", () => {
    fields.scenePlay.classList.remove("is-playing");
  });
}

if (fields.teacherPrimaryAction) {
  fields.teacherPrimaryAction.addEventListener("click", () => {
    const segment = currentLessonSegment();
    setTeacherSegment(segment, true);
    if (segment === "wrap") {
      setRoute("report");
      return;
    }
    if (fields.answerInput) fields.answerInput.focus();
  });
}

document.querySelectorAll("[data-starter]").forEach((button) => {
  button.addEventListener("click", () => {
    fields.answerInput.value = button.dataset.starter;
    fields.answerInput.focus();
  });
});

if (fields.interactionOptions) {
  fields.interactionOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-choice-starter]");
    if (!option) return;
    fields.answerInput.value = option.dataset.choiceStarter;
    fields.answerInput.focus();
  });
}

if (fields.lessonSteps) {
  fields.lessonSteps.addEventListener("click", (event) => {
    const task = event.target.closest("[data-lesson-task]");
    if (!task) return;
    selectLessonTask(Number(task.dataset.lessonTask));
  });
}

if (fields.courseMapPath) {
  fields.courseMapPath.addEventListener("click", (event) => {
    const day = event.target.closest("[data-course-day]");
    if (!day) return;
    const index = Number(day.dataset.courseDay);
    const task = personas[currentPersona].courseTasks?.[index];
    if (!task) return;
    selectLessonTask(index);
  });
}

fields.answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const persona = personas[currentPersona];
  const task = persona.courseTasks?.[activeLessonTaskIndex];
  const answer = fields.answerInput.value.trim();
  const result = task ? evaluateTrialAnswer(answer, task) : { passed: false, feedback: "No active trial task." };
  const voiceScore = task ? scoreVoiceAnswer(answer, task) : { label: "Needs coaching" };
  if (!trialState.firstSubmitted) {
    trialState.firstSubmitted = Boolean(answer);
    trialState.firstAnswer = answer;
    trialState.firstFeedback = result.feedback;
    trialState.feedback = `First try saved. ${buildCoachingHint(task, result)}`;
    trialState.passed = false;
    trialState.completed = false;
    trialState.taskKey = task?.key || "";
  } else {
    trialState.improvedAnswer = answer;
    trialState.answer = answer;
    trialState.feedback = result.feedback;
    trialState.passed = result.passed;
    trialState.completed = Boolean(answer);
    trialState.taskKey = task?.key || "";
  }
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("user", persona.learnerLabel, answer || "I do not know how to answer yet.")
  );
  fields.chatLog.insertAdjacentHTML(
    "beforeend",
    messageTemplate("ai", "89 Teacher", trialState.feedback || aiReplyFor(answer, persona))
  );
  if (trialState.firstSubmitted && !trialState.completed && task?.choices?.[0]) {
    fields.answerInput.value = task.choices[0][1];
    fields.answerInput.select();
    setTeacherSegment("coach");
  } else {
    fields.answerInput.value = "";
    setTeacherSegment(trialState.completed ? "wrap" : "prompt");
  }
  updateTrialDisplay();
  updateReportForTask(persona, task);
  renderOps(persona);
  updateAnalysisMeter(voiceScore);
  if (fields.voiceStatus) {
    fields.voiceStatus.textContent = trialState.completed
      ? "Improved answer saved. You can view the parent report."
      : "First try saved. Listen to the coach tip, then record again.";
  }
  if (fields.voiceScore) fields.voiceScore.textContent = voiceScore.label;
  fields.chatLog.scrollTop = fields.chatLog.scrollHeight;
});

window.addEventListener("popstate", () => {
  setRoute(window.location.hash.replace("#", "") || "landing");
});

renderStages(7);
buildCourseFromQuizAnswers();
setPersona("child");
renderQuiz();
setRoute(window.location.hash.replace("#", "") || "landing");
