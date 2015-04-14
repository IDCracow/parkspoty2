'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:AuthorizationCtrl
 * @description
 * # AuthorizationCtrl
 * Controller of the parkspotyappApp
 */

Parse.initialize('JuVVAlf1pUV6J1zOLeVTuKDtS5Urwbwk4TN0vjGO','kOGCcuP6Y5LlBDmt5sBrJVkRv6X4fgTGGUyroomx');

angular.module('parkspotyappApp')
    .controller('AuthorizationCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
})
    .run(['$rootScope', function($scope) {
        $scope.scenario = 'Sign up';
        $scope.currentUser = Parse.User.current();

        $scope.signUp = function(form) {
            var user = new Parse.User();
            user.set("email", form.email);
            user.set("username", form.username);
            user.set("password", form.password);

            user.signUp(null, {
                success: function(user) {
                    $scope.currentUser = user;
                    $scope.$apply(); // Notify AngularJS to sync currentUser
                },
                error: function(user, error) {
                    alert("Unable to sign up:  " + error.code + " " + error.message);
                }
            });    
        };

        $scope.logIn = function(form) {
            Parse.User.logIn(form.username, form.password, {
                success: function(user) {
                    $scope.currentUser = user;
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
    }]);
