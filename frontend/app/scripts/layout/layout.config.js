'use strict';

(function() {

  angular
    .module('kdq.layout', [])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('', '/');
    });

})();