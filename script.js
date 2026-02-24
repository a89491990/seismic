// Redirect
function startQuiz() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 600);
}

// Glow follow
const glow = document.querySelector(".glow");

document.addEventListener("mousemove", e => {
  if (glow) {
    glow.style.left = e.clientX - 150 + "px";
    glow.style.top = e.clientY - 150 + "px";
  }
});

// Particles
for (let i = 0; i < 20; i++) {
  let p = document.createElement("div");
  p.classList.add("particle");
  document.body.appendChild(p);

  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 100 + "vh";
}

// QUIZ LOGIC
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
let interval;

if (document.getElementById("question")) loadQuestion();

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
      if (index === q.answer) {
        div.classList.add("correct");
        score++;
      } else {
        div.classList.add("wrong");
      }

      document.querySelectorAll(".option").forEach(o => {
        o.style.pointerEvents = "none";
      });
    };

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

document.addEventListener("click", e => {
  if (e.target.id === "nextBtn") {
    current++;
    if (current < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
});

function updateProgress() {
  let percent = (current / quizData.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function startTimer() {
  clearInterval(interval);
  time = 10;
  document.getElementById("time").innerText = time;

  interval = setInterval(() => {
    time--;
    document.getElementById("time").innerText = time;

    if (time <= 0) {
      clearInterval(interval);
      current++;
      if (current < quizData.length) loadQuestion();
      else showResult();
    }
  }, 1000);
}

function showResult() {
  document.querySelector(".quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = score;
}
