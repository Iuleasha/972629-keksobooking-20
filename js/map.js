'use strict';

(function () {
  window.activateMap = function () {
    if (window.variables.isActive) {
      return;
    }

    window.variables.isActive = true;
    window.variables.map.classList.remove('map--faded');
    window.setPinsToMap();
    window.disableFilter(false);
    window.form.disableForm(false);
    window.setMainPinCoordinates();
  };
})();
