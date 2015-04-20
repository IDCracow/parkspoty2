'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:headerctrlCtrl
 * @description
 * # headerctrlCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('headerCtrl', function ($scope, fetchUser) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $scope.userData = fetchUser.userData();
    $scope.isLoggedIn = fetchUser.isLoggedIn;
    $scope.logOut = fetchUser.logOut;
});
