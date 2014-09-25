'use strict';

angular.module('ngDashboardApp').factory('ssMixer', ['$parse', function ($parse) {

	function MixerClass (muxStrs, scope, callback) {
		var self = this;

		function vectorize () {
			var vectors = [{}], scope = self.scope, ii, ll = self.signals.length;

			for (ii = 0; ii < ll; ii += 1) {
				var s = self.signals[ii], vector, v2, ns = [], sig = s.name, sigVals = s.values(scope) || [], i, l = sigVals.length;

				if (!_.isArray(sigVals)) {
					sigVals = [sigVals];
				}
				while (vector = vectors.shift()) {
					for (i = 0; i < l; i += 1) {
						v2 = _.clone(vector);
						v2[sig] = sigVals[i];
						ns.push(v2);
					}
				}
				vectors = ns;
			}

			self.callback(vectors);
			return vectors;
		}

		this.scope = scope;
		this.callback = callback || angular.noop;
		this.signals = _.map(muxStrs.split(','), function (s) {
			scope.$watchCollection(s, vectorize);
			return {
				name: s,
				values: $parse(s)
			};
		});
		this.vectorize = vectorize;
	}

	return MixerClass;
}]);
