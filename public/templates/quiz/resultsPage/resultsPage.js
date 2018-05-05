angular.module('personaApp')
.directive('resultsPage', function() {
    return {
        restrict: 'E',
        templateUrl:'/templates/quiz/resultsPage/resultsPage.html',
    };
});