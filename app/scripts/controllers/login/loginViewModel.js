angular.module('parkspotyappApp')
    .factory('loginViewModel', function($location, fetchUser) {

    var LoginAPI = function() {};

    LoginAPI.prototype.logIn = function(form){
        var self = this;
        fetchUser.isVerified(form.username).then(function(result) {
            if (result) {
                fetchUser.logIn(form.username, form.password).then(function(user) {
                    self.goToUserProfile();
                });
            }
        });
    }

    LoginAPI.prototype.currentUser = function() {
        fetchUser.userData();
    };
    LoginAPI.prototype.isLoggedIn = function() {
        fetchUser.isLoggedIn();
    };
    LoginAPI.prototype.goToUserProfile = function() {
        $location.path('/user/profile');
    };

    return new LoginAPI();
});