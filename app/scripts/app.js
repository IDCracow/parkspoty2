'use strict';

/**
 * @ngdoc overview
 * @name parkspotyappApp
 * @description
 * # parkspotyappApp
 *
 * Main module of the application.
 */


Parse.initialize('PEzsT2NgVjzwkHt2HDXMSYix5viGNIC9bsJxKtTa','3eaL1UsGbIpccAFF7WVfoEMTMVXZkFgQ5RAUsi2G');

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
        .when('/user/reset-password', {
        templateUrl: 'views/reset_password.html',
        controller: 'ResetPasswordCtrl'
    })
        .when('/adminpanel', {
          templateUrl: 'views/adminpanel.html',
          controller: 'AdminpanelCtrl'
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
            if (next.templateUrl != "views/login.html" && next.templateUrl != "views/register.html" && next.templateUrl != "views/main.html" && next.templateUrl != "views/reset_password.html") {
                $location.path("/user/login");
            }
        }
    });
});
