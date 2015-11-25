'use strict';

angular.module('parkspotyappApp').directive('dayPreview', function(Reservation) {
    return {
        restrict: 'E', 
        link: function($scope, element) {
            $scope.date = moment();


            $scope.next = function() {
              $scope.date.add(1, 'day');
              console.log($scope.date.get('d'));
              
              Reservation.getReservationForDay($scope.date.day(),$scope.date.month(),$scope.date.year()).then( function( result ) {
                result.forEach( function( item ) {
                  console.log(item.toJSON());
                })
              });
            },

            $scope.prev = function() {
                $scope.date.subtract(1, 'day');
            }
        },
        templateUrl: "/scripts/directives/dayPreview/dayPreview.html" 
    };
});
