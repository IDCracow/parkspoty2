angular.module('parkspotyappApp')
    .factory('calendarViewModel', function(user, Reservation) {

    var CalendarAPI = function() {};

    CalendarAPI.prototype.todayDay = moment().format('DD');
    CalendarAPI.prototype.todayMonth = moment().format('M');
    CalendarAPI.prototype.todayYear = moment().format('YYYY');

    CalendarAPI.prototype.daysInMonth = moment().daysInMonth();
    CalendarAPI.prototype.getNumber = function(num) {
        return new Array(num);   
    }

    CalendarAPI.prototype.getReservationsForCurrentMonth = function(month, year) {
        Reservation.getReservationForMonth(parseInt(month), parseInt(year)).then(function(result) {
            console.log(result); 
        });
    }

    return new CalendarAPI();
});