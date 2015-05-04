angular.module('parkspotyappApp')
    .factory('registerViewModel', function($location, user) {

    var RegisterAPI = function() {};

    RegisterAPI.prototype.signUp = function(form) {
        var self = this;
        user.signUp(form).then(function(user) {
            self.goToLoginPage();
        }); 
    };

    RegisterAPI.prototype.currentUser = function() {
        user.userData();
    };

    RegisterAPI.prototype.goToLoginPage = function() {
        $location.path('/user/login');
    };

    return new RegisterAPI();
});