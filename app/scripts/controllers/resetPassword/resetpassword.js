'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('ResetPasswordCtrl', function ($scope, user, resetPasswordViewModel) {

    $scope.vm = resetPasswordViewModel;

});
