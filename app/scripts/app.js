'use strict';

/**
 * @ngdoc overview
 * @name parkspotyappApp
 * @description
 * # parkspotyappApp
 *
 * Main module of the application.
 */
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
      .when('/user/auth', {
        templateUrl: 'views/authorization.html',
        controller: 'AuthorizationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
