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
                    console.log('email sent');
                },
                error: function(error) {
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
        },
        isVerified: function(name) {
            var q = $q.defer();
            Parse.Cloud.run('isVerified', {'username':name}).then(function(result){
                q.resolve(result);
            });

            return q.promise;
        },
        logIn: function(name, pass) {
            var q = $q.defer();
            var self = this;
            Parse.User.logIn(name, pass, {
                success: function(user) {
                    self.setUser(user);
                    q.resolve(user);
                },
                error: function(error) {
                    q.reject(error)
                }
            });

            return q.promise;
        },
        signUp: function(form) {
            var q = $q.defer();
            var self = this;

            var user = new Parse.User();
            user.set("email", form.email);
            user.set("username", form.username);
            user.set("password", form.password);

            user.signUp(null, {
                success: function(user) {
                    self.setUser(user);
                    q.resolve(user);
                },
                error: function(user, error) {
                    alert("Unable to sign up:  " + error.code + " " + error.message);
                    q.reject(error);
                }
            });

            return q.promise;
        },
        resendVerificationEmail: function(username) {
            var q = $q.defer();

            Parse.Cloud.run('resendVerificationEmail', {'username':username}).then(function(result){
                q.resolve(result);
            });

            return q.promise;
        }
    };
});
