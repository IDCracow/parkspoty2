'use strict';

/**
 * @ngdoc overview
 * @name parkspotyappApp
 * @description
 * # parkspotyappApp
 *
 * Main module of the application.
 */


Parse.initialize('JuVVAlf1pUV6J1zOLeVTuKDtS5Urwbwk4TN0vjGO','kOGCcuP6Y5LlBDmt5sBrJVkRv6X4fgTGGUyroomx');

angular
    .module('parkspotyappApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'validation.match'
])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
        .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
        .when('/user/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
    })
        .when('/user/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
        .when('/user/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
})
    .run( function($rootScope, $location, fetchUser) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if (fetchUser.isLoggedIn() == false) {
            // no logged user, we should be going to #login
            if (next.templateUrl != "views/login.html" && next.templateUrl != "views/register.html" && next.templateUrl != "views/main.html") {
                $location.path("/user/login");
            }
        }         
    });
});
