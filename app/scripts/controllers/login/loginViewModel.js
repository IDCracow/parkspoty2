angular.module('parkspotyappApp')
    .factory('loginViewModel', function($location, user, $rootScope) {

    var LoginAPI = function() {};

    LoginAPI.prototype.toggleVerified = false;
    LoginAPI.prototype.resentEmail = false;
    LoginAPI.prototype.errorMessage = false;

    LoginAPI.prototype.logIn = function(form) {
        var self = this;
        if (form && form.email && form.password) {
            user.isVerified(form.email).then(function(result) {
                if (result) {
                    user.logIn(form.email, form.password).then(function(result) {
                        $rootScope.unsetLoading();
                        self.errorMessage = false;
                        self.goToUserProfile();
                    }, function(error) {
                        var errorFirstLetterUppercase = error.substr(0, 1).toUpperCase() + error.substr(1);
                        self.errorMessage = errorFirstLetterUppercase;
                    });
                } else {
                    $rootScope.unsetLoading();
                    self.toggleVerified = true;
                }
            }, function(error) {
                $rootScope.unsetLoading();
                if (error == 141) {
                    self.errorMessage = 'No such user';
                } else {
                    self.errorMessage = false;
                    self.toggleVerified = true;
                }
            });
        } else {
            self.errorMessage = 'All fields are required';
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