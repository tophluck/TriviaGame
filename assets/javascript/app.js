var questions = {
    1: {
        text: "What is the name of the team based in Sacramento?",
        choices: ["The Kings", "The Pelicans", "The Hornets", "The Bucks"],
        correctOption: "1",
        correctText: "The Kings"
    },
    2: {
        text: "Who won the NBA Most Valueable Player award for the 2016-2017 season?",
        choices: ["Lebron James", "Russel Westbrook", "James Harden", "Joel Embiid"],
        correctOption: "2",
        correctText: "Russel Wesbrook"
    },
    3: {
        text: "Who is the all time leader in points scored?",
        choices: ["Micheal Jordan", "Kobe Bryant", "Kareem Abdul-Jabar", "Karl Malone"],
        correctOption: "3",
        correctText: "Kareem Abdul-Jabar"
    },
    4: {
        text: "Which current or former player has the best social media game?",
        choices: ["Kevin Durant", "Lebron James", "Charles Barkley", "Joel Embiid"],
        correctOption: "4",
        correctText: "Joel Embiid"
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
        unansweredMessage.html("<p>Times up! The correct answer is " + questions[currentQuestion].correctText + "</p>");
        $("#content").append(unansweredMessage);
        currentQuestion++;
        setTimeout(function() {
            nextQuestion();
        }, 5000); 
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
        });
    } else {
        var questionContent = $("<div>");
        questionContent.html("<p>Time Remaining: <span id='timeLeft'>" + timer + "</span></p><h2>" + questions[currentQuestion].text + "</h2><ul style='list-style: none'><li id='1'>" + questions[currentQuestion].choices[0] + "</li><li id='2'>" + questions[currentQuestion].choices[1] + "</li><li id='3'>" + questions[currentQuestion].choices[2] + "</li><li id='4'>" + questions[currentQuestion].choices[3] + "</li></ul>")
        $("#content").append(questionContent);
        intervalId = setInterval(countdown, 1000);
        $("li").on("click", function() {
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
                incorrectMessage.html("<p>Wrong! The correct answer is " + questions[currentQuestion].correctText + "</p>");
                $("#content").append(incorrectMessage);
                currentQuestion++;
                setTimeout(function() {
                    nextQuestion();
                }, 5000);
            };
        });
    }
}

$("#start").on("click", function() {
    currentQuestion++;
    nextQuestion();
});