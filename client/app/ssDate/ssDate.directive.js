'use strict';

angular.module('ngDashboardApp').directive('ssDate', function () {
	return {
		restrict: 'E',
		scope: {
			label: '@',
			ngModel: '=',
			modelFormat: '@'
		},
		template: '<p class="form-group"><label class="ss-group">{{label}}</label><input type="text" class="form-control input-sm" datepicker-popup="{{format}}" show-button-bar=false ng-model="dateRaw" is-open="opened" datepicker-options="options" ng-click="openDP($event)" is-open="opened"/></p>',
		link: function (scope, element, attrs) {
			scope.opened = false;
			scope.options = {
				showWeeks: false
			};
			scope.openDP = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				scope.opened = true;
			};

			var hms = attrs.hasOwnProperty('subtract') ? 'T00:00:00.000Z' : 'T23:59:59.999Z',
				fmt = attrs.format || 'yyyy-MM-dd';

			scope.format = fmt;
			scope.$watch('dateRaw', function (val) {
				if (val) {
					//Output date per specified format or UNIX milliseconds offset by default
					var date = moment(val).format('YYYY-MM-DD');

					date = moment.utc(date + hms);

					scope.ngModel = scope.modelFormat ? date.format(scope.modelFormat) : +date;
				}
			});

			var sub = (attrs.subtract || '0,day').split(',');

			scope.dateRaw = moment().subtract(+sub[0], sub[1]).toDate();
		}
	};
});