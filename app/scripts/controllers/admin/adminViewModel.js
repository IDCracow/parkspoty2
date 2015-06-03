angular.module('parkspotyappApp')
    .factory('adminViewModel', function($location, user, Reservation, notification) {

    var AdminAPI = function() {};

    AdminAPI.prototype.isAdmin = function() {
        var self = this;

        user.isAdmin().then(function(result) {
            self.isAdmin = result;
        });

    }; 

    AdminAPI.prototype.drawSpots = function() {
        var self = this;
        Reservation.doDraw();
    };

    return new AdminAPI();
});