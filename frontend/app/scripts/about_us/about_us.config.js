'use strict';

(function() {

  angular
    .module('kdq.about_us', [])
    .config(function($stateProvider) {
      $stateProvider
        .state('about_us', {
          url: '/about-us',
          templateUrl: 'scripts/about_us/about_us.html',
          nav: {
            title: 'About us'
          }
        });
    });

})();