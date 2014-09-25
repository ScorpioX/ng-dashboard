'use strict';

describe('Service: ssMixer', function () {

  // load the service's module
  beforeEach(module('ngDashboardApp'));

  // instantiate service
  var ssMixer;
  beforeEach(inject(function (_ssMixer_) {
    ssMixer = _ssMixer_;
  }));

  it('should do something', function () {
    expect(!!ssMixer).toBe(true);
  });

});
