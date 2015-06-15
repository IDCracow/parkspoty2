'use strict';

/**
 * @ngdoc directive
 * @name parkspotyappApp.directive:dayOfMonth
 * @description
 * # dayOfMonth
 */
angular.module('parkspotyappApp')
    .directive('dayOfMonth', function () {

    function link() {

    };

    return {
        template: '<div>{{$index + 1}}</div>',
        restrict: 'E',
        link: link
    };
});
