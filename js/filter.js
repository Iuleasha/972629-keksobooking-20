'use strict';

(function () {
  var disableFilter = function (status) {
    var filterWrapper = document.querySelector('.map__filters');
    var selectFilter = filterWrapper.querySelectorAll('select');

    if (status) {
      filterWrapper.querySelector('fieldset').setAttribute('disabled', status);
    } else {
      filterWrapper.removeAttribute('disabled');
    }

    window.utils.switchDisableStatus(selectFilter, status);
  };

  window.filter = {
    disableFilter: disableFilter,
  };
})();
