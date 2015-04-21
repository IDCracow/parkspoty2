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
    //defaults
    $scope.valTicketsLeft = 12;
    
    $scope.currentUser = fetchUser.userData();
    $scope.username = fetchUser.userFirstName();
    
    $scope.valFlagActiveInDraw = fetchUser.getActiveInDrawFlag();
    $scope.valFlagDrawRemider = fetchUser.getAlertRowReminderFlag();
    $scope.valFlagSpotNotifer = fetchUser.getAlertFreeSpotFlag();
    
    
    fetchUser.getTicketsLeft().then(function(data) { 
         $scope.valTicketsLeft = data;
    });
     
    $scope.changeFlagActiveInDraw = function () {
        fetchUser.setActiveInDrawFlag($scope.valFlagActiveInDraw);
    }
    
    $scope.changeFlagDrawRemider = function () {        
        fetchUser.setAlertRowReminderFlag($scope.valFlagDrawRemider);
    }
    
    $scope.changeFlagSpotNotifer = function () {        
        fetchUser.setAlertFreeSpotFlag($scope.valFlagSpotNotifer);
    }
    
  });
