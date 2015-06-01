'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('AboutCtrl', function ($scope,weatherService,Reservation) {
    $scope.takeSpot = function() {
        Reservation.takeSpot('oYOVt1P6IW','Xh5vWw0S45',false,21,6,2015);
    }
    
    $scope.releaseSpot = function() {
        Reservation.releaseSpot('KzoKCejPuZ');
    }
    
    $scope.getReservation = function() {
        Reservation.getReservation(21,6,2015).then(function(data) {
          console.log(data);
        });
    }
      
    
        
  });
