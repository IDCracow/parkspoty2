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

    AdminAPI.prototype.spots = [];
    AdminAPI.prototype.spotsRemoved = [];
    AdminAPI.prototype.editable = true;

    AdminAPI.prototype.getSpots = function() {
        Spot.getSpots().then(function(result) {
            AdminAPI.prototype.spots = [];
            AdminAPI.prototype.spotsRemoved = [];
            var spots = result;
            _.each(spots, function(item) {
                if (!item.attributes.f_removed) {
                    AdminAPI.prototype.spots.push(item);  
                } else {
                    AdminAPI.prototype.spotsRemoved.push(item);
                }
            });
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