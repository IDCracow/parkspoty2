'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the parkspotyappApp
 */

angular.module('parkspotyappApp')
    .controller('RegisterCtrl', function ($scope, registerViewModel) {

    $scope.vm = registerViewModel;

});
