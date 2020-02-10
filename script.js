//document variables
var $timer = document.getElementById("timer");
var $start = document.querySelector("#start");
var $list = document.getElementById("list");
var $quizStartPage = document.getElementById("quizChallengeInitial");
var $questionPage = document.getElementById("questionPage");
var $scorePage = document.getElementById("scorePage");
var $displayScore = document.getElementById("displayScore");

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

//array to hold user answers
var userAnswers = [];
var questionNumber = 0;
var score = 0;
var timerCountdown;

$start.addEventListener("click", quizStart);

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
  for (let i = 0; i < questionList.length; i++) {
    if (userAnswers[i] === questionList[i].correct) {
      score++;
    }
  }
}

function renderScore() {
  let scorerName = document.querySelector("#scoreName").value;

  $questionPage.style.display = "none";
  $scorePage.style.display = "block";

  clearInterval(timerCountdown);
  scoring();

  let numberCorrect = score;
  numberCorrect = numberCorrect * parseInt($timer.innerText);

  $displayScore.textContent = numberCorrect;
}
