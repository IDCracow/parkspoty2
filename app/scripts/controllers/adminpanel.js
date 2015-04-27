'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AdminpanelCtrl
 * @description
 * # AdminpanelCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('AdminpanelCtrl', function ($scope, Reservation) {
    
    Reservation.generateDrawTable().then(function(data){
        $scope.drawTable = data;
        console.log($scope.drawTable);
    });
  });
