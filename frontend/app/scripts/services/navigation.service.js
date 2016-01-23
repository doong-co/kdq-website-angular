'use strict';

(function() {

  angular
    .module('kdq.services')
    .service('NavigationSevice', navigationSevice);

  // @ngInject
  function navigationSevice($state, _) {
    _.extend(this, {
      get: function() {
        var navs = [];

        _.each($state.get(), function(state) {
          if(_.isObject(state.nav)) {
            var nav = angular.copy(state.nav);
            nav.stateName = state.name;
            navs.push(nav);
          }
        });

        return navs;
      }
    });
  }

})();