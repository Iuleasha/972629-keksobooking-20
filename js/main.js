'use strict';

(function () {
  var isActive = false;

  var deactivatePage = function () {
    isActive = false;
    window.map.disable();
    window.form.disable();
    window.form.updateAddress();
  };

  var activatePage = function () {
    if (isActive) {
      return;
    }

    isActive = true;

    window.map.enable();
    window.form.enable();
    window.form.updateAddress();
    window.data.loadData(onSuccess, onError);
  };

  var onSuccess = function (data) {
    window.map.setData(data);
  };

  var onError = function (errorMessage) {
    window.error.show(errorMessage);
  };

  var getIsActive = function () {
    return isActive;
  };

  window.main = {
    isActive: getIsActive,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };

  deactivatePage();
})();
