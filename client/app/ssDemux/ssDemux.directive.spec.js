'use strict';

describe('Directive: ssDemux', function () {

  // load the directive's module
  beforeEach(module('ngDashboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-demux></ss-demux>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ssDemux directive');
  }));
});