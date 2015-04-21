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

Parse.Cloud.define('isAdmin', function(request, response) {
    var query = (new Parse.Query(Parse.Role));
    query.equalTo("name", "Administrator");
    query.equalTo("users", Parse.User.current());
    query.first().then(function(adminRole) {
        response.success(adminRole ? true : false);
    });
});