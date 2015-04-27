'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.Reservation
 * @description
 * # Reservation
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
  .service('Reservation', function (fetchUser, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var drawTable = []; //table which contains users with prepared importance
    
    return {
        generateDrawTable : function () {
            return fetchUser.getAllUsersForDraw().then(function(data) {  
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
        drawSpots : function (drawTable, nrAvaiableParkSpots) {
            var listOfWinners = [];
            for(var i = 0; i < nrAvaiableParkSpots; i++) {                
                _.shuffle(drawTable);
                var winner = _.first(drawTable);
                listOfWinners.push(winner);
                drawTable = _.without(drawTable, winner);                
            }
            return listOfWinners;
        }
    }
    
  });
