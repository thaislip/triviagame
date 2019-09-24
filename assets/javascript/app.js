// initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//if time is up, go to next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if(isQuestionOver) {
            console.log('game is over');
            displayResult();
    }
    else {
        currentQuestion++;
        loadQuestion();
    }

}

//start 30 second timer for user to answer each question
function timeUp(){
    clearInterval(timer);

    lost++;

    preLoadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $("#timer").html("Timer: " + counter);

        if(counter === 0){
            timeUp();
        }
}

//display the question and choices together in browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choice = quizQuestions[currentQuestion].choices; //

    $("#timer").html("timer: " + counter);
    $("#game").html(`
    <h4>${question}</h4>
    ${loadChoices(choice )}
    ${questionRemaining()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

//if the user is correct/wrong choice selected, go to next question

$(document).on("click", ".choice", function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;


if(correctAnswer === selectedAnswer){
    score++;
    console.log('wins!');
    preLoadImage('win');
    setTimeout(nextQuestion, 3 * 1000);
} else{
    lost++;
    console.log('lost!');
    preLoadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
    }

});;
function displayResult(){
    const result = `
        <p>You got ${score} question(s) right</p>
        <p>You missed ${lost} question(s)</p>
        <p>Total questions ${quizQuestions.length} question(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}


$(document).on('click', '#reset', function() {
 counter = 5;
 currentQuestion = 0;
 score = 0;
 lost = 0;
 timer=null;

 loadQuestion();
    
});;

function questionRemaining(){
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1)
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images){
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}

//display image for right and wrong answers

function preLoadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
        <p class= "preload-image">Congrats! The force is strong with you!</p>
        <p class= "preload-image">The correct answer is <b>${correctAnswer}</b></p>
        <img src="${randomImage(winImages)}"/>
        `);
    } else {
        $('#game').html(`
        <p class= "preload-image">The correct answer was <b>${correctAnswer}</b></p>
        <p class= "preload-image">You lose!!!</p>
        <img src="${randomImage(lostImages)}"/>
    `)};

}


$('#start').click(function(){
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});