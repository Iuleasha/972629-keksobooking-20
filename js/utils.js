'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var addDisableStatus = function (array) {
    array.forEach(function (item) {
      item.setAttribute('disabled', true);
    });
  };

  var removeDisableStatus = function (array) {
    array.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    addDisableStatus: addDisableStatus,
    removeDisableStatus: removeDisableStatus,
    debounce: debounce,
  };
})();
