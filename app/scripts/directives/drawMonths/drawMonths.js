'use strict';

angular.module('parkspotyappApp').directive('drawMonths', function(Draw) {
    return {
        restrict: 'E', 
        replace: true,
        controller: function($scope) {
            Draw.getDrawMonths().then(function(result){
                console.log(result);
            });
            
            $scope.availableMonths = null;
        },
        templateUrl: "/scripts/directives/drawMonths/drawMonths.html"
    };
});
