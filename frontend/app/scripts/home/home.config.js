'use strict';

(function() {

  angular
    .module('kdq.home', [])
    .config(function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'scripts/home/home.html',
          nav: {
            title: 'Home'
          },
          controller: 'HomeController'
        });
    });

})();