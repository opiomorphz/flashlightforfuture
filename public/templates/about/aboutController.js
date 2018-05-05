angular.module("personaApp")
.controller('aboutController', ['$scope', '$animate', function($scope, $animate){
    var ctrl = this;

    ctrl.status = 1;
    ctrl.previous = 0;

    ctrl.previousAnim = '';
    ctrl.currentAnim = '';

    ctrl.getStatus = function(stat) {
        return ctrl.status === stat;
    }

    ctrl.getPrevious = function(stat) {
        return ctrl.previous === stat;
    }

    ctrl.setStatus = function(stat) {
        ctrl.previous = ctrl.status;
        ctrl.status = stat;
    }

    ctrl.shouldFadeInLeft = function(stat) {
        var result = false;

        if(ctrl.getStatus(stat)){
            if(stat < ctrl.previous) {
                result = true;
            }
        } else {
            result = false;
        }
        return result;
    }

    ctrl.shouldFadeInRight = function(stat) {
        var result = false;

        if(ctrl.getStatus(stat)){
            if(stat > ctrl.previous) {
                result = true;
            }
        } else {
            result = false;
        }
        return result;
    }

    ctrl.shouldFadeOutLeft = function(stat) {
        var result = false;
        if(ctrl.getPrevious(stat)) {
            if(stat < ctrl.status) {
                result = true; 
            }
        } else {
            result = false;
        }
        
        return result;
    }
    
    ctrl.shouldFadeOutRight = function(stat) {
        var result = false;

        if(ctrl.getPrevious(stat)) {
            if(stat > ctrl.status) {
                result = true;
            }
        } else {
            result = false;
        }
        return result;
    }
/*
    function checkDocumentHeight(callback){
        var lastHeight = document.body.clientHeight, newHeight, timer;
        (function run(){
            newHeight = document.body.clientHeight;
            if( lastHeight != newHeight )
                callback();
            lastHeight = newHeight;
            timer = setTimeout(run, 200);
        })();
    }

    function doSomthing(){
        console.log('height changed');
    }

    checkDocumentHeight(doSomthing);
    */
}]);