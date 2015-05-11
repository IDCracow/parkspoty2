angular.module('parkspotyappApp')
    .factory('headerViewModel', function($location, user) {

    var HeaderAPI = function() {};

    HeaderAPI.prototype.userData = user.userData();
    HeaderAPI.prototype.isLoggedIn = user.isLoggedIn;
    HeaderAPI.prototype.logOut = user.logOut;
    
    return new HeaderAPI();
});