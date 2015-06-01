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
        userCurrentSpot: function() {
            return currUser.get('spotCurrent');
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
            }, function(error) {
                $rootScope.unsetLoading();
                q.reject(error);
            });

            return q.promise;
        },
        sendResetEmail: function(email) {     
            $rootScope.setLoading();
            var q = $q.defer();
            Parse.User.requestPasswordReset(email).then(function(result) {
                $rootScope.unsetLoading();
                q.resolve(result);
            }, function(error) {
                $rootScope.unsetLoading();
                q.reject(error.message);
            });

            return q.promise;
        },
        logIn: function(email, pass) {
            $rootScope.setLoading();
            var q = $q.defer();
            var self = this;
            Parse.User.logIn(email, pass).then(function(result) {
                $rootScope.unsetLoading();
                self.setUser(result);
                q.resolve(result);
            }, function(error) {
                $rootScope.unsetLoading();
                q.reject(error.message);
            });

            return q.promise;
        },
        signUp: function(form) {
            if (form.email !== '' && form.email !== null && form.firstname !== '' && form.firstname !== null && form.lastname !== '' && form.lastname !== null && form.password !== '' && form.password !== null ) {
                $rootScope.setLoading();

                var q = $q.defer();

                var user = new Parse.User();
                user.set('email', form.email);
                user.set('username', form.email);
                user.set('firstName', form.firstname);
                user.set('lastName', form.lastname);
                user.set('password', form.password);

                user.signUp(null, {
                    success: function(user) {
                        $rootScope.unsetLoading();
                        q.resolve(user);
                    },
                    error: function(user, error) {
                        $rootScope.unsetLoading();
                        q.reject(error);
                    }
                });

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
<<<<<<< HEAD
=======
        },
        mailMe: function(email) {
            var q = $q.defer();

            Parse.Cloud.run('mailMe', {'email':email}).then(function(result){
                q.resolve(result);
            }, function(error) {
                q.reject(error);   
            });

            return q.promise;
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
        
        getAllUsersForDraw : function() {
            var q = $q.defer();
            
            var User = Parse.Object.extend("User");
            var query = new Parse.Query(User);
            
            query.equalTo("f_activeInDraw", true);
            
            query.find({
              success: function(results) {
                q.resolve(results);
              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
            return q.promise;
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
>>>>>>> AdminPanel
        }
        
    };
});
