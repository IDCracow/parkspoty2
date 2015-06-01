'use strict';


angular.module('parkspotyappApp')
    .service('reservation', function ($q) {
        return {
        getReservation: function (date) {
            
            var today = moment(date).hours(2).minute(0).seconds(0).milliseconds(0).toDate();
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
			query = new Parse.Query(Reservation);
			query.equalTo("date", today);

            var q = $q.defer();
            query.find().then(function(results){
                console.log(results);
                q.resolve(results);
            });
            return q.promise;
            
            
        },
        takespot: function (userId,spotId,femergency,date) {
            var today = moment(date).hours(2).minute(0).seconds(0).milliseconds(0).toDate();
            
            var Reservation = Parse.Object.extend("Reservations");
            var reservation = new Reservation();
            
            var Spot = Parse.Object.extend("Spot");
            var spot = new Spot();
            spot.id = spotId;
            
            var User = Parse.Object.extend("User");
            var user = new User();
            user.id = userId;

            reservation.set("userId", user);
            reservation.set("spot", spot);
            reservation.set("f_emergency", femergency);
            reservation.set("date", today);
            
            reservation.save({
              success: function(gameScore) {
                console.log('spot taken');
              },
              error: function(gameScore, error) {
              }
            });
            
        },
            
        releasespot: function(id) {
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
        
			query.equalTo("objectId",id);

            query.find().then(function(myObj){
                return Parse.Object.destroyAll(myObj);
            });
        }
           
    };  
});
