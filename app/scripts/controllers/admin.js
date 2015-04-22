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
 
    fetchUser.isAdmin().then(function(result) {
        $scope.isAdmin = result;
    });
    
});
