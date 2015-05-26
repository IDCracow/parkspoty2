//Mailing notifications
var Mandrill = require('mandrill');
Mandrill.initialize('jocT9rEAZDBLO7GKHgLU5A');

Parse.Cloud.define('mailAllUsers', function(request, response) {
    var allUsers = new Parse.Query(Parse.User);

    allUsers.each(function(user, status) {
        if (user.getEmail() === 'mziolek@infusion.com') {
            Mandrill.sendTemplate({
                template_name: 'parkspot-draw-reminder',
                template_content: [{
                    name: 'username',
                    content: user.firstName
                }],
                message: {
                    text: "Hello!",
                    subject: "Parkspoty reminder",
                    from_email: "parkspoty@infusion.com",
                    from_name: "Parkspoty",
                    to: [{
                        email: user.email
                    }]
                },
                async: true
            },{
                success: function(httpResponse) {
                    console.log(httpResponse);
                    response.success("Emails sent to all users!");
                },
                error: function(httpResponse) {
                    console.error(httpResponse);
                    response.error(httpResponse);
                }
            });
        }
    });
});

Parse.Cloud.job('drawingReminderMailing', function(request, status) {
    var date = new Date();
    var day = date.getUTCDate();
    if (day === 24) {
        Parse.Cloud.run('mailAllUsers').then(function() {
            status.success('Emails sent');
        }, function(error) {
            status.error(error);
        });
    } else {
        status.success('Today is not 26th day of month :)');   
    }
});