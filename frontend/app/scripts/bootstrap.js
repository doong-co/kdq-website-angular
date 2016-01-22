'use strict';

(function($, angular) {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  var $mainHeader = $("#main-header");
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 100) {
      $mainHeader.addClass("nav-white");
    } else {
      $mainHeader.removeClass("nav-white");
    }
  });

  var styleMap = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"-2"},{"lightness":"-8"},{"gamma":"1.26"},{"weight":"1.22"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"lightness":"-15"},{"gamma":"1.57"},{"weight":"0.01"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#979797"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c9e4ee"},{"visibility":"on"}]}];

  $(document).ready(function() {
    angular.bootstrap(document, ['kdq']);
    var mapUS = new GMaps({
      el: '#map-us',
      lat: 33.6651392,
      lng: -84.5173652,
      scrollwheel: false
    });
    var mapVN = new GMaps({
      el: '#map-vn',
      lat: 10.7409917,
      lng: 106.698449,
      scrollwheel: false
    });

    mapUS.addStyle({
      styledMapName:"Styled Map",
      styles: styleMap,
      mapTypeId: "map_style"  
    });
  
    mapUS.setStyle("map_style");

    mapVN.addStyle({
        styledMapName:"Styled Map",
        styles: styleMap,
        mapTypeId: "map_style"  
    });
    
    mapVN.setStyle("map_style");
  });

})(window.jQuery, window.angular);
