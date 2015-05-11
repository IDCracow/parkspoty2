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
    
      var busySpots = [];
      getreservation.getReservation(today).then(function(data) {
          
         console.log(data.length); 
          console.log(data); 
           console.log(data[0].get('spot').id); 
        });
    
});
