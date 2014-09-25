'use strict';
/*global Highcharts*/

angular.module('ngDashboardApp').factory('ssHighchartsConfig', function () {

  var _defaultConfig = {
    chart: {
      borderWidth: 1,
      borderRadius: 5,
      height: 300
    },
    credits: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    },
    title: {
      style: {
        fontFamily: 'Unica One',
        fontSize: '16px',
        fontWeight: 900,
        textTransform: 'uppercase'
      }
    },
    xAxis: { type: 'datetime' },
    yAxis: { title: null }
  };

  // Public API here
  return {
    render: function (target, type, title, series) {
      var width = target.width(),
        config = _.merge({}, _defaultConfig, {
        chart: {
          renderTo: target[0],
          type: type || 'spline',
          height: width > 500 ? 300 : 200
        },
        title: {
          text: title
        },
        series: series || []
      }),
      chart = new Highcharts[width > 500 ? 'StockChart' : 'Chart'](config);

      return chart;
    }
  };
});
