angular.module('parkspotyappApp')
    .factory('adminViewModel', function($location, user, Reservation, notification, Spot) {

    var AdminAPI = function() {};

    AdminAPI.prototype.isAdmin = function() {
        var self = this;

        user.isAdmin().then(function(result) {
            console.log(result);
            self.isAdmin = result;
        });

    }; 

    AdminAPI.prototype.drawSpots = function() {
        var self = this;
        Reservation.doDraw();
    };

    AdminAPI.prototype.getSpots = function() {
        var self = this;
        
        Spot.getSpots().then(function(result) {
            self.spots = result;
        });
    };

    AdminAPI.prototype.createSpot = function(spotName, isOutside, isEmergency) {
        Spot.createSpot(spotName, isOutside, isEmergency).then(function(result) {
            console.log(result); 
        });
    };

    AdminAPI.prototype.removeSpot = function(spotName) {
        Spot.removeSpot(spotName).then(function(result) {
            console.log(result); 
        });
    };

    AdminAPI.prototype.updateSpot = function(spotName, isOutside, isEmergency) {
        Spot.updateSpot(spotName, isOutside, isEmergency).then(function(result) {
            console.log(result); 
        });
    };

    return new AdminAPI();
});