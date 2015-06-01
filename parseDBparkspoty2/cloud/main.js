require('cloud/emailSender.js');

var _ = require('underscore');

//email validation
Parse.Cloud.beforeSave("_User", function(request, response) {
    var emailAddress = request.object.get("username");
    var domain = emailAddress.split('@')[1];
    if (domain.toLowerCase() === "infusion.com") {
        response.success();
    } else {
        response.error("Please use your @infusion.com email address.");
    };
});

//user role settings
Parse.Cloud.afterSave(Parse.User, function(request) {
    Parse.Cloud.useMasterKey();  

    query = new Parse.Query(Parse.Role);
    if (request.user.attributes.username != "mziolek@infusion.com") {
        query.equalTo("name", "User");
        query.first ( {
            success: function(object) {
                object.relation("users").add(request.user);
                object.save();
            },
            error: function(error) {
                throw "Got an error " + error.code + " : " + error.message;
            }
        });
    } else {
        query.equalTo("name", "Administrator");
        query.first ( {
            success: function(object) {
                object.relation("users").add(request.user);
                object.save();
            },
            error: function(error) {
                throw "Got an error " + error.code + " : " + error.message;
            }
        });
    }
});

//check if user is admin
Parse.Cloud.define('isAdmin', function(request, response) {
    var query = (new Parse.Query(Parse.Role));
    query.equalTo("name", "Administrator");
    query.equalTo("users", Parse.User.current());
    query.first().then(function(adminRole) {
        response.success(adminRole ? true : false);
    });
});

//check if user has validated email
Parse.Cloud.define('isVerified', function(request, response) {
    var query = new Parse.Query("User");
    query.equalTo('email', request.params.email);
    query.find({
        success: function(result) {
            response.success(result[0].attributes.emailVerified);
        },
        error: function(error) {
            response.error(error);
        }
    });
});

//resend confirmation email
Parse.Cloud.define('resendVerificationEmail', function(request, response) {
    Parse.Cloud.useMasterKey(); 

    var query = new Parse.Query('User');

    query.equalTo('username', request.params.username);
    query.first({
        success: function(result) {
            var myEmail = result.getEmail();
            //fake mail is needed 
            var fakeMail = 'resendVerificationEmail@infusion.com';
            result.set('email', fakeMail);
            result.save(null, {
                success: function(result) {
                    result.set('email', myEmail);
                    result.save();
                    response.success(true);
                },
                error: function(error) {

                }
            });
        }
    })
});

// clear currentSpot fields on user table
Parse.Cloud.define('clearAssignedSpotsFromUsers', function(request, response){
    Parse.Cloud.useMasterKey();

    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.notEqualTo("spotCurrent", null); 

    query.find({
        success: function(results) {
            _.each(results, function(user){ 
                user.set('spotCurrent', null);
                user.save({
                    success: function(result) {
                        response.success(result);
                    },
                    error:function(error) {
                        response.error(error);
                    }
                })                                 
            })
            response.success(results);
        },
        error: function(error) {          
            response.error(error.code); 
        }
    }); 
});

// saving current spot to user and removeing -1 ticket from user
Parse.Cloud.define('setCurrentSpotToUser', function(request, response){
    Parse.Cloud.useMasterKey();

    var query = new Parse.Query('User');
    
    var listOfWinners = request.params.listOfWinners;
    
    var listOfWinnersEmails = [];
    for(var i = 0; i < listOfWinners.length; i++) {
          listOfWinnersEmails.push(listOfWinners[i].winner.email);      
    } 
    
    query.containedIn("email", listOfWinnersEmails);
    
    query.find({
        success: function(results) {          
            var i = 0;
             _.each(results, function(user){ 
                var ticketsLeft = user.get('ticketsLeft');
                 
                user.set('spotCurrent', listOfWinners[i].spot.spotname);
                user.set('ticketsLeft', ticketsLeft-1);
                 
                user.save({
                    success: function(result) {
                        response.success(result);
                    },
                    error:function(error) {
                        response.error(error);
                    }
                }) 
                i++;
            })
             
            response.success(results);
        },
        error: function(error) {          
            response.error(error.code); 
        }
    }); 
});
