'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('AdminCtrl', function ($scope, fetchUser) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
 
    $scope.itIsAdmin = fetchUser.isAdmin();
    console.log($scope.itIsAdmin);
});
