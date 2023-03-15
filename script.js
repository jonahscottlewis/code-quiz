var startBtn = document.querySelector(".start_btn");
var highScores = document.querySelector(".score_card");
var savedScores = JSON.parse(localStorage.getItem('userScore')) || [];
var clearBtn = document.querySelector(".clear_scores");
var question = document.querySelector(".question");
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var timerElement = document.querySelector(".timer");
var timerCount = 60;
var endScore = document.querySelector(".score");
var score = 0;
var questionInterval = 0;

var questions = [
  {
    question: "What does HTML stand for?",
    answer: {
      a: "Hyper Text Makeup Lingo",
      b: "Hippo Monkey Tiger Lion",
      c: "Hyper Text Markup Language"
    },
    correctAnswer: 'Hyper Text Markup Language'
  }, {

    question: "What does CSS stand for?",
    answer: {
      a: "Cascading Style Sheets",
      b: "Computer Simon Says",
      c: "Camp Sea Shell"
    },
    correctAnswer: "Cascading Style Sheets"
  }, {
    question: "What is the correct way to write an array in JavaScript?",
    answer: {
      a: "var num=(1,2,3)",
      b: "var num=[1,2,3]",
      c: "var num={1,2,3}"
    },
    correctAnswer: 'var num=[1,2,3]'
  }, {
    question: "A string can be converted to an array using which method?",
    answer: {
      a: "slpit()",
      b: "slice()",
      c: "piece()"
    },
    correctAnswer: "slpit()"
  }
];

//Looping through each question and ending quiz 
function nextQuestion() {
  if (questionInterval < questions.length && timerCount > 0) {
    question.textContent = questions[questionInterval].question;
    btn1.textContent = questions[questionInterval].answer.a;
    btn2.textContent = questions[questionInterval].answer.b;
    btn3.textContent = questions[questionInterval].answer.c;
    questionInterval++;
    btn1.addEventListener("click", checkAnswer)
    btn2.addEventListener("click", checkAnswer)
    btn3.addEventListener("click", checkAnswer)
  } else {

    endQuiz();
  }
};

function endQuiz() {
  clearInterval(timer);
  // use prompt to get inits from user
  var userInitials = prompt("Please enter initials")

  // get the time left on timer (timerCount)
  var score = timerCount;
  console.log(userInitials, timerCount);

  // put those 2 pieces of data together in an array
  var userInput = [userInitials, score];

  // put that data into loacal storage
  localStorage.setItem('userScore', JSON.stringify(userInput));

  //Get the userInput back out from JSON
  //JSON.parse('userScore',userInput);

  // user the endscore el insert ther score with textcontent
  endScore.textContent = score;
  var highScores = document.querySelector(".score_card");
  highScores.textContent = userInput;
  /*score. = "visibility:visible";*/
}

function displayHistory() {
  var highScores = document.querySelector(".score_card");
  highScores.innerHTML = "";
  // high scores list
  if (localStorage.getItem('userScore')) {
   for (var i = savedScores.length < 5 ? 0 : savedScores.length -5; i < savedScores.length; i++ ){
      var scores = document.createElement('h4');
      // giving class so can be grabbed with querySelector and used in searchRecent function below
      
      scores.innerHTML = savedScores[i];
      scores.addEventListener(onload, function (event) {
        savedScores.value = event.target.textContent;
      })
      highScores.append(scores)
    }
  }
} displayHistory()

function clearHistory() {
  localStorage.clear();
}

function checkAnswer(event) {
  const userAnswer = event.target.innerText;
  console.log(userAnswer);
  const correctAnswer = questions[questionInterval - 1].correctAnswer;
  console.log(correctAnswer);
  if (userAnswer != correctAnswer) { //if(userAnswer != correctAnswer && timer > 15)
    timerCount -= 10;              // else is (timer < 15){endQuiz()}
  }
  nextQuestion();
}

function startGame() {
  // Prevents start button from being clicked when round is in progress
  startBtn.style = "display:none";
  startTimer();
  nextQuestion();
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      timerCount = 0
      clearInterval(timer);
      endQuiz()
    }
  }, 1000);
}

startBtn.addEventListener("click", startGame)
clearBtn.addEventListener("click", clearHistory)