function startQuiz() {
  document.body.style.opacity = "0";
  document.body.style.transition = "0.6s";
  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 600);
}

// ================= QUIZ DATA (10 QUESTIONS)
const quizData = [
  {question:"What is Seismic?",options:["Social Media","Blockchain Platform","Game Engine","Hosting"],answer:1},
  {question:"Main feature of Seismic?",options:["Speed","Privacy","Gaming","Ads"],answer:1},
  {question:"Seismic is mainly used for?",options:["Entertainment","Finance","Photos","Music"],answer:1},
  {question:"Seismic focuses on which industry?",options:["Healthcare","Fintech","Education","Gaming"],answer:1},
  {question:"What does Seismic protect?",options:["Images","Transactions","Videos","Passwords"],answer:1},
  {question:"Seismic supports which contracts?",options:["Paper","Encrypted smart","Verbal","None"],answer:1},
  {question:"Seismic gives which experience?",options:["Bitcoin","Ethereum-like","Google","Facebook"],answer:1},
  {question:"Seismic ensures?",options:["Speed","Privacy & security","Fun","Ads"],answer:1},
  {question:"Developers build?",options:["Games","Private apps","Music","Chat"],answer:1},
  {question:"Seismic integrates with?",options:["Social","Payment providers","Games","Video"],answer:1}
];

// VARIABLES
let current = 0;
let score = 0;
let time = 10;
let interval;

// START
if (document.getElementById("question")) loadQuestion();

// LOAD QUESTION
function loadQuestion() {
  const q = quizData[current];

  document.getElementById("question").innerText = q.question;
  document.getElementById("qNumber").innerText =
    `Question ${current + 1} / ${quizData.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.innerText = opt;
    div.classList.add("option");

    div.onclick = () => {
      document.querySelectorAll(".option").forEach(o => o.style.pointerEvents="none");

      if (i === q.answer) {
        div.classList.add("correct");
        score++;
      } else {
        div.classList.add("wrong");
      }

      setTimeout(() => {
        current++;
        if (current < quizData.length) {
          loadQuestion();
        } else {
          showResult();
        }
      }, 800);
    };

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

// PROGRESS
function updateProgress() {
  document.getElementById("progress").style.width =
    (current / quizData.length) * 100 + "%";
}

// TIMER
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

// RESULT
function showResult() {
  document.querySelector(".quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText = score;
}
