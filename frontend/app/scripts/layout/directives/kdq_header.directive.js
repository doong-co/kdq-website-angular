'use strict';

(function(){
  angular.module('kdq.layout')
    .directive('kdqHeader', kdqHeaderDirective);

  function kdqHeaderDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'scripts/layout/directives/kdq_header.html',
      link: function($scope, $element) {
        var $nav = $element;
        $(window).on("scroll", function() {
          if ($(this).scrollTop() > 100) {
            $nav.addClass("nav-white");
          } else {
            $nav.removeClass("nav-white");
          }
        });
      },
      controller: kdqHeaderController
    };
  }

  // @ngInject
  function kdqHeaderController($scope, NavigationSevice) {
    $scope.navs = NavigationSevice.get();
    
  }
  
})();