'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.fetchUser
 * @description
 * # fetchUser
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('fetchUser', function ($q, $location) {

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
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },
        isAdmin: function() {
            var q = $q.defer();
            Parse.Cloud.run('isAdmin').then(function(result){
                q.resolve(result);
            });
            
            return q.promise;
           // return Parse.Cloud.run('isAdmin');
        }
    };
});
