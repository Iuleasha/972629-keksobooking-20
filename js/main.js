'use strict';

(function () {
  var deactivatePage = function () {
    window.map.isActive = false;
    window.filter.disable();
    window.form.disable();
    window.mainPin.setMainPinCoordinates();
    window.card.map.classList.add('map--faded');
    window.pin.clear();
  };

  var activatePage = function () {
    window.filter.enable();
    window.form.enable();
    window.mainPin.setMainPinCoordinates();
  };

  deactivatePage();

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
