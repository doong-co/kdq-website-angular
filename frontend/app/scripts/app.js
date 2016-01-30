'use strict';

angular
  .module('kdq', [
    'ngSanitize',
    'ngTouch',
    'angulartics', 
    'angulartics.google.analytics',
    'angulartics.inspectlet',
    'ui.router',
    'kdq.services',
    'kdq.widgets',
    'kdq.layout',
    'kdq.home',
    'kdq.our_services',
    'kdq.about_us',
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
