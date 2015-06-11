'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.notification
 * @description
 * # notification
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('notification', function ($q) {
    return {
        //emails all users with flag f_alertFreeSpot
        sendNotificationFreeSpot: function(spotNumber, date) {
            var q = $q.defer();

            Parse.Cloud.run('sendNotificationFreeSpot', {spotNumber, date}).then(function(result) {
                q.resolve(result);
            });

            return q.promise;
        },
        /*
        keyVal should look like this: ({email: 'test@infusion.com', subject: 'tytulik wiadomosci', message: 'To jest wiadomosc do wpisania'})
        */
        sendNotification: function(keyVal) {
            var q = $q.defer();

            Parse.Cloud.run('sendNotification', {args: keyVal}).then(function(result) {
                q.resolve(result);
            });

            return q.promise;
        }
    };
});
