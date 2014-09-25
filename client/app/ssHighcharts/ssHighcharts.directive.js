'use strict';

angular.module('ngDashboardApp').directive('ssHighcharts', ['ssHighchartsConfig', function (ssHighchartsConfig) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			type: '@',
			title: '@',
			series: '='
		},
		template: '<div class="ss-highchart"></div>',
		link: function (scope, element, attrs) {
			scope.chart = ssHighchartsConfig.render(element, scope.type, scope.title, scope.series);
			scope.chart.reflow();

			scope.$watchCollection('series', function (series) {
				scope.chart.reflow();
				if (!series) {
					return;
				}

				_.each(scope.chart.series, function () {
					//Remove series from chart without redraw
					scope.chart.series[0].remove(false);
				});
				_.each(series, function (s) {
					scope.chart.addSeries(s, false);
				});
				scope.chart.redraw();
			});
			scope.$watch('title', function (title) {
				scope.chart.setTitle({text: title});
			});

			scope.$watch('type', function (type, oldType) {
				if (type === oldType) {
					return;
				}
				scope.chart.destroy();
				scope.chart = ssHighchartsConfig.render(element, type, scope.title, scope.series);
				scope.chart.redraw();
			});
		}
	};
}]);