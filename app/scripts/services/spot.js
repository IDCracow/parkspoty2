'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.Spot
 * @description
 * # Spot
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('Spot', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
        getAvailbleSpotsForDrawing : function() {
            var q = $q.defer();

            var Spot = Parse.Object.extend('Spot');
            var query = new Parse.Query(Spot);

            query.equalTo('f_emergency', false);

            query.find({
                success: function(results) {
                    q.resolve(results);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
            return q.promise;
        },
        //spots CRUD
        getSpots : function() {
            var q = $q.defer();

            Parse.Cloud.run('getSpots').then( function(result) {
                q.resolve(result);
            });

            return q.promise;
        },
        createSpot : function(spotName, isOutside, isEmergency) {
            var q = $q.defer();

            Parse.Cloud.run('createSpot', {spotname: spotName, outside: isOutside, emergency: isEmergency}).then( function(result) {
                q.resolve(result);
            });

            return q.promise;
        },
        removeSpot : function(spotId) {
            var q = $q.defer();

            Parse.Cloud.run('removeSpot', {spotId: spotId}).then( function(result) {
                q.resolve(result);
            });

            return q.promise;
        },
        updateSpot : function(spotId, spotName, isOutside, isEmergency) {
            var q = $q.defer();

            Parse.Cloud.run('updateSpot', {spotId: spotId, spotname: spotName, outside: isOutside, emergency: isEmergency}).then( function(result) {
                q.resolve(result);
            });

            return q.promise;
        }
    };
});
