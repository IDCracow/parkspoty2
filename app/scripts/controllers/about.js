'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('AboutCtrl', function ($scope,weatherService,reservation) {
    $scope.takespot = function() {
        reservation.takespot('oYOVt1P6IW','Xh5vWw0S45',false);
    }
    $scope.releasespot = function() {
        reservation.releasespot('Xh5vWw0S45');
    }
        
  });
