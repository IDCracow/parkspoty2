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
        var d = new Date("June 02, 2015 00:00:00");
        reservation.takespot('oYOVt1P6IW','Xh5vWw0S45',false,d);
    }
    $scope.releasespot = function() {
        reservation.releasespot('IB34XhmZjJ');
    }
        
  });
