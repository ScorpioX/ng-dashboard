'use strict';

describe('Directive: ssAjax', function () {

  // load the directive's module and view
  beforeEach(module('ngDashboardApp'));
  beforeEach(module('app/ssAjax/ssAjax.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ss-ajax></ss-ajax>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ssAjax directive');
  }));
});