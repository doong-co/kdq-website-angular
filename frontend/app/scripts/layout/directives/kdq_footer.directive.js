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
  function kdqFooterController($scope, $timeout, NavigationSevice) {
    $scope.navs = NavigationSevice.get();
    
    $scope.submitConnect = function() {
      $.ajax({
        url: '//formspree.io/hello@kodeq.com', 
        method: 'POST',
        data: $scope.connect,
        dataType: 'json',
      }).then(function(res, status) {
        $timeout(function() {
          $scope.submitConnectSuccessfull = true;
        });

        $timeout(function() {
          $scope.submitConnectSuccessfull = false;
        }, 6000);
      }, function(status) {
        
      });
    }
  }
  
})();