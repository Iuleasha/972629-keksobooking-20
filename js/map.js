'use strict';

(function () {
  var activateMap = function () {
    if (window.map.isActive) {
      return;
    }

    window.map.isActive = true;
    window.card.map.classList.remove('map--faded');

    if (window.pin.data.length > 0) {
      window.pin.setToMap(window.pin.data);
    } else {
      window.data.loadData(window.pin.setData);
    }

    window.main.activatePage();
  };

  window.map = {
    isActive: false,
    activateMap: activateMap,
  };
})();
