'use strict';

angular.module('parkspotyappApp').directive('adminMenu', function(adminViewModel) {
    return {
        restrict: 'E', 
        replace: true,
        controller: function($scope) {
        },
        link: function($scope, element) {
             
        },
        templateUrl: "/scripts/directives/adminMenu/adminMenu.html",
    };
});
