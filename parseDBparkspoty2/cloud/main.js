//email validation
Parse.Cloud.beforeSave("_User", function(request, response) {
    var emailAddress = request.object.get("email");
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
    if (request.user.attributes.email != "administrator@infusion.com") {
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
    query.equalTo('username', request.params.username);
    query.find({
        success: function(result) {
            response.success(result[0].attributes.emailVerified);
        },
        error: function(error) {
            response.error(error);
        }
    })
});

//resend confirmation email
Parse.Cloud.define('resendVerificationEmail', function(request, response) {
    Parse.Cloud.useMasterKey(); 

    var query = new Parse.Query('User');
    query.equalTo('username', request.params.username);
    query.first({
        success: function(result) {
            var myEmail = result.getEmail();
            var fakeMail = 'resendVerificationEmail@infusion.com';
            result.set('email', fakeMail);
            result.save(null, {
                success: function(result) {
                    result.set('email', myEmail);
                    result.save();
                    response.success(myEmail);
                },
                error: function(error) {

                }
            });
        }
    })
});