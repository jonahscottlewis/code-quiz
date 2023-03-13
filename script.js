var startBtn = document.querySelector(".start_btn");
var quitBtn = document.querySelector(".quit");
var question = document.querySelector(".question");
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");
var btn3 = document.querySelector(".btn3");
var timerElement = document.querySelector(".timer");
var timerCount = 60;
var endScore = document.querySelector(".score")
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
  } else /*if(response == questions[i].answer){
      score++
    } */ {

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

  // put those 2 pieces of data together
  // array ex : ['jl', '12'] or ex { initials: 'jl', score: '12' }
  var userInput = [userInitials, score];

  // put that data into loacal storage
  localStorage.setItem('userScore', JSON.stringify(userInput));
 
  // user the endscore el insert ther score with textcontent
  endScore.textContent = score;
  // var fromLs = JSON.parse(localStorage.getItem('userInput'))
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

//timerElement.addEvenListener("click", function(){
// localStorage.setItem("count", count)
//});



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

//function keepScore() {
// if (endQuiz == true){
//  score.textcontent = timerCount;
//}
//}

startBtn.addEventListener("click", startGame)
quitBtn.addEventListener("click", startGame)