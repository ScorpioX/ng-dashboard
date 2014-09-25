'use strict';

describe('Service: ssHighchartsConfig', function () {

  // load the service's module
  beforeEach(module('ngDashboardApp'));

  // instantiate service
  var ssHighchartsConfig;
  beforeEach(inject(function (_ssHighchartsConfig_) {
    ssHighchartsConfig = _ssHighchartsConfig_;
  }));

  it('should do something', function () {
    expect(!!ssHighchartsConfig).toBe(true);
  });

});
