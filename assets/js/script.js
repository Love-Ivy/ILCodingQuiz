// Hide pages on load
var questions = document.querySelectorAll(".questionPage");
var startpage = document.querySelector("#startpage");
var scorepage = document.querySelector("#scorePage");
var highscores = document.querySelector("#highscores");
var q1 = document.querySelector("#Page1");
var q2 = document.querySelector("#Page2");
var q3 = document.querySelector("#Page3");
var q4 = document.querySelector("#Page4");
var q5 = document.querySelector("#Page5");
var startbtn = document.querySelector("#startbutton");
viewscores = document.querySelector("#viewhighscores");

console.log(document.querySelectorAll(".hidden"));
startbtn.addEventListener("click", StartQuiz);
viewscores.addEventListener("click", DisplayScores);

function DisplayScores(event) {
  event.preventDefault();
  for (let index = 0; index < questions.length; index++) {
    questions[index].classList.add("hidden");
  }
  startpage.classList.add("hidden");
  highscores.classList.remove("hidden");
}

function StartQuiz(event) {
  event.preventDefault();
  startpage.classList.add("hidden");
  q1.classList.remove("hidden");
}
// Create coundown timer (60seconds), start on button press, show end page when timer hits 0
// on click "view highscores" display high score page
// On start, display random quiz page
// on button click, display random quiz page
// on right answer, display "correct" for 1 second
// on wrong answer, subrtract time from clock, display "wrong" for 1 second
// after 5 questions, stop timer, show score page. save time remaining to local storage.
// if name entered in score field, add to high score and sort (save top 10)
