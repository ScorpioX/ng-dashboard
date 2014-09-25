'use strict';

angular.module('ngDashboardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngGrid',
  'ui.router',
  'ui.bootstrap',
  'ui.select'
], ['$compileProvider', function ($compileProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);

}])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });