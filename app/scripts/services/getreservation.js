'use strict';


angular.module('parkspotyappApp')
    .service('getreservation', function ($q) {
        return {
        getReservation: function (date) {
            
            var today = moment(date).hours(2).minute(0).seconds(0).milliseconds(0).toDate();
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
					query = new Parse.Query(Reservation);
					query.equalTo("date", today);

            var q = $q.defer();
//            query.find({
//              success: function(results) {
//                 return results;
//              },
//              error: function(error) {
//              }
//            });
            
            query.find().then(function(results){
                q.resolve(results);
            });
            return q.promise;
        }
    };  
});
