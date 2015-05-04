angular.module('parkspotyappApp')
    .factory('loginViewModel', function($location, user) {

    var LoginAPI = function() {};

    LoginAPI.prototype.toggleVerified = false;

    LoginAPI.prototype.logIn = function(form){
        var self = this;

        user.isVerified(form.username).then(function(result) {
            if (result) {
                user.logIn(form.username, form.password).then(function(user) {
                    self.goToUserProfile();
                });
            } else {
                self.toggleVerified = true;
            }
        });
    };

    LoginAPI.prototype.currentUser = function() {
        user.userData();
    };
    LoginAPI.prototype.isLoggedIn = function() {
        user.isLoggedIn();
    };
    LoginAPI.prototype.goToUserProfile = function() {
        $location.path('/user/profile');
    };
    LoginAPI.prototype.resendVerificationEmail = function(form) {
        var self = this;

        user.resendVerificationEmail(form).then(function(result) {
            console.log(result);
        });
    }

    return new LoginAPI();
});