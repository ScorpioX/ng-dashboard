'use strict';

angular.module('ngDashboardApp').directive('ssCsvHighcharts', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			name: '@',
			data: '='
		},
		template: '<a class="btn btn-success btn-xs" download="{{name}}.csv" href="data:text/csv;charset=utf-8,{{CSV}}"><span class="glyphicon glyphicon-cloud-download"></span> CSV</a>',
		link: function (scope, element, attrs) {
			scope.name = scope.name || 'data';

			scope.$watchCollection('data', function(series) {

				var ss = _.compact(series),	//Skip empty values
					rowMap = {};

				_.each(ss, function(s, idx) {
					var pos = idx + 1;

					_.each(s.data, function (point) {
						var ts = point[0], y = point[1];

						rowMap[ts] = rowMap[ts] || [ts];
						rowMap[ts][pos] = y;
					});
				});

				scope.CSV = encodeURI(
					'timestamp,' + _.pluck(ss, 'name').join()  + '\n' +
					_.values(rowMap).join('\n')
				);
			});
		}
	};
});