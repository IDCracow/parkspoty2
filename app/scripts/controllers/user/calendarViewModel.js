angular.module('parkspotyappApp')
    .factory('calendarViewModel', function(user, Reservation) {

    var CalendarAPI = function() {};

    CalendarAPI.prototype.today = moment().format('DD-MM-YYYY');
    CalendarAPI.prototype.todayDay = moment().format('DD');
    CalendarAPI.prototype.todayMonth = moment().format('MMMM');
    CalendarAPI.prototype.todayYear = moment().format('YYYY');

    CalendarAPI.prototype.getReservationsForCurrentMonth = function(month, year) {
        Reservation.getReservationForMonth(parseInt(month), parseInt(year)).then(function(result) {
            console.log(result); 
        });
    }

    CalendarAPI.prototype.getMonthDays = function(monthYear) {
        var startOfMonth = moment([monthYear.year,monthYear.month - 1,1]).format('MM/DD/YYYY'); //monthYear.month -1 because months [0..11]
        var endOfMonth = moment().month(monthYear.month - 1).endOf('month').format('MM/DD/YYYY');


        var recurrence = moment().recur({
            start: startOfMonth,
            end: endOfMonth
        });
        console.log(recurrence.daysOfMonth());

        
        var diff = moment(endOfMonth).diff(moment(startOfMonth), 'days');

        var days = [];
        for (i = 0; i <= diff; i++) {
            if (i != 0) {
                days.push(days[i-1].add(1, 'day'));
                console.log(days[i-1].add(1, 'day').format('ddd'));
            } else {
                days.push(moment(startOfMonth));
            }
        }

        console.log(days);
        return days;
    }

    return new CalendarAPI();
});
