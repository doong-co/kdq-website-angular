'use strict';

(function() {
  angular.module('kdq.widgets')
    .directive('kdqStaticMap', kdqStaticMapDirective);

  // @ngInject
  function kdqStaticMapDirective() {
    return {
      restrict: 'A',
      scope: {
        styles: '=kdqStaticMap',
        markers: '=kdqStaticMapMarkers'
      },
      template: '<a href="{{::mapUrl}}" target="_blank"><img alt="{{::address}}" ng-src="{{::staticUrl}}" height="100%" width="100%"></a>',
      link: function($scope, $element, $attr) {
        var options = {
          size: [$element.width(), $element.height()],
          lat: $attr.lat,
          lng: $attr.lng,
          zoom: 14,
          scale: 2,
          address: $attr.address,
          styles: $scope.styles || getStylesGoldBlue(),
          markers: $scope.markers || [{
            lat: $attr.lat,
            lng: $attr.lng
          }]
        }
        $scope.address = $attr.address;
        $scope.mapUrl = getMapUrl(options);
        $scope.staticUrl = getStaticMapURL(options);
      }
    };
  }

  function getMapUrl(options) {
    var url = location.protocol + "//www.google.com/maps/place/";
    url += options.address + "/@";
    url += options.lat + "," + options.lng;
    return url;
  }

  function getStaticMapURL(options) {
    var parameters = [],
      data,
      static_root = (location.protocol === 'file:' ? 'http:' : location.protocol) + '//maps.googleapis.com/maps/api/staticmap';

    if (options.url) {
      static_root = options.url;
      delete options.url;
    }

    static_root += '?';

    var markers = options.markers;

    delete options.markers;

    if (!markers && options.marker) {
      markers = [options.marker];
      delete options.marker;
    }

    var styles = options.styles;

    delete options.styles;

    var polyline = options.polyline;
    delete options.polyline;

    /** Map options **/
    if (options.center) {
      parameters.push('center=' + options.center);
      delete options.center;
    } else if (options.address) {
      parameters.push('center=' + options.address);
      delete options.address;
    } else if (options.lat) {
      parameters.push(['center=', options.lat, ',', options.lng].join(''));
      delete options.lat;
      delete options.lng;
    } else if (options.visible) {
      var visible = encodeURI(options.visible.join('|'));
      parameters.push('visible=' + visible);
    }

    var size = options.size;
    if (size) {
      if (size.join) {
        size = size.join('x');
      }
      delete options.size;
    } else {
      size = '630x300';
    }
    parameters.push('size=' + size);

    if (!options.zoom && options.zoom !== false) {
      options.zoom = 15;
    }

    var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
    delete options.sensor;
    parameters.push('sensor=' + sensor);

    for (var param in options) {
      if (options.hasOwnProperty(param)) {
        parameters.push(param + '=' + options[param]);
      }
    }

    /** Markers **/
    if (markers) {
      var marker, loc;

      for (var i = 0; data = markers[i]; i++) {
        marker = [];

        if (data.size && data.size !== 'normal') {
          marker.push('size:' + data.size);
          delete data.size;
        } else if (data.icon) {
          marker.push('icon:' + encodeURI(data.icon));
          delete data.icon;
        }

        if (data.color) {
          marker.push('color:' + data.color.replace('#', '0x'));
          delete data.color;
        }

        if (data.label) {
          marker.push('label:' + data.label[0].toUpperCase());
          delete data.label;
        }

        loc = (data.address ? data.address : data.lat + ',' + data.lng);
        delete data.address;
        delete data.lat;
        delete data.lng;

        for (var param in data) {
          if (data.hasOwnProperty(param)) {
            marker.push(param + ':' + data[param]);
          }
        }

        if (marker.length || i === 0) {
          marker.push(loc);
          marker = marker.join('|');
          parameters.push('markers=' + encodeURI(marker));
        }
        // New marker without styles
        else {
          marker = parameters.pop() + encodeURI('|' + loc);
          parameters.push(marker);
        }
      }
    }

    /** Map Styles **/
    if (styles) {
      for (var i = 0; i < styles.length; i++) {
        var styleRule = [];
        if (styles[i].featureType) {
          styleRule.push('feature:' + styles[i].featureType.toLowerCase());
        }

        if (styles[i].elementType) {
          styleRule.push('element:' + styles[i].elementType.toLowerCase());
        }

        for (var j = 0; j < styles[i].stylers.length; j++) {
          for (var p in styles[i].stylers[j]) {
            var ruleArg = styles[i].stylers[j][p];
            if (p == 'hue' || p == 'color') {
              ruleArg = '0x' + ruleArg.substring(1);
            }
            styleRule.push(p + ':' + ruleArg);
          }
        }

        var rule = styleRule.join('|');
        if (rule != '') {
          parameters.push('style=' + rule);
        }
      }
    }

    /** Polylines **/
    function parseColor(color, opacity) {
      if (color[0] === '#') {
        color = color.replace('#', '0x');

        if (opacity) {
          opacity = parseFloat(opacity);
          opacity = Math.min(1, Math.max(opacity, 0));
          if (opacity === 0) {
            return '0x00000000';
          }
          opacity = (opacity * 255).toString(16);
          if (opacity.length === 1) {
            opacity += opacity;
          }

          color = color.slice(0, 8) + opacity;
        }
      }
      return color;
    }

    if (polyline) {
      data = polyline;
      polyline = [];

      if (data.strokeWeight) {
        polyline.push('weight:' + parseInt(data.strokeWeight, 10));
      }

      if (data.strokeColor) {
        var color = parseColor(data.strokeColor, data.strokeOpacity);
        polyline.push('color:' + color);
      }

      if (data.fillColor) {
        var fillcolor = parseColor(data.fillColor, data.fillOpacity);
        polyline.push('fillcolor:' + fillcolor);
      }

      var path = data.path;
      if (path.join) {
        for (var j = 0, pos; pos = path[j]; j++) {
          polyline.push(pos.join(','));
        }
      } else {
        polyline.push('enc:' + path);
      }

      polyline = polyline.join('|');
      parameters.push('path=' + encodeURI(polyline));
    }

    /** Retina support **/
    var dpi = window.devicePixelRatio || 1;
    parameters.push('scale=' + dpi);

    parameters = parameters.join('&');
    return static_root + parameters;
  }

  function getStyles() {
    return [{
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }, {
        "gamma": "1.82"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "gamma": "1.96"
      }, {
        "lightness": "-9"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "lightness": "25"
      }, {
        "gamma": "1.00"
      }, {
        "saturation": "-100"
      }]
    }, {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "hue": "#ffaa00"
      }, {
        "saturation": "-43"
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "hue": "#ffaa00"
      }, {
        "saturation": "-70"
      }]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }, {
        "saturation": "-100"
      }, {
        "lightness": "30"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [{
        "saturation": "-100"
      }, {
        "lightness": "40"
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [{
        "visibility": "on"
      }, {
        "gamma": "0.80"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }];
  }

  function getStylesGoldBlue() {
    return [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"23"},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#8396d7"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"hue":"#ff0000"},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#efe0c3"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#85a1ca"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"invert_lightness":true}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"invert_lightness":true}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4f3"},{"visibility":"on"}]}];
  }

  function getStylesGray() {
    return [{
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
  }
})();
