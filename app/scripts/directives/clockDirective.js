'use strict';

angular.module('parkspotyappApp').directive('clock', function() {
    return {
        restrict: 'E', replace: true,
        controller: function($scope) {
            $scope.time = moment().format("HH:mm");
            $scope.season = moment().format("a");
        },
        template: "<div>{{time}} <sup>{{season}}</sup></div>"
    };
});
