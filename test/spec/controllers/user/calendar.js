'use strict';

describe('Controller: UserCalendarCtrl', function () {

  // load the controller's module
  beforeEach(module('parkspotyappApp'));

  var UserCalendarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCalendarCtrl = $controller('UserCalendarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
