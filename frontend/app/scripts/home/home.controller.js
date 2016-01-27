'use strict';

(function() {

  angular
    .module('kdq.home')
    .controller('HomeController', homeController);

  // @ngInject
  function homeController($scope, $http, $httpParamSerializer) {
    $scope.submitConnect = function() {
      $.ajax({
        url: '//formspree.io/hello@kodeq.com', 
        method: 'POST',
        data: $httpParamSerializer($scope.connect),
        dataType: "json",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res, status) {
        debugger;
      }, function(status) {
        debugger;
      });
    }
  }

})();