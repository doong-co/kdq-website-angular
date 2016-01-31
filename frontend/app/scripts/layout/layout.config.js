'use strict';

(function() {

  angular
    .module('kdq.layout', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.otherwise('/404');
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('404', {
          url: '/404',
          templateUrl: 'scripts/layout/404.html',
          layout: {
            hideFooter: true
          }
        });
    });

})();