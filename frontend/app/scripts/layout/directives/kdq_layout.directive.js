'use strict';

(function(){
  angular.module('kdq.layout')
    .directive('kdqLayout', kdqLayoutDirective);

  function kdqLayoutDirective() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'scripts/layout/directives/kdq_layout.html'
    };
  }
  
})();