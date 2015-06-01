'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ProfileCtrl', function ($scope, profileViewModel) {

    $scope.vm = profileViewModel;
    $scope.items = [ 'one', 'one', 'one' ];

    $scope.addPoint = function() {
      $scope.items.push('one');
      return false;
    },

    $scope.removePoint = function() {
      $scope.items.pop();
      return false;
    }
});
