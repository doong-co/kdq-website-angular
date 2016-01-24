'use strict';

(function() {
  angular.module('kdq.widgets')
    .directive('kdqParticles', kdqParticlesDirective)
    .service('ParticlesService', ParticlesService);

  // @ngInject
  function kdqParticlesDirective(ParticlesService) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
        var particleId = 'particle-' + Date.now();
        $element.attr('id', particleId);

        ParticlesService.add(particleId);

        $scope.$on('$destroy', function() {
          ParticlesService.remove(particleId);
        });
      }
    };
  }

  // @ngInject
  function ParticlesService($window, $log, _) {
    var optionDefault = {
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
          "speed": 4,
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
    };

    _.extend(this, {
      add: function(particleId) {
        if (!_.isFunction($window.particlesJS)) {
          $log.error('particlesJS is not function');
        } else {
          $window.particlesJS(particleId, optionDefault);
        }
      },
      remove: function(particleId) {
        var particleIndex = _.findIndex($window.pJSDom, function(p) {
          return p.pJS.canvas.el.parentElement.id === particleId;
        });

        var particle = $window.pJSDom[particleIndex].pJS;
        $window.pJSDom.splice(particleIndex, 1);

        $window.cancelAnimationFrame(particle.fn.drawAnimFrame);
        particle.canvas.el.remove();
      }
    });
  }
  
})();
