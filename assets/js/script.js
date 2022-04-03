// questions
var  questions = [
    {
        question: "What is the proper use for camel casing?",
        options: ["PropertyText", "centerAlignText", "documentorientedLinks", "peoplelineHandler"],
        answer: "centerAlignText",
        
    },

    {
        question: "What type of data does an array store?",
        options: ["Strings", "Boolean values", "Objects", "All the above"],
        answer: "All the above",
        
    },

    {
        question: "What does 'JSON' stand for?",
        options: ["Java System Online Network", "JavaScript Object Network", "Joint System Object Notation", "JavaScript Object Notation"],
        answer: "JavaScript Object Notation",
        
    },

    {
        question: "True or False: The DOM is the same as the HTML",
        options: ["True", "False"],
        answer: "False",
       
    },
    {
        question: "How to write a comment in JavaScript?",
        options: ["<!-- comment -->", "// comment //", "/* comment */", "// comment // & /* comment */"],
        answer: "// comment // & /* comment */",
        
    },

    {
        question: "How to write HTML code dynamically using JavaScript",
        options: ["'.innerHTML='<h1></h1>'", ".HTML='<h1></h1>'", ".htmlInner='<h1></h1>'", ".'<h1></h1>'"],
        answer: "'.innerHTML='<h1></h1>'",
       
    }
]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// click start and begin questions
function start() {
    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        // when timer is below 0, end game
        if(timeLeft <= 0) {
            clearInterval(timer);
            endGame()
        }
    }, 1000);
    next();
}



// when questions are done the quiz is over and or when the timer reaches 0
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game Over</h2>
    <h3>You got ` + score + ` /100</h3>
    <h3>That means you got ` + score / 20 + ` questions correct</h3>
    <input type="text" id="initials" placeholder="Initials">
    <button onclick="setScore()">Set score</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// store scores
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreInitials", document.getElementById('initials').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreInitials") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>
    <button onclick="clearScore()">Clear Score</button>
    <button onclick="resetGame()">Play Again</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// clear scores
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreinitials", "");

    resetGame();
}

// reset game
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>Test Coding Knowledge!</h1>
    <h3>Click to Play</h3>
    <button onclick="start()">Start</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// deduct 15 sec from timer for incorrect answer
function incorrect() {
    timeLeft -= 15;
    next();
}
// increase score by 20 points for correct answer
function correct() {
    score += 20;
    next();
}

// loops through the questions
function next() {
    currentQuestion++;
    if(currentQuestion > quizQuestions.length - 1) {
        endGame();
        return;
    }
    var quizContent = "<h2>" + questions [currentQuestion].question + "</h2>"

    for(var buttonLoop = 0; buttonLoop < questions[currentQuestion].options.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[OPTIONS]</button>";
        buttonCode = buttonCode.replace("[OPTIONS]", questions[currentQuestion].options[buttonLoop]);
        if(questions[currentQuestion].options[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        }else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quizBody").innerHTML = quizContent;
}