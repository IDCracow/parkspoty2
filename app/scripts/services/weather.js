'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.fetchUser
 * @description
 * # fetchUser
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('weatherService', function ($http) {
        return {
            getWeather: function (callback) {
                var weather;
                $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=Krakow,pl&units=metric&callback=JSON_CALLBACK').
                  success(callback).
                  error(function(data, status, headers, config) {
                  });
              return weather;  
            }
        };
    });
