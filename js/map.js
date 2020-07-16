'use strict';

(function () {
  var activateMap = function () {
    if (window.map.isActive) {
      return;
    }

    window.map.isActive = true;
    window.card.map.classList.remove('map--faded');
    if (window.pin.pinData.length > 0) {
      window.pin.setPinsToMap(window.pin.pinData);
    } else {
      window.data.loadData(window.pin.getPinData);
    }
    window.main.activatePage();
  };

  window.map = {
    isActive: false,
    activateMap: activateMap,
  };
})();
