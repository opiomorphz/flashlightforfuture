angular.module("personaApp")
.directive('questionPage', function() {
	return {
		restrict: 'E',
		templateUrl:'/templates/quiz/questionPage/questionPage.html'
	};
});