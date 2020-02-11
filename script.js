//document variables
var $start = document.querySelector("#start");
var $linkScore = document.querySelector("#linkScore");

var $timer = document.getElementById("timer");
var $list = document.getElementById("list");
var $quizStartPage = document.getElementById("quizChallengeInitial");
var $questionPage = document.getElementById("questionPage");
var $scorePage = document.getElementById("scorePage");
var $displayScore = document.getElementById("displayScore");
var $submit = document.getElementById("submit");
var $reset = document.getElementById("reset");
var $resetScore = document.getElementById("resetQuiz");
var $highscorePage = document.getElementById("highscorePage");
var $scoreList = document.getElementById("scoreList");
//quiz questions w/ options & correct answer

var questionList = [
  (question1 = {
    question: "Which HTML header tag results in the largest header?",
    answers: ["h1", "h2", "h3", "h4"],
    correct: "h1"
  }),
  (question2 = {
    question: "Which CSS style changes the font color?",
    answers: ["font-color", "color", "background-color", "style"],
    correct: "color"
  }),
  (question3 = {
    question: "How do you comment one line in JavaScipt?",
    answers: ["//", "!--", "/*", "**"],
    correct: "//"
  })
];

var userAnswers = [];
var questionNumber = 0;
var score = 0;
var timerCountdown;

$start.addEventListener("click", quizStart);
$submit.addEventListener("click", submitScore);
$reset.addEventListener("click", restartQuiz);
$resetScore.addEventListener("click", restartQuiz);
$linkScore.addEventListener("click", linkScore);

function quizStart() {
  countdown();
  displayStatus();
  renderQuestion();
  ansLog();
}

function countdown() {
  let time = 100;
  timerCountdown = setInterval(function() {
    $timer.textContent = time;
    --time;
    if (time === 0) {
      $timer.textContent = 0;
      clearInterval(timerCountdown);
    }
  }, 1000);
}

function displayStatus() {
  if ($quizStartPage.style.display === "block") {
    $quizStartPage.style.display = "none";
  }
}

function renderQuestion() {
  $questionPage.style.display = "block";
  let $question = document.getElementById("question");
  if (questionNumber !== 3) {
    $question.textContent = questionList[questionNumber].question;
    for (let i = 0; i < questionList[questionNumber].answers.length; i++) {
      let button = document.createElement("button");
      button.setAttribute("class", "btn btn-dark btn-lg btn-block");
      button.setAttribute("id", questionList[questionNumber].answers[i]);
      button.textContent = questionList[questionNumber].answers[i];
      $list.appendChild(button);
    }
  } else {
    renderScore();
  }
}

function ansLog() {
  $list.addEventListener("click", function(e) {
    let element = e.target;
    if (element.matches("button") === true) {
      let ans = element.getAttribute("id");
      userAnswers.push(ans);
      console.log(userAnswers);
      clearRender();
      renderQuestion();
    }
  });
}

function clearRender() {
  for (let i = 0; i < questionList[questionNumber].answers.length; i++) {
    $list.removeChild($list.firstChild);
  }
  questionNumber++;
}

function scoring() {
  score = 0;
  for (let i = 0; i < questionList.length; i++) {
    if (userAnswers[i] === questionList[i].correct) {
      score++;
    }
  }
}

function renderScore() {
  $questionPage.style.display = "none";
  $scorePage.style.display = "block";

  clearInterval(timerCountdown);
  scoring();

  let numberCorrect = score;
  numberCorrect = numberCorrect * parseInt($timer.innerText);

  $displayScore.textContent = numberCorrect;
}

function submitScore() {
  $scorePage.style.display = "none";
  let user = document.querySelector("#scoreName").value;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("score", JSON.stringify(userScore));

  linkScore();
}

function restartQuiz() {
  $quizStartPage.style.display = "block";
  $scorePage.style.display = "none";
  $questionPage.style.display = "none";
  $highscorePage.style.display = "none";
  score = 0;
  questionNumber = 0;
  userAnswers = [];
}

function linkScore() {
  clearInterval(timerCountdown);
  renderHighscore();
  if ($highscorePage.style.display === "none") {
    $questionPage.style.display = "none";
    $quizStartPage.style.display = "none";
    $scorePage.style.display = "none";
    $highscorePage.style.display = "block";
  }
}

function renderHighscore() {
  let scores = JSON.parse(localStorage.getItem("score"));
  let names = JSON.parse(localStorage.getItem("user"));
  let addScore = scores;
  let addName = names;
  let p = document.createElement("p");
  p.textContent = "Name: " + addName + " | Score: " + addScore;
  $scoreList.appendChild(p);
}
