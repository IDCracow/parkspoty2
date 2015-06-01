'use strict';

describe('Service: Spot', function () {

  // load the service's module
  beforeEach(module('parkspotyappApp'));

  // instantiate service
  var Spot;
  beforeEach(inject(function (_Spot_) {
    Spot = _Spot_;
  }));

  it('should do something', function () {
    expect(!!Spot).toBe(true);
  });

});
