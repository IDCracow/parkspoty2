'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.fetchUser
 * @description
 * # fetchUser
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('fetchUser', function ($location, $q) {

    var currUser;
    var isLogged;

    return {
        userData: function () {
            if(!angular.isDefined(currUser)) {
                currUser = Parse.User.current();
            }
            return currUser;
        },
        setUser: function(user) {
            currUser = user;    
        },
        isLoggedIn: function() {
            if (currUser) {
                isLogged = true;
            } else {
                isLogged = false;
            }
            return isLogged;
        },
        logOut: function() {
            Parse.User.logOut();
            currUser = null;
            $location.path('#/');
        },
        userFirstName: function() {
            return currUser.get('username');
        },
        resetPassword: function(email) {
            Parse.User.requestPasswordReset(email, {
                success: function() {
                    // Password reset request was sent successfully
                    console.log('email sent');
                },
                error: function(error) {
                    // Show the error message somewhere
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },
        
        // save user data after setting properites
        saveUserData : function () {
            currUser.save(null, {
              success: function(user) {
                // TODO
                // - show notification in UI  (also error message)                
              },
              error: function(error) {
                    // Show the error message somewhere
                    alert("Error: " + error.code + " " + error.message);
              }
            });
        },
        
        // tickets left = avaiable (12 per year)
        getTicketsLeft : function() { 
            var q = $q.defer();
            Parse.User.current().fetch().then(function(user){
                q.resolve(user.get('ticketsLeft'));
            });
            return q.promise;
        },
        
        getAlertFreeSpotFlag : function() {
            return currUser.get('f_alertFreeSpot');
        },
        
        getAlertRowReminderFlag : function() {
            return currUser.get('f_alertRowReminder');
        },
        
        getActiveInDrawFlag : function() {
            return currUser.get('f_activeInDraw');
        },
        
        // setting flags        
        setAlertFreeSpotFlag : function(status) {
            currUser.set("f_alertFreeSpot", status);
            this.saveUserData();
        },
        
        setAlertRowReminderFlag : function(status) {
            currUser.set("f_alertRowReminder", status);
            return this.saveUserData();
        },
        
        setActiveInDrawFlag : function(status) {
            currUser.set("f_activeInDraw", status);
            return this.saveUserData();
        }
    };
});
