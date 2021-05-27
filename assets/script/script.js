var inst = document.querySelector('.Instructions')
var startButton = document.querySelector('.start-button')
var timerEl = document.querySelector('.timerEl');


// Questions
var Question1 = 'Question 1: String values must be enclosed within ______ when being assigned to variables.'
var Question2 = 'Question 2: A very useful tool used during development and debugging for printing content to the debugger is:'
var Question3 = 'Question 3: Arrays in JavaScript can be used to store ______.'
var Question4 = 'Question 4: Commonly used data types DO NOT include:'
var Question5 = 'Question 5: The condition in an if/else statement is enclosed within ______.'
var allQuestions = [Question1, Question2, Question3, Question4, Question5]


// Answers to question 1
var q1a1 = 'Brackets';
var q1a2 = 'Parentheses';
var q1a3 = 'Quotations';
var q1a4 = 'Braces';
var q1Answers = [q1a1, q1a2, q1a3, q1a4];

// Answers to question 2
var q2a1 = 'console.log'
var q2a2 = 'print'
var q2a3 = 'console.WriteLine'
var q2a4 = 'println'
var q2Answers = [q2a1, q2a2, q2a3, q2a4];

// Answers to question 3
var q3a1 = 'Strings'
var q3a2 = 'Numbers'
var q3a3 = 'Other arrays'
var q3a4 = 'All of the answers'
var q3Answers = [q3a1, q3a2, q3a3, q3a4];

// Answers to question 4
var q4a1 = 'Functions'
var q4a2 = 'Boolean'
var q4a3 = 'Numbers'
var q4a4 = 'Strings'
var q4Answers = [q4a1, q4a2, q4a3, q4a4];

// Answers to question 5
var q5a1 = 'Brackets';
var q5a2 = 'Parentheses';
var q5a3 = 'Quotations';
var q5a4 = 'Braces';
var q5Answers = [q5a1, q5a2, q5a3, q5a4];

var qAnswers = [q1Answers, q2Answers, q3Answers, q4Answers, q5Answers];


var correct;
var incorrect;
var wrongAnswer;
var answerEl;


// function for start of quiz
function quizStart() {
    // removes instructions and start button
    inst.remove();
    startButton.remove();

    // timer
    var timeLeft = 60;
    timerEl.textContent = 'TIME START';
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            wrongAnswer.remove();
            questionEl.remove();
            for (let i = 0; i <= 2; i++) {
                answerEl.removeChild(document.querySelector('.incorrect'))
            }
            answerEl.removeChild(document.querySelector('.correct'))
            timerEl.textContent = 'Game Over';
            var replayButton = document.createElement('button');
            replayButton.textContent = ('Try Again')
            document.body.appendChild(replayButton);
            replayButton.addEventListener('click', function () {
                location.reload();
                return;
            })



        }
    },
        1000);

    // Creates element for question
    var questionNumber = 0;

    var questionEl = document.createElement('h3')

    document.body.appendChild(questionEl);

    function questionPopulate() {
        // Fills text based on index number of array of questions
        questionEl.textContent = allQuestions[questionNumber];

        answerEl = document.createElement('ul')
        answerEl.id = 'answerEl'
        document.body.appendChild(answerEl);
        // Populates answers in a list based on what question is showing
        if (questionNumber <= 4) {
            for (let j = 0; j < qAnswers[questionNumber].length; j++) {

                var li = document.createElement('li');
                li.textContent = qAnswers[questionNumber][j];
                answerEl.appendChild(li);
                li.classList.add('incorrect')

            }
        }

        // Gives class "incorrect" to incorrect answers and "correct" to correct answer
        if (questionNumber === 0) {
            var correctA = 2;
        } else if (questionNumber === 1 || questionNumber === 3) {
            var correctA = 0;
        } else if (questionNumber === 2) {
            var correctA = 3;
        } else if (questionNumber === 4) {
            var correctA = 1;
        }

        if (questionNumber <= 4) {
            var correctAnswer = answerEl.childNodes[correctA];
            correctAnswer.classList.replace('incorrect', 'correct');

        }

        correct = document.querySelector('.correct');
        incorrect = Array.from(document.querySelectorAll('.incorrect'));
        wrongAnswer = document.createElement('p');

        // Event listener for incorrect answers
        for (var i = 0; i < incorrect.length; i++) {
            incorrect[i].addEventListener('click', function () {
                wrongAnswer.remove();
                wrongAnswer.textContent = 'Wrong Answer!';
                wrongAnswer.style.color = 'red';
                document.body.appendChild(wrongAnswer);

                if (timeLeft > 10) {
                    timeLeft -= 10;
                } else {
                    timeLeft = 0;
                }

            })
        }
        // Event listener for correct answers

        if (questionNumber <= 4) {
            correct.addEventListener('click', function () {
                wrongAnswer.remove();
                answerEl.remove();
                questionNumber++;
                questionPopulate();

            })
            // win
        } else {
            clearInterval(timeInterval);
            timerEl.textContent = ("SCORE: " + timeLeft)
            var scoreButton = document.createElement('button');
            scoreButton.textContent = ('Score Board')
            document.body.appendChild(scoreButton);
            scoreButton.addEventListener('click', function () {
                location.href = "./assets/highscore.html"
                return;
            })
            // stores score in local storage
            localStorage.setItem('scoreCount', timeLeft)

        }

        return;
    }

    // Next question
    questionPopulate();

    return;

}

// event listener for start button that starts the game
startButton.addEventListener('click', function () {

    quizStart();


});