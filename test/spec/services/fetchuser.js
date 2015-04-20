'use strict';

describe('Service: fetchUser', function () {

  // load the service's module
  beforeEach(module('parkspotyappApp'));

  // instantiate service
  var fetchUser;
  beforeEach(inject(function (_fetchUser_) {
    fetchUser = _fetchUser_;
  }));

  it('should do something', function () {
    expect(!!fetchUser).toBe(true);
  });

});
