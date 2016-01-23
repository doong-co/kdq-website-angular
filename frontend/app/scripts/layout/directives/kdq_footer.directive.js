'use strict';

(function(){
  angular.module('kdq.layout')
    .directive('kdqFooter', kdqFooterDirective);

  function kdqFooterDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/layout/directives/kdq_footer.html',
      controller: kdqFooterController
    };
  }

  // @ngInject
  function kdqFooterController($scope, NavigationSevice) {
    $scope.navs = NavigationSevice.get();
    
  }
  
})();