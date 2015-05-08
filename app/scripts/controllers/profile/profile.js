'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ProfileCtrl', function ($scope, profileViewModel) {

    $scope.vm = profileViewModel;
    
});
