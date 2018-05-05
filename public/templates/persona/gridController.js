angular.module("personaApp")
.controller('gridController', ['detailService', function(detailService) {
    var ctrl = this;

    ctrl.callToSetNumber = function(num) {
        detailService.setNumber(num);
    };
}]);