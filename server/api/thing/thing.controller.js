/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
    {
      name: 'SS-AJAX',
      info: 'Load / update data from server side.'
    }, {
      name: 'SS-TABLE',
      info: 'Show array of objects in tabular format.'
    }, {
      name: 'SS-CSV',
      info: 'Export array of objects in CSV format'
    }, {
      name: 'SS-SELECT',
      info: 'Single/multiple option button groups'
    }, {
      name: 'SS-DATE',
      info: 'Simple customizable date picker'
    }, {
      name: 'SS-HIGHCHARTS',
      info: 'Show time series data in line or column chart'
    }, {
      name: 'SS-DEBUG',
      info: 'Conveniently check all scope variables'
    }
  ]);
};