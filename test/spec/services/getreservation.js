'use strict';

describe('Service: getReservation', function () {

  // load the service's module
  beforeEach(module('parkspotyappApp'));

  // instantiate service
  var getReservation;
  beforeEach(inject(function (_getReservation_) {
    getReservation = _getReservation_;
  }));

  it('should do something', function () {
    expect(!!getReservation).toBe(true);
  });

});
