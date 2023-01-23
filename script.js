var quizQuestions = [
    {
        question: "This is question 1",
        choices: ["answer 1 of 1", "answer 2 of 1", "answer 3 of 1"],
        correct: "answer 1 of 1"
    },
    {
        question: "This is question 2",
        choices: ["answer 1 of 2", "answer 2 of 2", "answer 3 of 2"],
        correct: "answer 2 of 2"
    },
    {
        question: "This is question 3",
        choices: ["answer 1 of 3", "answer 2 of 3", "answer 3 of 3"],
        correct: "answer 3 of 3"
    },
]

var startContainer = document.getElementById('start-container')
var startBtn = document.getElementById('start-btn')
var quizContainer = document.getElementById('quiz-container')
var timerEl = document.getElementById('timer')

var questionIndex = 0
var score = 0
var time = 100


startBtn.addEventListener('click', function () {
    startContainer.classList.add('hide')
    startTimer()
    startQuiz()
})

function startTimer() {
    timerEl.textContent = time
    var timerInterval = setInterval(function () {
        time--
        timerEl.textContent = time
        if (time === 0 || questionIndex > quizQuestions.length - 1) {
            clearInterval(timerInterval)
            endQuiz()
        }
    }, 1000)
}

function endQuiz() {
    console.log('quiz is over')

    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Name')

    var submitBtn = document.createElement('button')
    submitBtn.textContent = 'SUBMIT'

    quizContainer.append(input, submitBtn)

    submitBtn.addEventListener('click', function() {
        var userInfo = {
            name: input.value,
            finalScore: score
        }

        var storage = JSON.parse(localStorage.getItem('quizScores'))
        if(storage === null) {
            storage=[]
        }
        storage.push(userInfo)
        localStorage.setItem('quizScores', JSON.stringify(storage))

        window.location.href = 'highscore.html'
    })
}

function startQuiz() {
    quizContainer.textContent = ""

    if (questionIndex > quizQuestions.length - 1) {
        return
    }

    var questionEl = document.createElement('h2')
    questionEl.textContent = quizQuestions[questionIndex].question
    quizContainer.append(questionEl)

    for (var i = 0; i < quizQuestions[questionIndex].choices.length; i++) {
        var choicesBtn = document.createElement('button')
        choicesBtn.textContent = quizQuestions[questionIndex].choices[i]

        quizContainer.append(choicesBtn)

        choicesBtn.addEventListener("click", function (event) {
            if (event.target.textContent === quizQuestions[questionIndex].correct) {
                console.log('correct')
                score += 33
            } else {
                console.log('incorrect')
                time -= 20
            }
            questionIndex++
            startQuiz()
        })
    }
}