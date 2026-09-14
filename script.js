/* ------------------------------------------------------------------
   STARTING POINT - this file has all three bugs in it.

   This is written the way the usual YouTube quiz tutorial writes it,
   so the mistakes here are the same ones that are almost certainly in
   your file. Each fix is a separate commit after this one.
------------------------------------------------------------------ */

const questions = [
  {
    question: "Which planet is closest to the Sun?",
    answers: [
      { text: "Venus",   correct: false },
      { text: "Mercury", correct: true  },
      { text: "Mars",    correct: false },
      { text: "Earth",   correct: false }
    ]
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "Five",  correct: false },
      { text: "Six",   correct: false },
      { text: "Seven", correct: true  },
      { text: "Eight", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean",   correct: false },
      { text: "Arctic Ocean",   correct: false },
      { text: "Pacific Ocean",  correct: true  }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java",       correct: false },
      { text: "C",          correct: false },
      { text: "Python",     correct: false },
      { text: "JavaScript", correct: true  }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets",    correct: false },
      { text: "Cascading Style Sheets",  correct: true  },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats",     correct: false }
    ]
  }
];

const questionElement      = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton           = document.getElementById("next-btn");
const progressTextElement  = document.getElementById("progress-text");
const scoreTextElement     = document.getElementById("score-text");
const progressFillElement  = document.getElementById("progress-fill");

let currentQuestionIndex = 0;
let score = 0;
let quizFinished = false;

function startQuiz() {
  currentQuestionIndex = 0;
  quizFinished = false;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  progressTextElement.innerHTML = "Question " + questionNo + " of " + questions.length;
  scoreTextElement.innerHTML = "Score: " + score;
  progressFillElement.style.width = ((currentQuestionIndex / questions.length) * 100) + "%";

  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    answerButtonsElement.appendChild(button);

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  scoreTextElement.innerHTML = "Score: " + score;
  currentQuestionIndex++;

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  resetState();

  quizFinished = true;
  progressTextElement.innerHTML = "Finished";
  scoreTextElement.innerHTML = "Score: " + score;
  progressFillElement.style.width = "100%";

  questionElement.innerHTML =
    "<div class='result'>" +
      "<div class='result-score'>" + score + " / " + questions.length + "</div>" +
      "<div class='result-message'>" + resultMessage() + "</div>" +
    "</div>";

  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function resultMessage() {
  const percent = (score / questions.length) * 100;

  if (percent === 100) return "Perfect score.";
  if (percent >= 60)   return "Nicely done.";
  if (percent > 0)     return "Worth another go.";
  return "Better luck next time.";
}

nextButton.addEventListener("click", () => {
  if (quizFinished) {
    startQuiz();
  } else {
    handleNextButton();
  }
});

startQuiz();
