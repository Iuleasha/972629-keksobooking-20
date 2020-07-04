'use strict';

(function () {
  var deactivatePage = function () {
    window.filter.disableFilter(true);
    window.form.disableForm(true);
    window.mainPin.setMainPinCoordinates();
  };

  var activatePage = function () {
    window.filter.disableFilter(false);
    window.form.disableForm(false);
    window.mainPin.setMainPinCoordinates();
  };

  deactivatePage();

  window.main = {
    activatePage: activatePage,
  };
})();
