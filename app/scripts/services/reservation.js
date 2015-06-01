'use strict';


angular.module('parkspotyappApp')
    .service('reservation', function ($q) {
        return {
        
           
    };  
});
'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.Reservation
 * @description
 * # Reservation
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
  .service('Reservation', function (user, Spot, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var drawTable = []; //table which contains users with prepared importance
    
    return {
        generateDrawTable : function () {
            return user.getAllUsersForDraw().then(function(data) {  
                 var temporaryDrawTable = [];
                 var users = data;
                //console.log('users frin getAllUsersForDraw', users);
                 _.each(users, function(user){  
                     for(var i = 0; i < user.attributes.ticketsLeft; i++) {
                        temporaryDrawTable.push(user.attributes.username);
                     }
                 }); 
                //console.log('temporaryDrawTable frin getAllUsersForDraw', temporaryDrawTable);
                return drawTable = temporaryDrawTable;
            });            
        },
        
        // it will return array with winners (usernames)
        drawSpots : function (drawTable, avaiableParkSpots) {
            var listOfWinners = [];
            for(var i = 0; i < avaiableParkSpots.length; i++) {  
                drawTable = _.shuffle(drawTable);
                var winner = _.first(drawTable);
                //console.log('winner', winner);
                var spotname = avaiableParkSpots[i].attributes.spotname;
                listOfWinners.push({winner : winner, spotname: spotname});
                drawTable = _.without(drawTable, winner);                
            }
            return listOfWinners;
        },
        
        assignSpotToUser : function(listOfWinners) {
            if(listOfWinners == undefined) {
                //console.log('undefined listofwinners');
                return;
            }
         
            
            // 1. save spot to user table in column 'spot'
            return Parse.Cloud.run('setCurrentSpotToUser', { 'listOfWinners' : listOfWinners}).then(function(result){
                //console.log(result);
            }); 
            
         
            // 2. add to reservation table
            
            // TODO Somewhere -> removing tickets -1
        },
        
        doDraw : function() { 
            var self = this; 
            
            Spot.getAvailbleSpotsForDrawing()
            .then(function(data){
                return self.availbleSpots = data;
            })
            .then(function() {
                return self.generateDrawTable();
            })
            .then(function(){     
                 return self.winners = self.drawSpots(drawTable, self.availbleSpots);
            })
            .then(function(){
                return self.clearAssignedSpots()
            })
            .then(function() {
                return self.assignSpotToUser(self.winners);
            });
        },
        
        clearAssignedSpots : function () {
            return Parse.Cloud.run('clearAssignedSpotsFromUsers');         
        },

        getReservationForDay: function (day,month,year) {
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
			query = new Parse.Query(Reservation);
			query.equalTo("day", day);
            query.equalTo("month", month);
            query.equalTo("year", year);

            var q = $q.defer();
            query.find().then(function(results){
                console.log(results);
                q.resolve(results);
            });
            return q.promise; 
        },
        
        getReservationForMonth: function (month,year) {
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
			query = new Parse.Query(Reservation);
            query.equalTo("month", month);
            query.equalTo("year", year);

            var q = $q.defer();
            query.find().then(function(results){
                console.log(results);
                q.resolve(results);
            });
            return q.promise; 
        },
        
        getReservationForYear: function (year) {
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
            
            var self = this,
			query = new Parse.Query(Reservation);
            query.equalTo("year", year);

            var q = $q.defer();
            query.find().then(function(results){
                console.log(results);
                q.resolve(results);
            });
            return q.promise; 
        },
        
        takeSpot: function (userId,spotId,femergency,day,month,year) {
             
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
            reservation.set("day", day);
            reservation.set("month", month);
            reservation.set("year", year);
            
            reservation.save({
              success: function() {
                console.log('spot taken');
              },
              error: function(error) {
              }
            });
            
        },
            
        releaseSpot: function(id) {
            
            var Reservation = Parse.Object.extend("Reservations");
            var query = new Parse.Query(Reservation);
        
			query.equalTo("objectId",id);

            query.find().then(function(myObj){
                return Parse.Object.destroyAll(myObj);
            });
        }
    };
    
  });
