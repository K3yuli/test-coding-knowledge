// questions
const  quizQuestions = [
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

// 

// click start and begin questions
var start = document.getElementById("startBtn")

// answering question incorrectly time is deducted from time


// when questions are done the quiz is over and or when the timer reaches 0


// when quiz over then user enters initials
var highScore = document.getElementById("highscore");