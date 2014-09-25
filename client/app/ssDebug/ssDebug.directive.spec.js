'use strict';

describe('Directive: ssDebug', function () {

  // load the directive's module
  beforeEach(module('ngDashboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-debugger></ss-debugger>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ssDebug directive');
  }));
});