'use strict';

angular.module('astromo.metrics')
  .directive('astChartLatency', function(Restangular, $animate) {

    return {
      restrict    : 'EA',
      scope       : {},
      controller  : function($scope) {

        this.update = function() {
          Restangular.all('metrics').all('latency').getList()
            .then(function(metrics) {
              $scope.metrics = metrics;
            });
        };

        this.update();
      },
      templateUrl : 'modules/dashboard-metrics/directives/chart.latency.html',
      link        : function(scope, elem, attrs, controller) {
        $animate.enabled(false, elem); // disable ngAnimate for this element

        scope.loading = true;

        scope.$watch('metrics', function(metrics) {
          if (!metrics)
            return;

          metrics = _.map(metrics, function(metric, index) {
            return {
              x: new Date(metric[0]).getTime() / 1000,
              y: metric[1],
            };
          });

          render(metrics);
        });

        function render(metrics) {

          var width  = elem.find('.chart__latency').width();
          var height = elem.find('.chart__latency').height();

          var graph = new Rickshaw.Graph({
            element  : elem.find('#chart__latency')[0],
            width    : width,
            height   : height,
            renderer : 'area',
            interpolation: 'linear',
            series   : [{
              color : '#18BC9C',
              data  : metrics,
              name  : 'Latency'
            }]
          });

          new Rickshaw.Graph.Axis.X({
            graph         : graph,
            orientation   : 'bottom',
            element       : elem.find('.x_axis')[0],
            tickFormat    : function(t) {
              return new Date(t * 1000).toLocaleTimeString('nl-BE');
            }
          });

          new Rickshaw.Graph.Axis.Y( {
            graph       : graph,
            orientation : 'left',
            ticks       : 2,
            element     : elem.find('.y_axis')[0],
          });
          graph.render();

          // hover detail
          var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph,
            xFormatter: function(x) {
              return new Date(x * 1000).toISOString();
            },
            yFormatter: function(y) {
              if (!y) return;
              return y.toFixed(2) + 'ms';
            }
          });

          scope.loading = false;
        }
      }
    };

  });
