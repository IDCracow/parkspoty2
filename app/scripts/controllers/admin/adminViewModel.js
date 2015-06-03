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

    AdminAPI.prototype.send = function(keyVal) {
        notification.sendNotification(keyVal).then(function(result) {
            console.log(result);
        });
    };

    return new AdminAPI();
});