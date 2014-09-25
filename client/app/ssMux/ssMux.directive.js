'use strict';

angular.module('ngDashboardApp').directive('ssMux', ['$interpolate', '$parse', '$compile', '$q', function ($interpolate, $parse, $compile, $q) {

	return {
		restrict: 'E',
		scope: true,
		priority: 600,
		terminal: true,
		compile: function (tElmt, tAttrs) {
			var URI = $interpolate(tAttrs.uri),
				$attr = tAttrs.$attr,
				//Additional attributes to pass onto ss-ajax elements, skipping mux related ones
				_attrs = _.pick(tAttrs, _.keys(_.omit($attr, 'mux', 'data', 'class'))),
				pairs = _.map(_.pairs(_attrs), function (kv) {
					return [$attr[kv[0]], kv[1]];
				}),
				attrs = _.object(pairs),
				ajaxElem = $('<ss-ajax target="__data[$index]" promise="promises[$index]">').attr(attrs).attr('ss-demux', tAttrs.mux);

			tElmt.append(ajaxElem).removeAttr('uri ' + _.keys(attrs).join(' '));

			return function (scope, element, attrs) {
				var key = attrs.data || 'data';

				var signals = _.map(attrs.mux.split(','), function (s) {
					return {
						name: s,
						values: $parse(s)
					};
				});

				$compile(element[0].childNodes)(scope);

				function reload() {
					var vectors = [{}], tempScope = scope.$new(), uris = [], _vectors = [], _promises = [];

					scope.__data = [];
					scope.promises = [];
					_.each(signals, function (s) {
						var vector, v2, ns = [], sig = s.name, sigVals = s.values(scope) || [], i, l = sigVals.length;

						while (vector = vectors.shift()) {
							for (i = 0; i < l; i += 1) {
								v2 = _.clone(vector);
								v2[sig] = sigVals[i];
								ns.push(v2);
							}
						}
						vectors = ns;
					});

					_.each(vectors, function(vector) {
						var q = $q.defer();

						scope.promises.push(q);
						_promises.push(q.promise);

						_.extend(tempScope, vector);
						uris.push(URI(tempScope));
						_vectors.push(_.clone(tempScope));
					});

					$q.all(_promises).then(function (values) {
						if (values.length) {
							scope[key] = values;
						}
					});
					scope.uris = uris;
					scope.vectors = _vectors;
					tempScope.$destroy();
				}

				_.each(signals, function (s) {
					scope.$watchCollection(s.name, reload);
				});
			};
		}
	};
}]);