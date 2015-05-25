'use strict';

angular.module('parkspotyappApp').directive('weatherInfo', function() {
    return {
        restrict: 'E', replace: true,
        controller: function($scope,weatherService) {
              weatherService.getWeather(function(data) {
                 $scope.weatherDataTemp = Math.round(data.main.temp);
                 $scope.weatherDataIcon = 'icon-' + data.weather[0].icon;
              });
        },
        template: "<div><span>Cracow,</span> <span>{{weatherDataTemp}}</span><span class='{{weatherDataIcon}}'></span></div>"
    };
});