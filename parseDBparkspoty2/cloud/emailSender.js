//Mailing notifications
var Mandrill = require('mandrill');
Mandrill.initialize('jocT9rEAZDBLO7GKHgLU5A');

Parse.Cloud.define('mailMe', function(request, response){
    Mandrill.sendEmail({
        message: {
            text: "Hello World!",
            subject: "Spot reminder",
            from_email: "parkspoty@infusion.com",
            from_name: "Parkspoty",
            to: [{
                email: request.params.email,
                name: "Your Name"
            },{
                email: 'ziolkenz@interia.pl',
                name: 'lol'
            }]
        },
        async: true
    },{
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success("Email sent!");
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
        }
    });
});