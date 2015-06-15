angular.module('parkspotyappApp')
    .factory('calendarViewModel', function(user, Reservation) {

    var CalendarAPI = function() {};

    CalendarAPI.prototype.today = moment().format('DD-MM-YYYY');
    CalendarAPI.prototype.todayDay = moment().format('DD');
    CalendarAPI.prototype.todayMonth = moment().format('M');
    CalendarAPI.prototype.todayYear = moment().format('YYYY');
    
    var firstDayOfMonth = moment().month(7).startOf('month').format('ddd');
    CalendarAPI.prototype.thisMonthFirstDay = firstDayOfMonth;

    CalendarAPI.prototype.daysInMonth = moment().daysInMonth();
    CalendarAPI.prototype.getNumber = function(num) {
        return new Array(num);   
    }

    CalendarAPI.prototype.getReservationsForCurrentMonth = function(month, year) {
        Reservation.getReservationForMonth(parseInt(month), parseInt(year)).then(function(result) {
            console.log(result); 
        });
    }
    
    CalendarAPI.prototype.getDateRange = function(startDate, endDate, dateFormat) {
        var dates = [],
            end = moment(endDate),
            diff = endDate.diff(startDate, 'days');

        if(!startDate.isValid() || !endDate.isValid() || diff <= 0) {
            return;
        }

        for(var i = 0; i < diff; i++) {
            dates.push(end.subtract(1,'d').format(dateFormat));
        }

        return dates;
    }

    return new CalendarAPI();
});