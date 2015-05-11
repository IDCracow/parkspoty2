angular.module('parkspotyappApp')
    .factory('adminViewModel', function($location, user) {

    var AdminAPI = function() {};

    AdminAPI.prototype.isAdmin = function() {
        var self = this;
        
        user.isAdmin().then(function(result) {
            self.isAdmin = result;
        });

    }

    return new AdminAPI();
});