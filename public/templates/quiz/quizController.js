angular.module("flashlightForFutureApp")
.controller('quizController', function(detailService, $http){
    var quiz = this;
    quiz.questionNumber = 0;
    quiz.gender = -1;

    quiz.questions = [];
    quiz.results = [];
    quiz.personalityCounters = [0,0,0,0,0,0,0,0,0];    
    quiz.highest = 0;

    quiz.discCounters = [0,0,0,0];

    quiz.callToSetNumber = function() {
        detailService.setNumber(quiz.highest + 1);
    };

    quiz.isGenderPage = function(){
        return quiz.questionNumber == 0;
    }

    quiz.isAvailForShow = function(colNo) {
      
        var isShow = true;
        var currentQuestion = quiz.questions[quiz.questionNumber -1 ];
        

        if(currentQuestion.length > (colNo + 1) ){
            isShow = false;
        }
        return isShow;
    };

    quiz.setGender = function(gender) {
        quiz.gender = gender;
        console.log("Successfully set gender to " + gender)
    }

    quiz.setAnswer = function(number) {
        var n = quiz.questions[quiz.questionNumber-1].points[number];
        quiz.discCounters[number]++;
        quiz.personalityCounters[n-1]++;

        var changeHighest = quiz.personalityCounters[n-1] >=
         quiz.personalityCounters[quiz.highest];

        if(changeHighest){
            quiz.highest = n-1;
        }
    };

    quiz.start = function(number) {

        quiz.setGender(number);

        $http.get('/assets/data/discData.json').success(function(data){
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
            $http.get('/assets/data/discResults.json').success(function(data){
                quiz.results = data;
                console.log("Successfully loaded " + quiz.results.length + " results");
            });
        }
    };

    quiz.getDiscResult = function() {
        
        var discResult = '';
        if(quiz.questionNumber >= 20){
            var D = quiz.discCounters[0];
            var I = quiz.discCounters[1];
            var S = quiz.discCounters[2];
            var C = quiz.discCounters[3];

            if(D > I && D > S && D > C){
                discResult = 'D';
            }
            else if(I > D && I > S && I > C){
                discResult = 'I';
            }
            else if(S > D && S > I && S > C){
                discResult = 'S';
            }
            else if(C > D && C > I && C > S){
                discResult = 'C';
            }
            else{
                var i = quiz.discCounters.indexOf(Math.max(quiz.discCounters));

                if(D == S)
                {
                    discResult = 'D';
                }
                else if(D == I)
                {
                    discResult = 'I';
                }
                else if(I == S)
                {
                    discResult = 'S';
                }
                else if(S == C)
                {
                    discResult = 'C';
                }
            }
            
        }   
        return discResult;
    };

    quiz.showInstruction = function() {
        $('#instructionModal').modal('show');
    }



    setTimeout(quiz.showInstruction, 1000);
});