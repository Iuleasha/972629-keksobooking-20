'use strict';

(function () {
  var activateMap = function () {
    if (window.map.isActive) {
      return;
    }

    window.map.isActive = true;
    window.card.map.classList.remove('map--faded');
    window.pin.setPinsToMap();
    window.main.activatePage();
  };

  window.map = {
    isActive: false,
    activateMap: activateMap,
  };
})();
