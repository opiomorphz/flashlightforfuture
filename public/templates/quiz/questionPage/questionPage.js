angular.module("flashlightForFutureApp")
.directive('questionPage', function() {
	return {
		restrict: 'E',
		templateUrl:'/templates/quiz/questionPage/questionPage.html'
	};
});