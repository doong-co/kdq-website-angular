'use strict';

(function() {
  angular.module('kdq.widgets')
    .directive('kdqTrianglify', kdqTrianglifyDirective);

  // @ngInject
  function kdqTrianglifyDirective($window, $log) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
        if (!_.isFunction($window.Trianglify)) {
          return $log.error('Trianglify is not function');
        }

        var pattern = Trianglify();
        pattern.canvas($element[0]);
      }
    }
  }

})();