'use strict';

angular.module('ngDashboardApp').directive('ssCsv', function () {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			data: '='
		},
		template: '<a class="btn btn-success btn-xs" download="{{name}}.csv" href="data:text/csv;charset=utf-8,{{CSV}}"><span class="glyphicon glyphicon-cloud-download"></span> CSV</a>',
		link: function (scope, element, attrs) {
			scope.$watch('data', function(rows) {
				scope.name = scope.name || 'data';
				if (rows && rows.length) {
					scope.CSV = encodeURI(
						_.keys(rows[0]).join() + '\n' +
						_.map(rows, _.values).join('\n')
					);
				}
			});
		}
	};
});