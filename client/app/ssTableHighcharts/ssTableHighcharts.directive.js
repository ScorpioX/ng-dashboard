'use strict';

angular.module('ngDashboardApp').directive('ssTableHighcharts', function ($timeout) {
	return {
		scope: {
			series: '='
		},
		template: '<div class="grid" ng-if="ready" ng-grid="tableOptions"></div>',
		restrict: 'E',
		link: function (scope, element, attrs) {
			var timer;

			scope.tableOptions = {
				columnDefs: null,
				data: 'data',
				enableHighlighting: true,
				enableRowSelection: true,
				multiSelect: false
			};

			scope.$watchCollection('series', function(series) {
				var ss = _.compact(series),	//Skip empty values
					cols = _.map(ss, function (s, idx) {
						return { field: 's' + idx, displayName: s.name };
					}),
					rowMap = {};

				if (!ss.length) {
					return;
				}

				//Kill the previous table
				scope.ready = 0;
				cols.unshift({ field: 'timestamp' });
				scope.tableOptions.columnDefs = cols;
				_.each(ss, function(s, idx) {
					var name = 's' + idx;
					_.each(s.data, function (point) {
						var ts = point[0], y = point[1];

						rowMap[ts] = rowMap[ts] || { timestamp: moment.utc(ts).format() };
						rowMap[ts][name] = y;
					});
				});
				scope.data = _.values(rowMap);

				$timeout.cancel(timer);
				timer = $timeout(function () {
					//Recreate a new one!
					scope.ready = 1;
				}, 90);
			});
		}
	};
});