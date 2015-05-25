'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('LoginCtrl', function($scope, loginViewModel) {

    $scope.vm = loginViewModel;

});