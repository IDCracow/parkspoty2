angular.module('parkspotyappApp')
    .factory('profileViewModel', function($location, user) {

    var ProfileAPI = function() {};

    ProfileAPI.prototype.currentUser = user.userData();
    ProfileAPI.prototype.username = user.userFirstName();
   
    return new ProfileAPI();
});