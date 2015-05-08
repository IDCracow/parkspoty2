'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:headerctrlCtrl
 * @description
 * # headerctrlCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('headerCtrl', function ($scope, headerViewModel) {

    $scope.vm = headerViewModel;
    
});
