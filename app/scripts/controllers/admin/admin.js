'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('AdminCtrl', function ($scope, adminViewModel) {
 
    $scope.vm = adminViewModel;
    
});
