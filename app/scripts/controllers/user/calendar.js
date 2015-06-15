'use strict';

/**
 * @ngdoc function
 * @name parkspotyappApp.controller:UserCalendarCtrl
 * @description
 * # UserCalendarCtrl
 * Controller of the parkspotyappApp
 */
angular.module('parkspotyappApp')
    .controller('UserCalendarCtrl', function ($scope, calendarViewModel) {

    $scope.vm = calendarViewModel;

   $scope.month = $scope.vm.getMonthDays({year: 2015, month: 6}) //$scope.vm.getReservationsForCurrentMonth($scope.vm.todayMonth, $scope.vm.todayYear);

});
