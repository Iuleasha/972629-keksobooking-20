'use strict';

(function () {
  var deactivatePage = function () {
    window.map.isActive = false;
    window.filter.disableFilter();
    window.form.disableForm();
    window.mainPin.setMainPinCoordinates();
    window.card.map.classList.add('map--faded');
  };

  var activatePage = function () {
    window.filter.enableFilter();
    window.form.enableForm();
    window.mainPin.setMainPinCoordinates();
  };

  deactivatePage();

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
