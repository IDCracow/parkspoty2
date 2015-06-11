angular.module('parkspotyappApp')
    .factory('adminViewModel', function($location, user, Reservation, notification, Spot, Draw) {

    var AdminAPI = function() {};

    AdminAPI.prototype.isAdmin = function() {
        var self = this;

        user.isAdmin().then(function(result) {
            console.log(result);
            self.isAdmin = result;
        });

    }; 

    AdminAPI.prototype.drawSpots = function(month, year) {
        var self = this;
        Reservation.doDraw(month, year);
    };

    AdminAPI.prototype.spots = [];
    AdminAPI.prototype.editable = true;

    AdminAPI.prototype.getSpots = function() {
        Spot.getSpots().then(function(result) {
            AdminAPI.prototype.spots = result;
        });
    };

    AdminAPI.prototype.createSpot = function(newSpot) {
        if (newSpot.spotname) {
            Spot.createSpot(newSpot.spotname, newSpot.f_outside, newSpot.f_emergency).then(function(result) {
                AdminAPI.prototype.getSpots();
            });
        }
    };

    AdminAPI.prototype.removeSpot = function(spotId) {
        Spot.removeSpot(spotId).then(function(result) {
            AdminAPI.prototype.getSpots();
        });
    };

    AdminAPI.prototype.updateSpot = function(spotId, spot) {
        if (spot.spotname) {
            Spot.updateSpot(spotId, spot.spotname, spot.f_outside, spot.f_emergency).then(function(result) {
                AdminAPI.prototype.getSpots();
            });
        }
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