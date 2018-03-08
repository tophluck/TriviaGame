var questions = {
    1: {
        text: "stuff",
        choices: ["1", "2", "3", "4"],
        correctOption: "1",
        correctText: "1"
    },
    2: {
        text: "stuff",
        choices: ["1", "2", "3", "4"],
        correctOption: "2",
        correctText: "2"
    },
    3: {
        text: "stuff",
        choices: ["1", "2", "3", "4"],
        correctOption: "3",
        correctText: "3"
    },
    4: {
        text: "stuff",
        choices: ["1", "2", "3", "4"],
        correctOption: "4",
        correctText: "4"
    }
};
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var currentQuestion = 0;
var timer = 30;
var intervalId;

function countdown() {
    timer--;
    $("#timeLeft").text(timer);
    if (timer === 0) {
        clearInterval(intervalId);
        unanswered++;
        $("#content").empty();
        var unansweredMessage = $("<p>");
        unansweredMessage.html("<p>Times up! The correct answer was " + questions[currentQuestion].correctText + "</p>");
        $("#content").append(unansweredMessage);
        currentQuestion++;
        setTimeout(function() {
            nextQuestion();
        }, 500); 
    };
}

function nextQuestion() {
    $("#content").empty();
    timer = 30;
    console.log(questions[currentQuestion]);
    if (questions[currentQuestion] == undefined) {
        var endContent = $("<div>");
        endContent.html("<h2>Results</h2><p>Correct Answers: " + correctAnswers + "</p><p>Incorrect Answers: " + incorrectAnswers + "</p><p>Unanswered Questions: " + unanswered + "</p><button class='btn btn-primary' id='start'>Play Again?</button>");
        $("#content").append(endContent);
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 0;
        currentQuestion = 0;
        $("#start").on("click", function() {
            currentQuestion++;
            nextQuestion();
        })
    } else {
        var questionContent = $("<div>");
        questionContent.html("<p>Time Remaining: <span id='timeLeft'>" + timer + "</span></p><h2>" + questions[currentQuestion].text + "</h2><ul style='list-style: none'><li id='1'>" + questions[currentQuestion].choices[0] + "</li><li id='2'>" + questions[currentQuestion].choices[1] + "</li><li id='3'>" + questions[currentQuestion].choices[2] + "</li><li id='4'>" + questions[currentQuestion].choices[3] + "</li></ul>")
        $("#content").append(questionContent);
        intervalId = setInterval(countdown, 100);
    }

};

function answered() {
    clearInterval(intervalId);
    if ($(this).attr("id") === questions[currentQuestion].correctOption) {
        correctAnswers++;
        $("#content").empty();
        var correctMessage = $("<p>");
        correctMessage.html("<p>Correct!</p>");
        $("#content").append(correctMessage);
        currentQuestion++;
        setTimeout(function() {
            nextQuestion();
        }, 5000);
    } else {
        incorrectAnswers++;
        $("#content").empty();
        var incorrectMessage = $("<p>");
        incorrectMessage.html("<p>Wrong! The correct answer was " + questions[currentQuestion].correctText + "</p>");
        $("#content").append(incorrectMessage);
        currentQuestion++;
        setTimeout(function() {
            nextQuestion();
        }, 5000);
    }
};

$("#start").on("click", function() {
    currentQuestion++;
    nextQuestion();
})