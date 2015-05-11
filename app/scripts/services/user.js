'use strict';

/**
 * @ngdoc service
 * @name parkspotyappApp.user
 * @description
 * # user
 * Factory in the parkspotyappApp.
 */
angular.module('parkspotyappApp')
    .service('user', function ($q, $location) {

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
            var q = $q.defer();
            Parse.Cloud.run('isAdmin').then(function(result){
                q.resolve(result);
            });

            return q.promise;
        },
        isVerified: function(email) {
            var q = $q.defer();
            Parse.Cloud.run('isVerified', {'email':email}).then(function(result){
                q.resolve(result);
            });

            return q.promise;
        },
        logIn: function(email, pass) {
            var q = $q.defer();
            var self = this;
            Parse.User.logIn(email, pass, {
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
            user.set("username", form.email);
            user.set("firstName", form.firstname);
            user.set("lastName", form.lastname);
            user.set("password", form.password);

            user.signUp(null, {
                success: function(user) {
                    self.setUser(user);
                    q.resolve(user);
                },
                error: function(error) {
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
        }
        
    };
});
