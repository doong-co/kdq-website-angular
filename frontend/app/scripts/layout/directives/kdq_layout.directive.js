'use strict';

(function(){
  angular.module('kdq.layout')
    .directive('kdqLayout', kdqLayoutDirective);

  function kdqLayoutDirective() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'scripts/layout/directives/kdq_layout.html',
      controller: kdqLayoutController
    };
  }
  
  // @ngInject
  function kdqLayoutController($rootScope, $anchorScroll) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.layout = angular.copy(toState.layout) || {};
      $rootScope.layout.currentState = toState.name;
      $('#main-navbar').collapse('hide');
      $anchorScroll();
    });
  }
})();