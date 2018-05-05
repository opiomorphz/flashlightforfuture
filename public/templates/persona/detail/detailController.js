angular.module("personaApp")
.controller('detailController', function(detailService, $http){
    var ctrl = this;
    ctrl.current = 1;
    ctrl.previous = 0;
    ctrl.type = 1;

    ctrl.carouselImages = null;
    ctrl.dropdownData = null;
    ctrl.characteristicsData = null;
    ctrl.wingsData = null;
    ctrl.arrowData = null;
    ctrl.relationsData = null;
    ctrl.tipsData = null;
    ctrl.rightImages = null;
    ctrl.currentRelation = 1;

    ctrl.dropdownOpen = false;

    ctrl.relationNumberChecker = function(num) {
        var current = ctrl.currentRelation + num;
        current = current > 9 ? current - 9 : current < 1 ? current + 9 : current;
        return current;
    };

    ctrl.setRelationNumber = function(num) {
        ctrl.currentRelation = ctrl.relationNumberChecker(num);
    };

    ctrl.checkType = function() {
        if(ctrl.current == 1 ||
            ctrl.current == 8 ||
            ctrl.current == 9) {
            ctrl.type = 1;
    } 
    else if(ctrl.current == 2 ||
        ctrl.current == 3 ||
        ctrl.current == 4) {
        ctrl.type = 2;
}
else {
    ctrl.type = 3;
}
};

ctrl.loadAll = function(){
    $http.get('/assets/data/persona/dropdown.json').success(function(data) {
        ctrl.dropdownData = data;
    });

    $http.get('/assets/data/persona/characteristics.json').success(function(data) {
        ctrl.characteristicsData = data;
    });

    $http.get('/assets/data/persona/wings.json').success(function(data) {
        ctrl.wingsData = data;
    });

    $http.get('/assets/data/persona/arrow.json').success(function(data) {
        ctrl.arrowData = data;
    });

    $http.get('/assets/data/persona/relations.json').success(function(data){
        ctrl.relationsData = data;
    });

    $http.get('/assets/data/persona/relationRight.json').success(function(data){
        ctrl.rightImages = data;
    });

    // $http.get('/assets/data/persona/tips.json').success(function(data){
    //     ctrl.tipsData = data;
    // });

    $http.get('/assets/data/persona/carousel.json').success(function(data){
        ctrl.carouselImages = data;
    });
};

ctrl.moveDropdownToScreen = function() {
    var top = $(".dropdowner-button").offset().top;
    var scroll = $(window).scrollTop();
    var height = $(window).height();
    var desiredArea = scroll + height * 0.6;
    var maxArea = scroll + height;

console.log(desiredArea);
console.log(maxArea);
console.log(top);

    if(!ctrl.dropdownOpen &&
        top > desiredArea &&
        top <= maxArea) {
        $(document).duScrollTop(top - 60, 1000);
    ctrl.dropdownOpen = !ctrl.dropdownOpen;
    } else {
        ctrl.dropdownOpen = !ctrl.dropdownOpen;
    }
};


ctrl.shouldSlideInLeft = function(stat) {
    var result = false;
    if(ctrl.current === stat) {

        if((ctrl.previous === 9 && ctrl.current === 1)
            || ctrl.previous === 0) {
            result = false;
    } else if(stat < ctrl.previous 
        || (ctrl.previous == 1 && ctrl.current == 9)) {
        result = true;
    }
} else {
    result = false;
}
return result;
};

ctrl.shouldSlideInRight = function(stat) {
    var result = false;
    if(ctrl.current === stat) {

        if((ctrl.previous == 1 && ctrl.current == 9)
            || ctrl.previous === 0) {
            result = false;
    } else if(stat > ctrl.previous 
        || (ctrl.previous == 9 && ctrl.current == 1)) {
        result = true;
    }
} else {
    result = false;
}
return result;
};

ctrl.shouldSlideOutLeft = function(stat) {
    var result = false;
    if(ctrl.previous === stat) {

        if(ctrl.previous == 1 && ctrl.current == 9) {
            result = false;
        }
        else if(stat < ctrl.current 
            || (ctrl.previous == 9 && ctrl.current == 1)) {
            result = true; 
    }
} else {
    result = false;
}

return result;
};

ctrl.shouldSlideOutRight = function(stat) {
    var result = false;
    if(ctrl.previous === stat) {

        if(ctrl.previous == 9 && ctrl.current == 1) {
            result = false;
        }
        else if(stat > ctrl.current 
            || (ctrl.previous == 1 && ctrl.current == 9)
            ) {
            result = true;
    }
} else {
    result = false;
}

return result;
};

ctrl.checkNumber = function() {
    var x = detailService.getNumber();
    if(x) {
        ctrl.current = x;
        detailService.setNumber(null);
        document.title = "Tipe " + x + " \u2014" + " 9PERSONA";
    }
    else  {
        ctrl.current = 1;
        document.title = "Tipe 1" + " \u2014" + " 9PERSONA";
    }
};

ctrl.start = function() {
    ctrl.checkNumber();
    ctrl.checkType();
    ctrl.loadAll();
    ctrl.currentRelation = ctrl.current;

};

ctrl.doAnim = function() {
    $("#detail-content").addClass("animated fadeIn");
    window.setTimeout(function() {
        $("#detail-content").removeClass("animated fadeIn");
    }, 1000);
};

ctrl.update = function() {
    ctrl.checkType();
    ctrl.currentRelation = ctrl.current;
        //document.title = "Tipe " + ctrl.current + " \u2014" + " 9PERSONA";
    };

    ctrl.left = function() {
        ctrl.doAnim();
        var num = Number(ctrl.current);
        ctrl.previous = num;
        num = num === 1 ? 9 : num - 1;
        ctrl.current = num;
        ctrl.update();
        
        window.setTimeout(function() {

        }, 500);
    };

    ctrl.right = function() {
        ctrl.doAnim();
        var num = Number(ctrl.current);
        ctrl.previous = num;
        num = num === 9 ? 1 : num + 1;
        ctrl.current = num;
        ctrl.update();

        window.setTimeout(function() {

        }, 500);
    };

    ctrl.start();
});