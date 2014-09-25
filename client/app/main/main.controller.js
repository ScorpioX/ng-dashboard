'use strict';

angular.module('ngDashboardApp').controller('MainCtrl', function ($scope, $http) {
	//Demo options
	$scope.CC = [
		{
			key: 'AA',
			value: 11
		},
		{
			key: 'BB',
			value: 22
		},
		{
			key: 'CC',
			value: 33
		}
	];

	//Demo highcharts series
	$scope.series1 = [{
		name: 'Series A',
		data: [
			[ +moment('2014-08-01'), 123 ],
			[ +moment('2014-08-02'), 112 ],
			[ +moment('2014-08-03'), 135 ],
			[ +moment('2014-08-04'), 108 ],
			[ +moment('2014-08-05'), 129 ],
			[ +moment('2014-08-06'), 103 ]
		]
	},{
		name: 'Series B',
		data: [
			[ +moment('2014-08-01'), 125 ],
			[ +moment('2014-08-02'), 102 ],
			[ +moment('2014-08-03'), 109 ],
			[ +moment('2014-08-04'), 128 ],
			[ +moment('2014-08-05'), 111 ],
			[ +moment('2014-08-06'), 134 ]
		]
	}];
});
