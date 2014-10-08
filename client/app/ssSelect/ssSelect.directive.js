'use strict';

angular.module('ngDashboardApp').directive('ssSelect', ['$parse', function ($parse) {
	return {
		restrict: 'E',
		priority: 900,
		scope: {
			label: '@',
			ngModel: '=',
			options: '@?',
			optionsRef: '=',
			kv: '@'
		},
		templateUrl: 'app/ssSelect/ssSelect.html',
		link: function (scope, element, attrs) {
			var kv = (scope.kv || 'key:value').split(':'),
				k = kv[0],
				v = kv[1],
				isMulti = attrs.hasOwnProperty('multiple') ? 1 : 0,
				valueMap = {};

			scope.ngModel = scope.ngModel || [];
			//In case of pre-defined values
			if (scope.ngModel.length) {
				_.each(scope.ngModel, function (val) {
					valueMap[val] = 1;
				});
			}

			function processOptions(opts) {
				if (!opts) {
					return;
				}
				scope._options = _.map(opts, function (opt) {
					return { key: opt[k] || opt, value: opt[v] || opt };
				});
				//Set first option as default value
				if (scope.ngModel.length === 0) {
					var opt = scope._options[0], val = opt.value;
					scope.ngModel = [val];
					valueMap[val] = 1;
					scope.selected = isMulti ? [opt.value] : opt;
				} else {
					//There're predefined values
					if (isMulti) {
						scope.selected = scope.ngModel;
					} else {
						scope.selected = _.find(scope._options, function(opt) { return opt.value === scope.ngModel[0]; });
					}
				}
				if (opts.length > 10) {
					scope.mode = isMulti ? 'SM' : 'SS';
				} else {
					scope.mode = isMulti ? 'BM' : 'BS';
				}
			}
			scope.$watch('options', function (opts) {
				processOptions(opts && $parse(opts)());
			});
			scope.$watchCollection('optionsRef', function (opts) {
				processOptions(opts);
			});

			//For <ui-select>
			scope.$watch('selected', function (sels) {
				if (sels) {
					scope.ngModel = isMulti ? sels : [sels.value];
				}
			});

			//For <btn-group>
			scope.setSingle = function (val) {
				valueMap = {};
				valueMap[val] = 1;
				scope.ngModel = [val];
			};
			scope.setOption = function (val) {
				var idx;
				if (valueMap[val]) {
					idx = scope.ngModel.indexOf(val);
					scope.ngModel.splice(idx, 1);
					delete valueMap[val];
				} else {
					scope.ngModel.push(val);
					valueMap[val] = 1;
				}
			};
			scope.isActive = function (val) {
				return valueMap[val] ? 'active btn-success' : '';
			};
		}
	};
}]);