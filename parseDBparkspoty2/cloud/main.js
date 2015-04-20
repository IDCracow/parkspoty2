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

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
    response.success("Hello world!");
});

Parse.Cloud.define('isAdmin', function(request, response) {
    if(!request.user.id){
        response.error("Error in user ID");
    }
    var queryRole = new Parse.Query(Parse.Role);
    response.success(queryRole);   

    /*
    queryRole.equalTo('name', 'Administrator');

    queryRole.first({
        success: function(r){
            var role = r;
            var relation = new Parse.Relation(role, 'Administrator');
            var admins = relation.query();

            admins.equalTo('marcin', request.user.username)
            admins.first({
                success: function(u){
                    var user = u;

                    if(user){
                        response.success('User is admin');
                    }else{
                        response.error('User is not admin');
                    }
                },
                error: function(){
                    response.error('Error on user lookup');
                }
            })
        },
        error: function(){
            response.error('User admin check failed');
        }
    });*/
});