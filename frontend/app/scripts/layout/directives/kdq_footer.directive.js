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
    $scope.connect = {};
    
    var sending = false;
    $scope.submitConnect = function() {
      if(sending) {
        return;
      }
      sending = true;
      $.ajax({
        url: '//formspree.io/hello@kodeq.com', 
        method: 'POST',
        data: $scope.connect,
        dataType: 'json',
      }).then(function(res, status) {
        sending = false;

        $timeout(function() {
          $scope.submitConnectSuccessfull = true;
          $scope.connect = {};
        });

        $timeout(function() {
          $scope.submitConnectSuccessfull = false;
        }, 6000);
      }, function(status) {
        sending = false;
      });
    }
  }
  
})();