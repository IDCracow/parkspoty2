angular.module('parkspotyappApp')
    .factory('registerViewModel', function($location, user) {

    var RegisterAPI = function() {};

    RegisterAPI.prototype.signUp = function(form) {
        var self = this;
        user.signUp(form).then(function(user) {
            self.goToLoginPage();
        }, function(error) {
            switch(error.code) {
                case 142:
                    self.formError = error.message;
                    break;
                case -1:
                    self.formError = error.message;
                    break;
                case 202: 
                    self.formError = error.message.substring(8); 
                    break;
                default: 
                    self.formError = 'Error occured. Please try again.';
                    break;
            }
        });
    };

    RegisterAPI.prototype.isLoggedIn = user.isLoggedIn();

    RegisterAPI.prototype.currentUser = function() {
        user.userData();
    };

    RegisterAPI.prototype.goToLoginPage = function() {
        $location.path('/user/login');
    };

    return new RegisterAPI();
});