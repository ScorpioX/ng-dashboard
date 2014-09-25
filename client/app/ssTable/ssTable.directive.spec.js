'use strict';

describe('Directive: ssTable', function () {

  // load the directive's module
  beforeEach(module('ngDashboardApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-table></ss-table>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ssTable directive');
  }));
});