'use strict';

angular.module('ngDashboardApp').directive('ssTable', function () {
	return {
		scope: {
			cols: '@',
			data: '='
		},
		template: '<div ng-if="ready" class="grid" ui-grid="tableOptions" ui-grid-auto-resize></div>',
		restrict: 'E',
		link: function (scope, element, attrs) {
			if (!scope.data) {
				scope.data = [];
			}
			scope.tableOptions = {
				data: null,
				enableHighlighting: true,
				enableRowSelection: true,
				multiSelect: false
			};
			if (scope.cols) {
				scope.tableOptions.columnDefs = _.map(scope.cols.split(','), function (col) {
					return { field: col };
				});
			}
			scope.$watch('data', function (data) {
				if (data && data.length) {
					scope.tableOptions.data = data;
					scope.ready = 1;
				}
			});
		}
	};
});