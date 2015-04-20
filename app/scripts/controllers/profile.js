'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('ProfileCtrl', function ($scope, fetchUser, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.currentUser = fetchUser.userData();
    $scope.username = fetchUser.userFirstName();
    
    if (!$scope.currentUser) {
        $location.path('#/user/login');
    };

    $scope.resetPassword = function() {
      console.log($scope.currentUser);
    }
  });
