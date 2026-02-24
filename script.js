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
    question: "Seismic is used for?",
    options: ["Entertainment", "Finance", "Photos", "Music"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let time = 10;
let interval;

const nextBtn = document.getElementById("nextBtn");

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

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) {
    animateFade();
    loadQuestion();
  } else {
    showResult();
  }
};

function updateProgress() {
  let percent = ((current) / quizData.length) * 100;
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
      nextBtn.click();
    }
  }, 1000);
}

function animateFade() {
  const box = document.querySelector(".quiz-box");
  box.classList.remove("fade");
  void box.offsetWidth;
  box.classList.add("fade");
}

function showResult() {
  document.querySelector(".quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  animateScore(score);
}

function animateScore(finalScore) {
  let count = 0;
  const interval = setInterval(() => {
    count++;
    document.getElementById("score").innerText = count;
    if (count >= finalScore) clearInterval(interval);
  }, 100);
}

loadQuestion();
