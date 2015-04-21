'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('ProfileCtrl', function ($scope, fetchUser, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.currentUser = fetchUser.userData();
    $scope.username = fetchUser.userFirstName();
    
    
    $scope.changeFlagActiveInDraw = function () {
        console.log('safdasfas');
        fetchUser.setActiveInDrawFlag($scope.valFlagActiveInDraw);
    }
    
    $scope.changeFlagDrawRemider = function () {        
        fetchUser.setAlertRowReminderFlag($scope.valFlagDrawRemider);
    }
    
    $scope.changeFlagSpotNotifer = function () {        
        fetchUser.setAlertFreeSpotFlag($scope.valFlagSpotNotifer);
    }
  });
