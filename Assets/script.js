var start = document.getElementById("start");
var intro = document.getElementById("intro");
var questions = document.getElementById("questions");
var result = document.getElementById("result");
var userCorrect = document.getElementById("userCorrect");
var score = document.getElementById("userScore");
var initials = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var scores = document.getElementById("scores");
var viewScores = document.getElementById("viewScores");
var questionTxt = document.getElementById("questionTxt");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var buttons = document.getElementById("buttons");
var response = document.querySelector(".response");
var timeDisplay = document.getElementById("time-display");
var leaderBoard = document.getElementById("leaderBoard");
var backBtn = document.getElementById("back");
var clearBtn = document.getElementById("clear");
var navbar = document.querySelector(".navbar");
var hr = document.getElementById("hr");

var questionSet = [
    {
        "question": "Commonly used data types DO NOT include:",
        "button1": "1. strings",
        "button2": "2. booleans",
        "button3": "3. alerts",
        "button4": "4. numbers",
        "answer": "3",
    },
    {
        "question": "The condition in an if / else statement is enclosed within _____.",
        "button1": "1. quotes",
        "button2": "2. curly brackets",
        "button3": "3. parentheses",
        "button4": "4. square brackets",
        "answer": "3",
    },
    {
        "question": "Arrays in Javascript can be used to store _____.",
        "button1": "1. numbers and strings",
        "button2": "2. other arrays",
        "button3": "3. booleans",
        "button4": "4. all of the above",
        "answer": "4",
    },
    {
        "question": "String values must be enclosed within _____ when being assigned to variables.",
        "button1": "1. commas",
        "button2": "2. curly brackets",
        "button3": "3. quotes",
        "button4": "4. parentheses",
        "answer": "3",
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "button1": "1. Javascript",
        "button2": "2. terminal/bash",
        "button3": "3. for loops",
        "button4": "4. console.log",
        "answer": "4",
    }
];

var questionAsked = [];
var i = 0;
var guess;
var correct = 0;
var secondsLeft = 75;
var timerInterval;
var highscores = [];
var userInitials;
var userScore;

function getQuestion (){
    if (i === questionSet.length){
        showFinalResults();
        return;
    }
    questionTxt.textContent = questionSet[i].question;
    btn1.textContent = questionSet[i].button1;
    btn2.textContent = questionSet[i].button2;
    btn3.textContent = questionSet[i].button3;
    btn4.textContent = questionSet[i].button4;
}

function checkAnswer(guess){
    if (guess === questionSet[i].answer){
        correct++;
        i++;
        response.textContent = "Correct!";
        showResult();
        getQuestion();
    }
    else{
        clearInterval(timerInterval);
        i++;
        response.textContent = "Wrong!"
        secondsLeft = secondsLeft - 10;
        showResult();
        getQuestion();
        if (i === questionSet.length){
            return;
        }
        startTimer(secondsLeft);
    }
}

function showResult(){
    response.style.display = "block";
    var countdown = 1;
    var timer = setTimeout(function() {
        countdown--;
        if (countdown === 0){
            clearInterval(timer);
            response.style.display = "none";
        }
    }, 1000);
}

function showFinalResults(){
    clearInterval(timerInterval);
    userCorrect.textContent = correct;
    if (correct === 0){
        secondsLeft = 0;
        timeDisplay.textContent = secondsLeft;
        score.textContent = "0";
    }    
    intro.style.display = "none";
    questions.style.display = "none";    
    scores.style.display = "none";
    result.style.display = "block";
}

function getScores(){
    highscores = JSON.parse(localStorage.getItem("highscores"));
    console.log(highscores);
    if(!highscores){
        highscores = [];
        return(highscores);
    }
    else{
        return(highscores);
    }
}

function showScores(){
    getScores();
        for (s=0; s<highscores.length; s++){
            var scoreInitials = highscores[s].initials;
            var scoreSaved = highscores[s].score;
            var scoreEntry = document.createElement("li");
            scoreEntry.textContent = scoreInitials + " - " + scoreSaved; 
            leaderBoard.appendChild(scoreEntry);
        }
    navbar.style.visibility = "hidden";
    hr.style.visibility = "hidden";
    intro.style.display = "none";
    questions.style.display = "none";
    result.style.display = "none";
    scores.style.display = "block";
}

function startTimer (secondsLeft){
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = secondsLeft; 
        score.textContent = secondsLeft; 
        if(secondsLeft === 0) {
            score.textContent = "0";
            clearInterval(timerInterval);
            showFinalResults();
            return;
        }
    }, 1000);
}

viewScores.addEventListener("click", function(event){
    event.preventDefault();
    clearInterval(timerInterval);
    showScores();
})

start.addEventListener("click", function (event){
    event.preventDefault();
    getScores();
    getQuestion();
    intro.style.display = "none";
    questions.style.display = "block";
    timeDisplay.textContent = secondsLeft;
    startTimer(secondsLeft);
})

buttons.addEventListener("click", function (event){
    if(event.target.matches("button")){
        event.preventDefault();
        guess = event.target.value;
        checkAnswer(guess);
    }
})

submitBtn.addEventListener("click", function (event){
    event.preventDefault();
    userInitials = initials.value.trim();
    console.log(userInitials);
    userScore = secondsLeft;
    console.log(userScore);
    var newScore = {"initials": userInitials, "score": userScore};
    highscores.push(newScore);
    highscores.sort(function(a, b){return(b.score-a.score)});
    console.log("HighScores: " + highscores);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    showScores();
})

backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
})

clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.removeItem("highscores");
    while(leaderBoard.firstChild){
        leaderBoard.removeChild(leaderBoard.lastChild);
    }
})

