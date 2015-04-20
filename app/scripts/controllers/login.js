'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('LoginCtrl', function($scope, $location, fetchUser) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $scope.currentUser = fetchUser.userData();
    $scope.isLoggedIn = fetchUser.isLoggedIn();
    
    $scope.logIn = function(form) {
        Parse.User.logIn(form.username, form.password, {
            success: function(user) {
                fetchUser.setUser(user);
                $scope.currentUser = fetchUser.userData();
                $scope.goToUserProfile();
                $scope.$apply();
            },
            error: function(user, error) {
                alert("Unable to log in: " + error.code + " " + error.message);
            }
        });
    };

    $scope.goToUserProfile = function() {
        $location.path('/user/profile');
    };
});