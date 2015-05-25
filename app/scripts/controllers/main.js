'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
  .controller('MainCtrl', function ($rootScope) {
    $rootScope.isViewLoading = false;
    // loading animation
    $rootScope.setLoading = function() {
        $rootScope.isViewLoading = true;
    };
    $rootScope.unsetLoading = function() {
        $rootScope.isViewLoading = false;
    };
  });
