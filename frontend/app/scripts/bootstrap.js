'use strict';

(function($, angular) {
  

  var styleMap = [{
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [{
      "visibility": "on"
    }, {
      "saturation": "-2"
    }, {
      "lightness": "-8"
    }, {
      "gamma": "1.26"
    }, {
      "weight": "1.22"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "labels.text",
    "stylers": [{
      "lightness": "-15"
    }, {
      "gamma": "1.57"
    }, {
      "weight": "0.01"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#979797"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
      "color": "#f2f2f2"
    }]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [{
      "saturation": -100
    }, {
      "lightness": 45
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
      "color": "#c9e4ee"
    }, {
      "visibility": "on"
    }]
  }];

  $(document).ready(function() {
    angular.bootstrap(document, ['kdq']);
    
    // var mapUS = new GMaps({
    //   el: '#map-us',
    //   lat: 33.6651392,
    //   lng: -84.5173652,
    //   scrollwheel: false
    // });
    // var mapVN = new GMaps({
    //   el: '#map-vn',
    //   lat: 10.7409917,
    //   lng: 106.698449,
    //   scrollwheel: false
    // });

    // mapUS.addStyle({
    //   styledMapName: "Styled Map",
    //   styles: styleMap,
    //   mapTypeId: "map_style"
    // });

    // mapUS.setStyle("map_style");

    // mapVN.addStyle({
    //   styledMapName: "Styled Map",
    //   styles: styleMap,
    //   mapTypeId: "map_style"
    // });

    // mapVN.setStyle("map_style");

    // var pattern = Trianglify();
    // var $bgOverlay = $('.bg-overlay');
    // _.each($bgOverlay, function(bg) {
    //   pattern.canvas(bg);
    // });

  });

})(window.jQuery, window.angular);
