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
            
            var Spot = Parse.Object.extend("Spot");
            var query = new Parse.Query(Spot);
            
            query.equalTo("f_emergency", false);
            
            query.find({
              success: function(results) {
                q.resolve(results);
              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
            return q.promise;
        }
    }
  });
