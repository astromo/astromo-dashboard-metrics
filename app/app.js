/**
 * Lightweight standalone metrics shell.
 * Do not include in main dashboard!
 */

'use strict';

angular.module('astromo.metrics.shell', [ 'ui.router', 'astromo.metrics' ])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('dashboard', {
        abstract: true,
        templateUrl: 'main.html',
        controller: function() {
          console.log('Dashboard controller');
        }
      })
      .state('dashboard.home', {
        url: '',
        controller: function() {
          console.log('Home controller');
        }
      });

  });
