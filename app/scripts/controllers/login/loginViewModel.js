angular.module('parkspotyappApp')
    .factory('loginViewModel', function($location, user, $rootScope) {

    var LoginAPI = function() {};

    LoginAPI.prototype.toggleVerified = false;
    LoginAPI.prototype.resentEmail = false;
    LoginAPI.prototype.errorMessage = false;

    LoginAPI.prototype.logIn = function(form) {
        var self = this;
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
                self.errorMessage = false;
                self.toggleVerified = true;
            }
        }, function(error) {
            $rootScope.unsetLoading();
            self.errorMessage = 'No such user';
            self.toggleVerified = false;
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
    LoginAPI.prototype.resendVerificationEmail = function(email) {
        var self = this;
        user.resendVerificationEmail(email).then(function(result) {
            if (result) {
                self.resentEmail = true;
            }
        });
    };
    LoginAPI.prototype.sendNotificationFreeSpot = function(spotNumber, date) {
        user.sendNotificationFreeSpot(spotNumber, date).then(function(result) {
            if (result) {
                console.log(resul);
                //show some message   
            }
        });
    };
    
    return new LoginAPI();
});