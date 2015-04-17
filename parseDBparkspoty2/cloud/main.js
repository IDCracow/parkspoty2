//email validation
Parse.Cloud.beforeSave("_User", function(request, response) {
    var emailAddress = request.object.get("email");
    var domain = emailAddress.split('@')[1];
    if (domain.toLowerCase() === "infusion.com") {
        response.success();
    } else {
        response.error("Please use your company email address.");
    };
});

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});