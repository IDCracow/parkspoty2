'use strict';

describe('Service: Draw', function () {

  // load the service's module
  beforeEach(module('parkspotyappApp'));

  // instantiate service
  var Draw;
  beforeEach(inject(function (_Draw_) {
    Draw = _Draw_;
  }));

  it('should do something', function () {
    expect(!!Draw).toBe(true);
  });

});
