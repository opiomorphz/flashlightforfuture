
function easeInOut(t) {
  return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;
}

angular.module("personaApp", ['ngRoute', 'ngAnimate', 'duScroll'])
.value('duScrollEasing', easeInOut)
.value('duScrollOffset', 30)
.value('duScrollBottomSpy', true)
.controller('AppController', function($rootScope, $location){
	var app = this;

  app.hideDropdown = function() {
    var needToHideDropdown = !$(".navbar-toggle").hasClass("collapsed");
    if(needToHideDropdown){
      $(".navbar-toggle").click();
    }
  };

  $(window).resize(function() {
    app.hideDropdown();
  });

  app.styleNavbar = function() {
    $('.navbar-fixed-top').css('background-color','rgba(248,248,248,0.6');

    $('.navbar-fixed-top').mouseover(function() {
      $(this).css('background-color','rgba(248,248,248,1');
    }).mouseout(function() {
      $('.navbar-fixed-top').css('background-color','rgba(248,248,248,0.6');
    });
  };

  $(window).scroll(function(event) {
    if ($(window).scrollTop() > 0) {
      $('.navbar-fixed-top').css('background-color','rgba(248,248,248,1');

         $('.navbar-fixed-top').mouseover(function() {
      $(this).css('background-color','rgba(248,248,248,1');
    }).mouseout(function() {
      $('.navbar-fixed-top').css('background-color','rgba(248,248,248,1');
    });

    } else {
      app.styleNavbar();
    }
  });

  app.styleNavbar();
})

.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    title: 'Home',
    animation: 'home-animation',
    templateUrl: '/templates/home/index.html'
  })

  .when('/quiz', {
    title: 'Quiz',
    animation: 'quiz-animation',
    templateUrl: '/templates/quiz/index.html'
  })

  .when('/persona', {
    title: 'Persona',
    animation: 'grid-animation',
    templateUrl: '/templates/persona/index.html'
  })

  .when('/persona/details', {
    title: 'Tipe',
    animation: 'detail-animation',
    templateUrl:'/templates/persona/detail/index.html'
  })

  .when('/about', {
    title: 'About',
    animation: 'about-animation',
    templateUrl: '/templates/about/index.html'
  })

  .when('/download', {
    title: 'Download',
    animation: 'download-animation',
    templateUrl: '/templates/download/index.html'
  })

  .otherwise({
    redirectTo: '/'
  });
})

.run(['$location', '$rootScope', function($location, $rootScope) {
  $rootScope.$on('$routeChangeStart', function(event, current, previous){
    $rootScope.animation = current.animation;
  });


  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    if (current.hasOwnProperty('$$route')) {
      $rootScope.title = current.$$route.title;
    }

    $(document).duScrollTop(0, 1100);
  });
}]);