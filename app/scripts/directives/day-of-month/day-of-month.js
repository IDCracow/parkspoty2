'use strict';

/**
 * @ngdoc directive
 * @name parkspotyappApp.directive:dayOfMonth
 * @description
 * # dayOfMonth
 */
angular.module('parkspotyappApp')
    .directive('dayOfMonth', function () {

    function link(scope, element) {
        console.log(scope.day.day());
        if (scope.$index == 0) {
            element.addClass('days-from-left-'+scope.day.day() - 1);
        }
    };

    return {
        templateUrl: 'scripts/directives/day-of-month/day-of-month.html',
        restrict: 'E',
        link: link
    };
});
