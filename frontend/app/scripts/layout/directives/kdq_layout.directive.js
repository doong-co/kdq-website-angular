'use strict';

(function(){
  angular.module('kdq.layout')
    .directive('kdqLayout', kdqLayoutDirective);

  function kdqLayoutDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/layout/directives/kdq_layout.html'
    };
  }
  
})();