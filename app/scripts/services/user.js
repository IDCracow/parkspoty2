'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.user
 * @description
 * # user
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('user', function ($q, $location, $rootScope) {

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
            return currUser.get('firstName');
        },
        userLastName: function() {
            return currUser.get('lastName');
        },
        isAdmin: function() {
            $rootScope.setLoading();
            var q = $q.defer();
            Parse.Cloud.run('isAdmin').then(function(result){
                $rootScope.unsetLoading();
                q.resolve(result);
            });

            return q.promise;
        },
        isVerified: function(email) {
            $rootScope.setLoading();
            var q = $q.defer();
            Parse.Cloud.run('isVerified', {'email':email}).then(function(result){
                $rootScope.unsetLoading();
                q.resolve(result);
            });

            return q.promise;
        },
        logIn: function(email, pass) {
            $rootScope.setLoading();
            var q = $q.defer();
            var self = this;
            Parse.User.logIn(email, pass, {
                success: function(user) {
                    $rootScope.unsetLoading();
                    self.setUser(user);
                    q.resolve(user);
                },
                error: function(error) {
                    $rootScope.unsetLoading();
                    q.reject(error)
                }
            });

            return q.promise;
        },
        signUp: function(form) {
            if (form.email != '' && form.email != null && form.firstname != '' && form.firstname != null && form.lastname != '' && form.lastname != null && form.password != '' && form.password != null ) {
                $rootScope.setLoading();

                var q = $q.defer();
                var self = this;

                var user = new Parse.User();
                user.set("email", form.email);
                user.set("username", form.email);
                user.set("firstName", form.firstname);
                user.set("lastName", form.lastname);
                user.set("password", form.password);

                    user.signUp(null, {
                        success: function(user) {
                            $rootScope.unsetLoading();
                            self.setUser(user);
                            q.resolve(user);
                        },
                        error: function(user, error) {
                            $rootScope.unsetLoading();
                            q.reject(error);
                        }
                    })

                return q.promise;
            }
        },
        resendVerificationEmail: function(username) {
            $rootScope.setLoading();
            var q = $q.defer();

            Parse.Cloud.run('resendVerificationEmail', {'username':username}).then(function(result){
                $rootScope.unsetLoading();
                q.resolve(result);
            });

            return q.promise;
        }
    };
});
