angular.module('parkspotyappApp')
    .factory('profileViewModel', function($location, user) {

    var ProfileAPI = function() {};

    ProfileAPI.prototype.currentUser = user.userData();
    ProfileAPI.prototype.firstName = user.userFirstName();
    ProfileAPI.prototype.currentSpot = user.userCurrentSpot();
    ProfileAPI.prototype.valFlagDrawReminder = function() { 
        return user.getAlertDrawReminderFlag();
    };
    ProfileAPI.prototype.valFlagSpotNotifier = function() {
        return user.getAlertFreeSpotFlag();
    };

    ProfileAPI.prototype.changeFlagSpotNotifier = function(status) {
        user.setAlertFreeSpotFlag(status);
        ProfileAPI.prototype.valFlagDrawReminder;
    };

    ProfileAPI.prototype.changeFlagDrawReminder = function(status) {
        user.setAlertDrowReminderFlag(status);
        ProfileAPI.prototype.valFlagSpotNotifier;
    };

    return new ProfileAPI();
});