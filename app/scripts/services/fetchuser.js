'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.fetchUser
 * @description
 * # fetchUser
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('fetchUser', function ($location) {

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
        }
    };
});