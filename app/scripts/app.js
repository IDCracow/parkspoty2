'use strict';

/**
 * @ngdoc overview
 * @name parkspotyappApp
 * @description
 * # parkspotyappApp
 *
 * Main module of the application.
 */

Parse.initialize('PEzsT2NgVjzwkHt2HDXMSYix5viGNIC9bsJxKtTa', '3eaL1UsGbIpccAFF7WVfoEMTMVXZkFgQ5RAUsi2G');

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
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
        .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl' 
    })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl' 
    })
        .when('/admin/spots', {
            templateUrl: 'views/admin/spots.html',
            controller: 'AdminCtrl' 
    })
        .when('/admin/tickets', {
            templateUrl: 'views/admin/tickets.html',
            controller: 'AdminCtrl' 
    })
        .when('/admin/dodraw', {
            templateUrl: 'views/admin/dodraw.html',
            controller: 'AdminCtrl' 
    })
        .when('/admin/draws', {
            templateUrl: 'views/admin/draws.html',
            controller: 'AdminCtrl' 
    })
        .when('/reservation', {
        templateUrl: 'views/reservation.html',
        controller: 'ReservationCtrl'
    }).otherwise({
        redirectTo: '/'
    });
})
    .run( function($rootScope, $location, user) {
    $rootScope.$on( '$routeChangeStart', function(event, next) {
        if (!user.isLoggedIn()) {
            if (next.templateUrl !== 'views/login.html' && next.templateUrl !== 'views/register.html' && next.templateUrl !== 'views/main.html' && next.templateUrl !== 'views/reset_password.html') {
                $location.path('/user/login');
            }
        } else {
            user.isAdmin().then(function(result) {
                if (!result && next.templateUrl == "views/admin.html") {
                    $location.path("/");
                }
            });
            if (next.templateUrl === 'views/login.html' || next.templateUrl === 'views/register.html') {
                $location.path('/user/profile');
            }
        }
    });
});
