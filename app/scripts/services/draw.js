'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.Draw
 * @description
 * # Draw
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
  .service('Draw', function ($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    return {
        setDraw : function (listOfWinners, month, year) {
            var q = $q.defer();
            
            for(var i = 0; i < listOfWinners.length; i++) {
                        
                var Draw = Parse.Object.extend("Draw");
                var draw = new Draw();
                
                var User = Parse.Object.extend("User");
                var user = new User();
                user.id = listOfWinners[i].winner.userId;
                
                var Spot = Parse.Object.extend("Spot");
                var spot = new Spot();
                spot.id = listOfWinners[i].spot.spotId;

                draw.set("username", listOfWinners[i].winner.username);
                draw.set("userId", user);
                draw.set("spotId", spot);
                draw.set("spot", listOfWinners[i].spot.spotname);
                draw.set("year", year);
                draw.set("month", month);
                    
                draw.save({
                  success: function(draw) {
                    // Execute any logic that should take place after the object is saved.
                    q.resolve(draw);
                  },
                  error: function(draw, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                  }
                });
            }
             
            return q.promise;
        },
        
        getDrawsInMonth : function (month, year) {            
            var Draw = Parse.Object.extend('Draw');
            var query = new Parse.Query(Draw);
             
			query.equalTo("month", month);
			query.equalTo("year", year);

            var q = $q.defer();
            query.find().then(function(results){ 
                q.resolve(results);
            });
            return q.promise; 
        },
        
        getDrawMonths : function () {
            var _self = this;
            
            var previousMonth = false;
            var currentMonth = false;
            var nextMonth = false;
            
            var d = new Date();
            var currentMonthN = d.getMonth() + 1;
            var currentYearN = d.getFullYear();
            
            return _self.getDrawsInMonth(currentMonthN-1, currentYearN)
            .then(function(data) {
                if(data.length) {
                    previousMonth = true;
                }
                return _self.getDrawsInMonth(currentMonthN, currentYearN);
            })
            .then(function(data2){
                if(data2.length) {
                    previousMonth = currentMonth = true;   
                }
                return _self.getDrawsInMonth(currentMonthN+1, currentYearN);
            })
            .then(function(data3){
                if(data3.length){
                    previousMonth = currentMonth = nextMonth = true;
                }
                
                return {availableMonths : { previousMonth, currentMonth, nextMonth }};
            });
        }
    }
  });
