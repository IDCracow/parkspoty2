'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ProfileCtrl', function ($scope, profileViewModel, Reservation) {

    $scope.vm = profileViewModel;
    $scope.items = [ 'one', 'one', 'one' ];
    var date = moment();
    $scope.date = date.format("dddd, Do MMMM");

    $scope.addPoint = function(item) {
      $scope.items.push(item);
      return false;
    },

    $scope.removePoint = function() {
      $scope.items.pop();
      return false;
    },

    $scope.clearPoints = function() {
      $scope.items = [];
    },

    $scope.next = function() {
      date.add(1, 'day');
      $scope.date = date.format("dddd, Do MMMM");
      $scope.clearPoints();

      Reservation.getReservationForDay(20,6,2015).then( function( result ) {
        
        result.forEach( function( item ) {
          $scope.addPoint(item.get('user'));
        })
      });
    },

    $scope.prev = function() {
        date.subtract(1, 'day');
        $scope.date = date.format("dddd, Do MMMM");
    }
});
