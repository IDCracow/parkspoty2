'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ResetPasswordCtrl', function ($scope, user) {

    $scope.resetEmailSent = false;
    
    $scope.sendResetEmail = function(email) {               
        Parse.User.requestPasswordReset(email, {
            success: function() {
                $scope.resetEmailSent = true;
                $scope.$apply();
            },
            error: function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
            }
        });
    }
});
