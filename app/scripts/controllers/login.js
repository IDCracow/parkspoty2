'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('LoginCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
})
    .run(['$rootScope', function($scope) {
        $scope.currentUser = Parse.User.current();

        $scope.logIn = function(form) {
            Parse.User.logIn(form.username, form.password, {
                success: function(user) {
                    $scope.currentUser = user;
                    $scope.$apply();
                    console.log($scope.currentUser);
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
    }]);