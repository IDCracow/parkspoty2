'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ResetPasswordCtrl', function ($scope, fetchUser) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $scope.sendResetEmail = function() {                                
        fetchUser.resetPassword($scope.resetPasswordEmail);
    }
});
