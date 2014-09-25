'use strict';

angular.module('ngDashboardApp').directive('ssDemux', ['ssMixer', function (MixerClass) {
	return {
		restrict: 'A',
		transclude: 'element',
		priority: 1200,
		link: function(scope, element, attrs, ctrl, transclude) {
			var nodeMap = {}, expression = attrs.ssDemux;

			function render(vectors) {
				var lastNode = element, keys = {};

				_.each(vectors, function (vector) {
					keys[JSON.stringify(vector)] = 1;
				});
				_.each(_.keys(nodeMap), function (key) {
					if (!keys[key]) {
						nodeMap[key].remove();
						delete nodeMap[key];
					}
				});

				_.each(vectors, function(vector, idx) {
					var key = JSON.stringify(vector), node, childScope;

					//Reuse existing nodes
					if (node = nodeMap[key]) {
						childScope = node.$scope;
						lastNode.after(node);
						lastNode = node.last();
					} else {
						childScope = scope.$new();
						childScope.$vector = vector;
						_.extend(childScope, vector);
					}

					childScope.$index = idx;

					if (!node) {
						transclude(childScope, function(clone) {
							clone[clone.length++] = document.createComment(' end ssDemux: ' + expression);
							clone.$scope = childScope;
							nodeMap[key] = clone;
							lastNode.after(clone);
							lastNode = clone.last();
						});
					} else {
						childScope.$broadcast('reinstated');
					}
				});
			}

			new MixerClass(attrs.ssDemux, scope, render);
		}
	};
}]);