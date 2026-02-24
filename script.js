// Quiz Data
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
  }
];

let current = 0;
let score = 0;
let time = 10;

// Glow effect
const glow = document.createElement("div");
glow.classList.add("glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Load question
function loadQuestion() {
  const q = quizData[current];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.innerText = opt;
    div.classList.add("option");

    div.onclick = () => {
      if (index === q.answer) score++;
      nextQuestion();
    };

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

// Next
function nextQuestion() {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-box").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    animateScore(score);
  }
}

// Progress
function updateProgress() {
  let percent = (current / quizData.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

// Timer
function startTimer() {
  time = 10;
  const circle = document.querySelector("circle");

  const interval = setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;
    circle.style.strokeDashoffset = 220 - (time * 22);

    if (time <= 0) {
      clearInterval(interval);
      nextQuestion();
    }
  }, 1000);
}

// Score animation
function animateScore(finalScore) {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    document.getElementById("score").innerText = count;
    if (count === finalScore) clearInterval(interval);
  }, 100);
}

// Start
loadQuestion();
