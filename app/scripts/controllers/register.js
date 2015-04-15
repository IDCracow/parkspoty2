'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the parkspotyappApp
 */

angular.module('parkspotyappApp')
    .controller('RegisterCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    })
    .run(['$rootScope', function($scope) {
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

        $scope.logOut = function(form) {
            Parse.User.logOut();
            $scope.currentUser = null;
        };

    }]);
