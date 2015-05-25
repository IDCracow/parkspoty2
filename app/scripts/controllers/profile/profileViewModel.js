angular.module('parkspotyappApp')
    .factory('profileViewModel', function($location, user) {

    var ProfileAPI = function() {};

    ProfileAPI.prototype.currentUser = user.userData();
    ProfileAPI.prototype.firstName = user.userFirstName();
    ProfileAPI.prototype.currentSpot = user.userCurrentSpot();
   
    return new ProfileAPI();
});