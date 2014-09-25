'use strict';

angular.module('ngDashboardApp').
directive('ssAjax', ['$http', '$parse', '$cacheFactory', '$q', '$interpolate', 'ssMixer', function ($http, $parse, $cacheFactory, $q, $interpolate, MixerClass) {
	var cache = $cacheFactory('ss-ajax', { capacity: 100 });

	return {
		restrict: 'E',
		scope: true,
		controller: function ($scope) {
			$scope.adapters = [];
			this.registerAdapter = function (adapter) {
				$scope.adapters.push(adapter);
			};
		},
		compile: function(tElmt, tAttrs) {
			var uriValid = $interpolate(tAttrs.uri, false, null, true);

			return function (scope, element, attrs) {
				var mux = attrs.mux,
					target = $parse(attrs.target).assign,
					parent = scope.$parent,
					dataCopy;

				scope.$on('reinstated', function () {
					target(parent, dataCopy);
				});

				if (mux) {
					var signals = new MixerClass(mux, scope);
					attrs.$observe('uri', function (uri) {
						var uris = [uri], promises = [], vectors;

						//In case of empty params or mux values
						if (!uriValid(parent) || uri.search(/\[\]/) > 0) {
							return;
						}

						uri.replace(/(\[[\w]+(\,[\w]+)*)\]/g, function (match) {
							var vals = match.substr(1, match.length - 2).split(','), _uri, _uris = [], i, l = vals.length;

							while (_uri = uris.shift()) {
								for (i = 0; i < l; i += 1) {
									_uris.push(_uri.replace(match, vals[i]));
								}
							}
							uris = _uris;
						});

						vectors = signals.vectorize();
						_.each(uris, function (uri, idx) {
							var q = $q.defer();

							promises.push(q.promise);
							$http.get(uri, { cache: cache }).success(function (data) {
								var _scope = _.extend(scope.$new(), vectors[idx]);
								_.each(scope.adapters, function (func) {
									data = func(data, _scope);
								});
								_scope.$destroy();
								q.resolve(data);
							});
						});
						$q.all(promises).then(function (values) {
							if (values.length) {
								dataCopy = mux ? values : values[0];
								target(parent, dataCopy);
							}
						});
					});
				} else {
					attrs.$observe('uri', function (uri) {

						if (!uriValid(parent)) {
							//In case of empty parameters, abort
							return;
						}

						$http.get(uri, { cache: cache }).success(function (data) {
							_.each(scope.adapters, function (func) {
								data = func(data);
							});
							dataCopy = data;
							target(parent, data);
						});
					});
				}
			};
		}
	};
}]);