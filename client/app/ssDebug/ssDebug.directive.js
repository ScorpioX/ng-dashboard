'use strict';

angular.module('ngDashboardApp').directive('ssDebug', function () {
	return {
		template: '<a class="btn btn-danger btn-xs debug"><span class="glyphicon glyphicon-eye-open"><table class="info table table-bordered table-condensed"><tr ng-repeat="(k,v) in __ssDebug"><td><label>{{k}}</label></td><td><pre>{{v}}</pre></td></tr></table></span></a>',
		restrict: 'E',
		link: function (scope, element, attrs) {
			scope.__ssDebug = scope;
		}
	};
});