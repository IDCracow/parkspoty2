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

    AdminAPI.prototype.spots;
    AdminAPI.prototype.editable = true;

    AdminAPI.prototype.getSpots = function() {
        Spot.getSpots().then(function(result) {
            AdminAPI.prototype.spots = result;
        });
    };

    AdminAPI.prototype.createSpot = function(spotName, isOutside, isEmergency) {
        Spot.createSpot(spotName, isOutside, isEmergency).then(function(result) {
            AdminAPI.prototype.getSpots();
        });
    };

    AdminAPI.prototype.removeSpot = function(spotName) {
        Spot.removeSpot(spotName).then(function(result) {
            AdminAPI.prototype.getSpots();
        });
    };

    AdminAPI.prototype.updateSpot = function(spot) {
        if (spot.f_outside == "true") {
            var outside = true;
        } else {
            var outside = false;
        };
        if (spot.f_emergency == "true") {
            var emergency = true;
        } else {
            var emergency = false;
        };
        Spot.updateSpot(spot.spotname, outside, emergency).then(function(result) {
            AdminAPI.prototype.getSpots();
        });
    };

    AdminAPI.prototype.editSpot = function(row) {
        var editingRow = angular.element(document.querySelector(row));
        var inputs = editingRow.find('input');
        _.each(inputs, function(input) {
            input.disabled = false; 
        });
    };

    return new AdminAPI();
});