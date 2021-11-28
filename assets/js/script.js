// query selector
let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector(".progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answerDiv = document.querySelector("#answers");
let finished = document.querySelector("#finished");
let finalScore = document.querySelector("#finalScore");
let audioCorrect = document.querySelector("#audioCorrect");
let audioIncorrect = document.querySelector("#audioIncorrect");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighscoresBtn = document.querySelector("#clear HighscoresBtn");

// timer
let totalSeconds = 90;
let timeRemaining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswer = 0;
let correctScore = 0;
var localHighscoresArray = [];
let time = setInterval(time, 1000);
let justRegistered = false;
clearInterval(time);

// create questions
let  quizQuestions = [
    {
        question: "What is the proper use for camel casing?",
        options: ["PropertyText", "centerAlignText", "documentorientedLinks", "peoplelineHandler"],
        correct: 1,
        sound: ""
    },

    {
        question: "What type of data does an array store?",
        options: ["Strings", "Boolean values", "Objects", "All the above"],
        correct: 3,
        sound: ""
    },

    {
        question: "What does 'JSON' stand for?",
        options: ["Java System Online Network", "JavaScript Object Network", "Joint System Object Notation", "JavaScript Object Notation"],
        correct: 3,
        sound: ""
    },

    {
        question: "True or False: The DOM is the same as the HTML",
        options: ["True", "False"],
        correct: 1,
        sound: ""
    },
    {
        question: "How to write a comment in JavaScript?",
        options: ["<!-- comment -->", "// comment //", "/* comment */", "// comment // & /* comment */"],
        correct: 3,
        sound: ""
    },

    {
        question: "How to write HTML code dynamically using JavaScript",
        options: ["'.innerHTML='<h1></h1>'", ".HTML='<h1></h1>'", ".htmlInner='<h1></h1>'", ".'<h1></h1>'"],
        correct: 0,
        sound: ""
    }
];

// event management
startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);
submit.addEventListener("click", addToHighscores);
clearHighscoresBtn.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e){
    loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
    if(justRegistered) {
        init();

    }
});

// functions
function init() {
    timeSpan.textContent = timeRemaining;
    quiz.style.display = "none";
    finished.style.display = "none";
    assesFT.style.display = "none";
    intro.style.display = "block";
    startBtn.style.display = "block";
    progressBar.style.display = "none";

    totalSeconds = 90;
    timeRemaining = totalSeconds;
    secondsElapsed = 0;
    discountSeconds = 0;
    currentQuestion = 0;
    progress = 0;
    correctAnswer = 0;
    correctScore = 0;
    justRegistered = false;
    timeSpan.textContent = timeRemaining;

    if(localStorage.getItem("highscore")) {
        localHighscoresArray = localStorage.getItem("highscore").split(",");
    }
    clearInterval(time);
    updateProgress();

    finished.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
    submit.setAttribute("class", "btn btn-inf");
    progressBar.firstElementChild.setAttribute("class", "progress-bar bg-info progress-bar-striped progress-bar-animated");
}

function startQuiz() {
    intro.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "block";
    time = setInterval(time, 1000);
    progressBar.style.display = "block";
    showQuestion();
}

// add and subtract from timer here
function timer() {
    timeRemaining = totalSeconds - secondsElapsed - 1 - discountSeconds;
    timeSpan.textContent = timeRemaining;
    secondsElapsed++;
    if(timeRemaining <= 0) {
        clearInterval(time);
        disableQuestion();
        gameOver("time_out");
    }
}

function showQuestion() {
    question.textContent = quizArray[currentQuestion].question;
    var optionsBtnsArray = [];
    var indexArray = [];

    for(i = 0; i < quizArray[currentQuestion].option.length; i++) {
        var questionBtn = document.createElement("button");
        questionBtn.setAttribute("type", "button");
        questionBtn.setAttribute("class", "list-group-item list-group-item-action list-group-item-info mt-1 answerButton");
        questionBtn.setAttribute("data-index", i);
        if(i === 0) {
            questionBtn.setAttribute("correct", "yes");
        } else {
            questionBtn.setAttribute("correct", "no");
        }
        questionBtn.textContent = quizArray[currentQuestion].options[i];
        answerDiv.append(questionBtn);
        indexArray.push(i);
    }

    answerDiv.childNodes.forEach(function(child) {
        var rndIndex = Math.floor(Math.random() * indexArray.length);
        answerDiv.append(answerDiv.children[rndIndex]);
        indexArray.splice(rndIndex, 1);
    });
}

function disableQuestion() {
    let questionsAssed = document.querySelectorAll(".answerButton");
    questionsAssed.forEach(element => {
        element.setAttribute(
            "class",
            "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled"
            );
        if(
            parseInt(element.getAttribute("data-index")) === 
            quizArray[currentQuestion].correct
            ) {
            element.setAttribute(
                "class",
                "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
            );
        }
    });
}

function assesSelection(event) {
    if(event.target.matches("button")) {
        var index = parseInt(event.target.getAttribute("data-index"));
        var timeInterval = 1000;
        disableQuestions();
        if(event.target.getAttribute("correct") === "yes") {
            displayFTAlert(true);
            correctAnswer++;
        } else {
            discountSeconds -=5;
            clearInterval(time);
            time = setInterval(timer, 1000);
            displayFTAlert(false);
        }
        currentQuestion++;
        updateProgress();

        if(currentQuestion === quizArray.length) {
            timeInterval = 5000;
            gameOver("questions_done");
        } else {
            setTimeout(removeQuestionsButtons, 1000);
            setTimeout(showQuestion, 1001);
        }

        setTimeout(function() {
            assesFT.style.disableQuestion ="none";
        }, timeInterval);
    }
}

function updateProgress() {
    progress = Math.floor((currentQuestion / quizArray.length) * 100);
    var styleStr = String("width: " + progress + "%; height: 100%");
    progressBar.firstElementChild.setAttribute("style", styleStr);
    progressBar.firstElementChild.textContent = progress + "%";
    correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
}

function displayFTAlert(correct) {
    if(correct) {
        audioCorrect.play();
        assesFT.setAttribute(
            "class",
            "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
        );
        assesFT.innerHTML = "<strong>Correct</strong>";
        assesFT.style.display = "block";
    } else {
        audioIncorrect.play();
        assesFT.setAttribute(
            "class",
            "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
        );
        assesFT.innerHTML = 
        "<strong>Incorrect</strong> 5 secs. discounted!";
        assesFT.style.display = "block";
        timeSpan.style.color = "red";
        setTimeout(function() {
            timeSpan.style.color = "black";
        }, 1000);
    }
}

function removeQuestionsButtons() {
    questionH5.textContent = "";
    var child = answersDiv.lastElementChild;
    while(child) {
        answerDiv.removeChild(child);
        child = answerDiv.lastElementChild;
    }
}

function gameOver(cause) {
    if(cause === "question_done") {
        console.log("QUESTIONS DONE");
        setTimeout(() => {
            assesFT.setAttribute(
                "class",
                "alert alert-dark mt-0 pt-0 pb-0 text-center"
            );
            assesFT.innerHTML = "<strong>Quiz Finished</strong> Good Luck!";
        }, 1500);
        clearInterval(time);
    } else if (cause === "time_out") {
        console.log("TIME OUT");
        disableQuestions();
        audioIncorrect.play();
        setTimeout(() => {
            audioIncorrect.compareDocumentPosition();
        }, 4000);
        assesFT.innerHTML = "<strong>Time Finished</strong>";
    } else {
        return false;
    }
    assesFT.style.display = "block";
    if(correctScore >= 70) {
        setTimeout(() => {
            audioCorrect.play();
        }, 5000);
    } else {
        setTimeout(() => {
            audioIncorrect.play();
            allDone.firstElementChild.setAttribute(
                "class",
                "progress-bar bg-danger progress-bar-striped progress-bar-animated"
            );
            submit.setAttribute("class", "btn btn-danger");
        }, 500);
    }
    setTimeout(function() {
        finalScore.textContent = correctScore;
        quiz.style.display = "none";
        finished.style.display = "block";
        assesFT.style.display = "none";
        removeQuestionsButtons();
    }, 5000);
}

