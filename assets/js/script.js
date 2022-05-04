var questions = document.querySelectorAll(".questionPage");
var startpage = document.querySelector("#startpage");
var scorepage = document.querySelector("#scorePage");
var highscores = document.querySelector("#highscores");
var startbtn = document.querySelector("#startbutton");
var answers = document.querySelectorAll(".answer");
var section = document.querySelector("section");
var viewscores = document.querySelector("#viewhighscores");
var homebtn = document.querySelector("#homebtn");
var currentpage = 0;

console.log(questions.length);
startbtn.addEventListener("click", StartQuiz);
viewscores.addEventListener("click", DisplayScores);
homebtn.addEventListener("click", ReturnHome);

// Countdown Timer

// Event listener Answer buttons
for (let i = 0; i < answers.length; i++) {
  answers[i].addEventListener("click", AnswerClick);
}

// Back to Start Page
function ReturnHome() {
  startpage.classList.remove("hidden");
  questions[currentpage].classList.add("hidden");
  highscores.classList.add("hidden");
  scorepage.classList.add("hidden");
}

// Show High Score page
function DisplayScores() {
  questions[currentpage].classList.add("hidden");
  startpage.classList.add("hidden");
  highscores.classList.remove("hidden");
  scorepage.classList.add("hidden");
}

// Start quiz
function StartQuiz(event) {
  event.preventDefault();
  startpage.classList.add("hidden");
  questions[currentpage].classList.remove("hidden");
  console.log(currentpage);
}

// Show next page
function AnswerClick(event) {
  event.preventDefault();
  console.log(event.target);
  // Correct answer behaviour
  if (event.target.classList.contains("correct")) {
    console.log("correct");
    // Display "Correct!"
    // Wrong answer behaviour
  } else {
    console.log("Wrong");
    //display "Wrong!"
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
  //  StopTime;
  scorepage.classList.remove("hidden");
}

// Create coundown timer (60seconds), start on button press, show end page when timer hits 0
// on right answer, display "correct" for 1 second
// on wrong answer, subrtract time from clock, display "wrong" for 1 second
// after 5 questions, stop timer, show score page. save time remaining to local storage.
// if name entered in score field, add to high score and sort (save top 10)
