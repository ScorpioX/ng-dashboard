'use strict';

describe('Directive: ssSelect', function () {

  // load the directive's module and view
  beforeEach(module('ngDashboardApp'));
  beforeEach(module('app/ssSelect/ssSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-select></ss-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ssSelect directive');
  }));
});