angular.module("flashlightForFutureApp")
.controller('gridController', ['detailService', function(detailService) {
    var ctrl = this;

    ctrl.callToSetNumber = function(num) {
        detailService.setNumber(num);
    };
}]);