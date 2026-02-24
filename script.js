function startQuiz() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 500);
}

const quizData = [
  {question:"What is Seismic?",options:["Social Media","Blockchain Platform","Game Engine","Hosting"],answer:1},
  {question:"Main feature?",options:["Speed","Privacy","Gaming","Ads"],answer:1},
  {question:"Used for?",options:["Entertainment","Finance","Photos","Music"],answer:1},
  {question:"Focus industry?",options:["Health","Fintech","Edu","Gaming"],answer:1},
  {question:"Protects?",options:["Images","Transactions","Videos","Passwords"],answer:1},
  {question:"Contracts?",options:["Paper","Encrypted","Verbal","None"],answer:1},
  {question:"Experience?",options:["Bitcoin","Ethereum-like","Google","Meta"],answer:1},
  {question:"Ensures?",options:["Speed","Privacy & security","Fun","Ads"],answer:1},
  {question:"Developers build?",options:["Games","Private apps","Music","Chat"],answer:1},
  {question:"Integrates with?",options:["Social","Payment providers","Games","Video"],answer:1}
];

let current = 0;
let score = 0;
let time = 10;
let interval;

if (document.getElementById("question")) loadQuestion();

function loadQuestion() {
  const q = quizData[current];

  document.getElementById("question").innerText = q.question;
  document.getElementById("qNumber").innerText =
    `Question ${current+1} / ${quizData.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt,i)=>{
    const div=document.createElement("div");
    div.innerText=opt;
    div.classList.add("option");

    div.onclick=()=>{
      document.querySelectorAll(".option").forEach(o=>o.style.pointerEvents="none");

      if(i===q.answer){
        div.classList.add("correct");
        score++;
      }else{
        div.classList.add("wrong");
      }

      setTimeout(()=>{
        current++;
        if(current<quizData.length) loadQuestion();
        else showResult();
      },800);
    };

    optionsDiv.appendChild(div);
  });

  updateProgress();
  startTimer();
}

function updateProgress(){
  document.getElementById("progress").style.width =
    (current/quizData.length)*100+"%";
}

function startTimer(){
  clearInterval(interval);
  time=10;
  document.getElementById("time").innerText=time;

  interval=setInterval(()=>{
    time--;
    document.getElementById("time").innerText=time;

    if(time<=0){
      clearInterval(interval);
      current++;
      if(current<quizData.length) loadQuestion();
      else showResult();
    }
  },1000);
}

function showResult(){
  document.querySelector(".quiz-box").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("score").innerText=score;

  let percent=(score/quizData.length)*100;
  const grade=document.getElementById("gradeText");

  if(percent>=80) grade.innerText="🔥 Excellent!";
  else if(percent>=50) grade.innerText="👍 Good!";
  else grade.innerText="😅 Try Again!";
}
