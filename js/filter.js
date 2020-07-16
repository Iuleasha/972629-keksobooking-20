'use strict';

(function () {
  var enableFilter = function () {
    getFilterWrapper().querySelector('fieldset').setAttribute('disabled', true);
    window.utils.removeDisableStatus(selectFilter());
  };

  var disableFilter = function () {
    getFilterWrapper().removeAttribute('disabled');
    window.utils.addDisableStatus(selectFilter());
  };

  var getFilterWrapper = function () {
    return document.querySelector('.map__filters');
  };

  var selectFilter = function () {
    return getFilterWrapper().querySelectorAll('select');
  };

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter,
  };
})();
