'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('ProfileCtrl', function ($scope, fetchUser) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.currentUser = fetchUser.userData();
  });
