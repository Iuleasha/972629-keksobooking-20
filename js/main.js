'use strict';

(function () {
  var deactivatePage = function () {
    window.map.isActive = false;
    window.filter.disableFilter(true);
    window.form.disableForm(true);
    window.mainPin.setMainPinCoordinates();
    window.card.map.classList.add('map--faded');
  };

  var activatePage = function () {
    window.filter.disableFilter(false);
    window.form.disableForm(false);
    window.mainPin.setMainPinCoordinates();
  };

  deactivatePage();

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
