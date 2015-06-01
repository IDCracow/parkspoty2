'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.Draw
 * @description
 * # Draw
 * Service in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
  .service('Draw', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    return {
        saveDraw : function () {
            var q = $q.defer();
            
            var Draw = Parse.Object.extend('Draw');
            var draw = Draw();

            draw.set("score", 1337);
            draw.set("playerName", "Sean Plott");
            draw.set("cheatMode", false);

            draw.save(null, {
              success: function(draw) {
                // Execute any logic that should take place after the object is saved.
                q.resolve(draw);
              },
              error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
              }
            });
             
            return q.promise;
        }
    }
  });
