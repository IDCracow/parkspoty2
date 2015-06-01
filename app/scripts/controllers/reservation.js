'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ReservationCtrl
 * @description
 * # ReservationCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('ReservationCtrl', function ($scope,reservation) {
       
      var today = moment();
      var tommorow = moment().add(1,"days");
      var d = new Date("April 28, 2015 00:00:00");
       
      reservation.getReservation(d).then(function(data) {
      });
});
