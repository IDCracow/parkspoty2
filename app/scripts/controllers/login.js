'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('LoginCtrl', function($scope, $location) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $scope.currentUser = Parse.User.current();

    $scope.logIn = function(form) {
        Parse.User.logIn(form.username, form.password, {
            success: function(user) {
                $scope.currentUser = user;
                $scope.goToUserProfile();
                $scope.$apply();
            },
            error: function(user, error) {
                alert("Unable to log in: " + error.code + " " + error.message);
            }
        });

    };

    $scope.logOut = function(form) {
        Parse.User.logOut();
        $scope.currentUser = null;
    };

    $scope.goToUserProfile = function() {
        $location.path('/about');
        console.log($location);
    };
});