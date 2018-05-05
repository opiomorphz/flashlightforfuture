angular.module("personaApp")
.service('detailService', function() {
    var number = 0;

    var getNumber = function() {
        return number;
    }

    var setNumber = function(num) {
        number = num;
    }

    return {
        getNumber: getNumber,
        setNumber: setNumber
    };
});