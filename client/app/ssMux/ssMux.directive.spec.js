'use strict';

describe('Directive: ssMux', function () {

  // load the directive's module
  beforeEach(module('ngDashboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-mux></ss-mux>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ssMux directive');
  }));
});