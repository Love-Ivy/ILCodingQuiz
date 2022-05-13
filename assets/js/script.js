var questions = document.querySelectorAll(".questionPage");
var startpage = document.querySelector("#startpage");
var scorepage = document.querySelector("#scorePage");
var highscores = document.querySelector("#highscores");
var startbtn = document.querySelector("#startbutton");
var answers = document.querySelectorAll(".answer");
var section = document.querySelector("section");
var viewscores = document.querySelector("#viewhighscores");
var homebtn = document.querySelector("#homebtn");
var correct = document.querySelector("#correctanswer");
var wrong = document.querySelector("#wronganswer");
var submitbtn = document.querySelector("#submit");
var initialsinput = document.querySelector("#initialsinput");
var clock = document.querySelector("#clock");
var finalscore = document.querySelector("#finalscore");
var currentpage = 0;
var timeremaining = document.querySelector("#timeremaining");
var highscorelistEl = document.querySelector("#highscorelist");

clock.textContent = "Time remaining: 60 seconds";
var countdown = 61;
if (countdown < 0) {
  countdown = 0;
}
var correctanswers = 0;
var pltime = 0;

startbtn.addEventListener("click", StartQuiz);
viewscores.addEventListener("click", DisplayScores);
homebtn.addEventListener("click", ReturnHome);
submitbtn.addEventListener("click", SubmitScore);
// Event listener Answer buttons
for (let i = 0; i < answers.length; i++) {
  answers[i].addEventListener("click", AnswerClick);
}

// Back to Start Page
function ReturnHome() {
  StopTime();
  clock.textContent = "Time remaining: 60 seconds";
  startpage.classList.remove("hidden");
  questions[currentpage].classList.add("hidden");
  highscores.classList.add("hidden");
  scorepage.classList.add("hidden");
  homebtn.classList.add("hidden");
}

// High score submit
if (storedscore === null) {
  var highscoreboard = [["java", 0]];
  var highscoreliststring = JSON.stringify(highscoreboard);
  localStorage.setItem("storedhsl", highscoreliststring);
}
var storedscore = localStorage.getItem("storedhsl");
highscoreboard = JSON.parse(storedscore);

function SubmitScore() {
  storedscore;
  highscoreboard;
  var initials = initialsinput.value;
  var scoreentry = [];
  scoreentry.push(initials, plscore);
  highscoreboard.push(scoreentry);
  highscoreboard.sort((a, b) => b[1] - a[1]);
  highscoreliststring = JSON.stringify(highscoreboard);
  localStorage.setItem("storedhsl", highscoreliststring);
  // Show "Submitted", disable input and submit, clear input
  initialsinput.classList.add("hidden");
  submitbtn.classList.add("hidden");
  initialsinput.value = "";
  var submitmessage = document.createElement("p");
  submitmessage.innerHTML = "Success!";
  scorepage.appendChild(submitmessage);
  setTimeout(function () {
    submitmessage.remove();
  }, 2000);
}

// Show High Score page
function DisplayScores() {
  highscorelistEl.innerHTML = "";
  questions[currentpage].classList.add("hidden");
  startpage.classList.add("hidden");
  highscores.classList.remove("hidden");
  scorepage.classList.add("hidden");
  homebtn.classList.remove("hidden");
  // var storedscore = localStorage.getItem("storedhsl");

  for (let i = 0; i < 10; i++) {
    var listEl = document.createElement("li");
    if (highscoreboard[i] == null) {
      listEl.innerHTML = "No Score";
      highscorelistEl.appendChild(listEl);
    } else {
      listEl.innerHTML = highscoreboard[i];
      highscorelistEl.appendChild(listEl);
    }
  }
}

// Start quiz
function StartQuiz(event) {
  event.preventDefault();
  // console.log("Begin");
  StartTime();
  currentpage = 0;
  homebtn.classList.remove("hidden");
  startpage.classList.add("hidden");
  questions[currentpage].classList.remove("hidden");
  // console.log(currentpage);
  initialsinput.classList.remove("hidden");
  submitbtn.classList.remove("hidden");
}

// Show next page
function AnswerClick(event) {
  event.preventDefault();
  // console.log(event.target);
  if (event.target.classList.contains("correct")) {
    CorrectAnswer();
  } else {
    WrongAnswer();
  }

  if (currentpage < questions.length - 1) {
    currentpage++;
    questions[currentpage - 1].classList.add("hidden");
    console.log(currentpage);

    questions[currentpage].classList.remove("hidden");
  } else {
    questions[currentpage].classList.add("hidden");
    EndQuiz();
  }
}

// End quiz, display score.
function EndQuiz() {
  // console.log("EndQuiz");
  StopTime();
  scorepage.classList.remove("hidden");
  questions[currentpage].classList.add("hidden");
  timeremaining.textContent =
    "Quiz complete with " + plscore + " seconds remaining.";
  finalscore.textContent =
    "You selected " + correctanswers + " correct answers.";
  if (correctanswers === 5) {
    finalscore.textContent = "Great job!";
  }
}

//global timer

var timer = setInterval(function SixtySeconds() {
  if (countdown > 1 && countdown < 61) {
    countdown--;
    clock.textContent = "Time remaining: " + countdown + " seconds";
  } else if (countdown === 1) {
    countdown--;
    clock.textContent = "Time remaining: " + countdown + " second";
  } else if (countdown == 0) {
    EndQuiz();
    clearInterval(timer);
  }
}, 1000);

function StartTime() {
  // console.log("start");
  plscore = 0;
  countdown = 60;
  timer;
}

function StopTime() {
  // console.log("stop");
  plscore = countdown;
  clock.textContent = "Time remaining: " + countdown + " seconds";
  countdown = 61;
}

function WrongAnswer() {
  // Wrong answer behaviour
  // console.log("Wrong");
  //display "Wrong!"
  wrong.classList.remove("hidden");
  setTimeout(function () {
    wrong.classList.add("hidden");
  }, 1000);
  countdown = countdown - 10;
}

function CorrectAnswer() {
  // console.log("correct");
  // Display "Correct!"
  correct.classList.remove("hidden");
  setTimeout(function () {
    correct.classList.add("hidden");
  }, 1000);
  correctanswers++;
}
// Create coundown timer (60seconds), start on button press, show end page when timer hits 0
// if name entered in score field, add to high score and sort (save top 10)
