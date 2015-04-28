'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ReservationCtrl
 * @description
 * # ReservationCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('ReservationCtrl', function ($scope,getreservation) {
       
      var today = moment();
      var tommorow = moment().add(1,"days");
    
      var registration = getreservation.getReservation(today);
        console.log(registration);
    
});
