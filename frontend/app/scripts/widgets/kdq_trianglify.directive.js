'use strict';

(function() {
  angular.module('kdq.widgets')
    .directive('kdqTrianglify', kdqTrianglifyDirective);

  // @ngInject
  function kdqTrianglifyDirective($window, $log) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        if (!_.isFunction($window.Trianglify)) {
          return $log.error('Trianglify is not function');
        }
        // var colors = ['Greys', 'Blues', 'RdYlBu', 'PuOr', 'YlOrRd', 'PuBu', 'Purples'];
        var pattern = Trianglify({
          width: $element.width(),
          height: $element.height(),
          x_colors: $attr.color || 'random'
        });
        pattern.canvas($element[0]);
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

})();