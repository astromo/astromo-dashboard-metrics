'use strict';

angular.module('astromo.metrics', [ 'ui.router' ])
  .config(function ($stateProvider) {

    $stateProvider
      .state('dashboard.metrics', {
        url         : '/metrics',
        templateUrl : 'vendor/astromo-dashboard-metrics/views/index.html',
        controller  : 'metrics.mainController'
      });

  });
