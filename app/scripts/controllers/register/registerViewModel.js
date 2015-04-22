angular.module('parkspotyappApp')
    .factory('registerViewModel', function($location, fetchUser) {

    var RegisterAPI = function() {};

    RegisterAPI.prototype.signUp = function(form) {
        var self = this;
        fetchUser.signUp(form).then(function(user) {
            self.goToLoginPage();
        }); 
    };

    RegisterAPI.prototype.currentUser = function() {
        fetchUser.userData();
    };

    RegisterAPI.prototype.goToLoginPage = function() {
        $location.path('/user/login');
    };

    return new RegisterAPI();
});