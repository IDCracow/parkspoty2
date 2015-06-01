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

    $scope.addPoint = function() {
      $scope.items.push('one');
      return false;
    },

    $scope.removePoint = function() {
      $scope.items.pop();
      return false;
    },

    $scope.next = function() {
      date.add(1, 'day');
      $scope.date = date.format("dddd, Do MMMM");
      Reservation.getReservation('2015-06-02').then( function( result ) {
        console.log( result.toFullJSON() );

        result.forEach( function( item ) {
            console.log(item.toJSON());
        })
      });
    },

    $scope.prev = function() {
        date.subtract(1, 'day');
        $scope.date = date.format("dddd, Do MMMM");
    }
});
