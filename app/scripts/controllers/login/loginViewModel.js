angular.module('parkspotyappApp')
    .factory('loginViewModel', function($location, user, $rootScope) {

    var LoginAPI = function() {};

    LoginAPI.prototype.toggleVerified = false;
    LoginAPI.prototype.resentEmail = false;

    LoginAPI.prototype.logIn = function(form) {
        if (form) {
            var self = this;
            user.isVerified(form.email).then(function(result) {
                if (result) {
                    user.logIn(form.email, form.password).then(function(user) {
                        $rootScope.unsetLoading();
                        self.goToUserProfile();
                    });
                } else {
                    $rootScope.unsetLoading();
                    self.toggleVerified = true;
                }
            });
        }
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
    LoginAPI.prototype.resendVerificationEmail = function(email) {
        var self = this;
        user.resendVerificationEmail(email).then(function(result) {
            if (result) {
                self.resentEmail = true;
            }
        });
    }

    return new LoginAPI();
});