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
    'ngTouch'
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
      .otherwise({
        redirectTo: '/'
      });
  });
