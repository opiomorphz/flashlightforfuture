angular.module("personaApp")
.controller('quizController', function(detailService, $http){
    var quiz = this;
    quiz.questionNumber = 0;
    quiz.gender = -1;

    quiz.questions = [];
    quiz.results = [];
    quiz.personalityCounters = [0,0,0,0,0,0,0,0,0];
    quiz.highest = 0;

    quiz.callToSetNumber = function() {
        detailService.setNumber(quiz.highest + 1);
    };

    quiz.isGenderPage = function(){
        return quiz.questionNumber == 0;
    }

    quiz.setGender = function(gender) {
        quiz.gender = gender;
        console.log("Successfully set gender to " + gender)
    }

    quiz.setAnswer = function(number) {
        var n = quiz.questions[quiz.questionNumber-1].points[number];
        quiz.personalityCounters[n-1]++;

        var changeHighest = quiz.personalityCounters[n-1] >=
         quiz.personalityCounters[quiz.highest];

        if(changeHighest){
            quiz.highest = n-1;
        }
    };

    quiz.start = function(number) {

        quiz.setGender(number);

        $http.get('/assets/data/quizData.json').success(function(data){
            quiz.questions = data;
            console.log("Successfully loaded " + quiz.questions.length + " questions");
            quiz.showNextQuestion();
        });
    };

    quiz.showNextQuestion = function() {
        console.log("In showNextQuestion");
        quiz.questionNumber++;
        console.log(quiz.questionNumber);
        if(quiz.questionNumber > quiz.questions.length){
            $http.get('/assets/data/quizResults.json').success(function(data){
                quiz.results = data;
                console.log("Successfully loaded " + quiz.results.length + " results");
            });
        }
    };

    quiz.showInstruction = function() {
        $('#instructionModal').modal('show');
    }

    setTimeout(quiz.showInstruction, 1000);
});