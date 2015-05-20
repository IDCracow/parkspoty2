angular.module('parkspotyappApp')
    .factory('resetPasswordViewModel', function(user) {
    
    var ResetPasswordAPI = function() {};

    ResetPasswordAPI.prototype.resetEmailSent = false;
    ResetPasswordAPI.prototype.errorMessage = false;
    
    ResetPasswordAPI.prototype.sendResetEmail = function(email) {
        var self = this;

        user.sendResetEmail(email).then(function(result) {
            self.resetEmailSent = true;
            self.errorMessage = false;
        }, function(error) {
            var errorFirstLetterUppercase = error.substr(0, 1).toUpperCase() + error.substr(1);
            self.errorMessage = errorFirstLetterUppercase;
        });
    }

    return new ResetPasswordAPI();
});