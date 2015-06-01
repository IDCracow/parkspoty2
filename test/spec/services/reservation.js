'use strict';

describe('Service: Reservation', function () {

  // load the service's module
  beforeEach(module('parkspotyappApp'));

  // instantiate service
  var Reservation;
  beforeEach(inject(function (_Reservation_) {
    Reservation = _Reservation_;
  }));

  it('should do something', function () {
    expect(!!Reservation).toBe(true);
  });

});
