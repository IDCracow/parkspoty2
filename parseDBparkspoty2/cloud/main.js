
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

//email validation
Parse.Cloud.beforeSave("user", function(req, res) {
    var emailAddress = req.object.get("email");
    var domain = emailAddress.split('@')[1];
    if (domain.toLowerCase() === "infusion.com") {
        res.success();
    } else {
        res.error("Please use your company email address.");
    };
});