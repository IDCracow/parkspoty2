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
                 _.each(users, function(user){  
                     for(var i = 0; i < user.attributes.ticketsLeft; i++) {
                        temporaryDrawTable.push(user.attributes.username);
                     }
                 }); 
                 return temporaryDrawTable;
            });            
        },
        
        // it will return array with winners (usernames)
        drawSpots : function (drawTable, avaiableParkSpots) {
            console.log('draw spots');
            var listOfWinners = [];
            for(var i = 0; i < avaiableParkSpots.length; i++) {  
                drawTable = _.shuffle(drawTable);
                var winner = _.first(drawTable);
                var spotname = avaiableParkSpots[i].attributes.spotname;
                listOfWinners.push({winner : winner, spotname: spotname});
                drawTable = _.without(drawTable, winner);                
            }
            return listOfWinners;
        },
        
        assignSpotToUser : function(listOfWinners) {
            // 1. save spot to user table in column 'spot'
            for(var i = 0; i < listOfWinners.length; i++) {
                var query = new Parse.Query(Parse.User);
                query.equalTo("email", listOfWinners[i].winner);  // find all the women
                query.find({
                  success: function(user) {
                    user.set('spotCurrent', listOfWinners[i].spotname);
                    user.save(null, {
                      success: function(user) {
                        // TODO
                        // - show notification in UI  (also error message)                
                      },
                      error: function(error) {
                            // Show the error message somewhere
                            alert("Error: " + error.code + " " + error.message);
                      }
                    });
                  }
                });
            }
            // 2. add to reservation table
        },
        
        doDraw : function() { 
            var self = this; 
            
            console.log('do draw');
            Spot.getAvailbleSpotsForDrawing().then(function(data){
                self.availbleSpots = data;
                console.log(self.availbleSpots);
            })
            .then(this.generateDrawTable().then(function(drawTable){        
                 console.log('draw table', drawTable);
                 self.winners = self.drawSpots(drawTable, self.availbleSpots);
                 console.log('winners', self.winners);
            }))
            .then(function() {
                  console.log('add to database');
            });
        }
    }
    
  });
