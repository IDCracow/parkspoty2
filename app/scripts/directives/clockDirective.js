angular.module('parkspotyappApp').directive('clock', function() {
    return {
        restrict: 'E', replace: true,
        controller: function($scope) {
            $scope.time = moment().format("HH:mm a");;
        },
        template: "<div>{{time}}</div>"
    };
});