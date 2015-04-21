angular.module('parkspotyappApp').directive('weatherTemp', function() {
    return {
        restrict: 'E', replace: true,
        controller: function($scope,weatherService) {
              weatherService.getWeather(function(data) {
                 $scope.weatherDataTemp = data.main.temp;
              });

        },
        template: '<div>{{weatherDataTemp}}</div>'
    };
});