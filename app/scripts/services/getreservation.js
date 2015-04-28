'use strict';


angular.module('parkspotyappApp')
    .service('getreservation', function () {
        return {
        getReservation: function (date) {
            
            var today = moment(date).hours(2).minute(0).seconds(0).milliseconds(0).toDate();
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
					query = new Parse.Query(Reservation);
					query.equalTo("date", today);

            query.find({
              success: function(results) {
                 return results;
              },
              error: function(error) {
              }
            });
        }
    };  
});
