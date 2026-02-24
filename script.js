// ==========================
// 🔥 START QUIZ TRANSITION
// ==========================
function startQuiz() {
  document.body.style.opacity = "0";
  document.body.style.transition = "0.6s";

  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 600);
}

// ==========================
// ✨ GLOW FOLLOW EFFECT
// ==========================
const glow = document.querySelector(".glow");

document.addEventListener("mousemove", (e) => {
  if (glow) {
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
  }
});

// ==========================
// 🌌 PARTICLES GENERATOR
// ==========================
for (let i = 0; i < 25; i++) {
  let p = document.createElement("div");
  p.classList.add("particle");
  document.body.appendChild(p);

  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 100 + "vh";
  p.style.animationDuration = (5 + Math.random() * 5) + "s";
}

// ==========================
// 🧠 QUIZ DATA
// ==========================
const quizData = [
  {
    question: "What is Seismic?",
    options: ["Social Media", "Blockchain Platform", "Game Engine", "Hosting"],
    answer: 1
  },
  {
    question: "Main feature of Seismic?",
    options: ["Speed", "Privacy", "Gaming", "Ads"],
    answer: 1
  },
  {
    question: "Seismic is mainly used for?",
    options: ["Entertainment", "Finance", "Photos", "Music"],
    answer: 1
  }
];

// ==========================
// ⚙️ VARIABLES
// ==========================
let current = 0;
let score = 0;
let time = 10;
let interval;

// ==========================
// 🚀 INIT QUIZ (only quiz page)
// ==========================
if (document.getElementById("question")) {
  loadQuestion();
}

// ==========================
// 📥 LOAD QUESTION
// ==========================
function loadQuestion() {
  const q = quizData[current];

  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.innerText = opt;
    div.classList.add("option");

    div.onclick = () => handleAnswer(div, index, q.answer);

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

// ==========================
// ✅ HANDLE ANSWER
// ==========================
function handleAnswer(div, index, correctIndex) {
  // disable multiple click
  document.querySelectorAll(".option").forEach(o => {
    o.style.pointerEvents = "none";
  });

  if (index === correctIndex) {
    div.classList.add("correct");
    score++;
  } else {
    div.classList.add("wrong");
  }

  // auto next after delay
  setTimeout(() => {
    current++;
    if (current < quizData.length) {
      animateFade();
      loadQuestion();
    } else {
      showResult();
    }
  }, 800);
}

// ==========================
// 🎬 FADE ANIMATION
// ==========================
function animateFade() {
  const box = document.querySelector(".quiz-box");
  if (!box) return;

  box.classList.remove("fade");
  void box.offsetWidth;
  box.classList.add("fade");
}

// ==========================
// 📊 PROGRESS BAR
// ==========================
function updateProgress() {
  const progress = document.getElementById("progress");
  if (!progress) return;

  let percent = (current / quizData.length) * 100;
  progress.style.width = percent + "%";
}

// ==========================
// ⏱️ TIMER SYSTEM
// ==========================
function startTimer() {
  clearInterval(interval);

  time = 10;
  const timeEl = document.getElementById("time");
  if (timeEl) timeEl.innerText = time;

  interval = setInterval(() => {
    time--;
    if (timeEl) timeEl.innerText = time;

    if (time <= 0) {
      clearInterval(interval);

      current++;
      if (current < quizData.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }
  }, 1000);
}

// ==========================
// 🏁 SHOW RESULT
// ==========================
function showResult() {
  const quizBox = document.querySelector(".quiz-box");
  const result = document.getElementById("result");

  if (quizBox) quizBox.classList.add("hidden");
  if (result) result.classList.remove("hidden");

  animateScore(score);
}

// ==========================
// 🔢 SCORE ANIMATION
// ==========================
function animateScore(finalScore) {
  let count = 0;

  const scoreEl = document.getElementById("score");
  const interval = setInterval(() => {
    count++;
    if (scoreEl) scoreEl.innerText = count;

    if (count >= finalScore) clearInterval(interval);
  }, 80);
}
