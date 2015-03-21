'use strict';

angular.module('astromo.metrics', [ 'ui.router', 'config' ])
  .config(function ($stateProvider, metricsPath) {

    $stateProvider
      .state('dashboard.metrics', {
        url         : '/metrics',
        templateUrl : metricsPath + 'views/index.html',
        controller  : 'metrics.mainController'
      });

  });
