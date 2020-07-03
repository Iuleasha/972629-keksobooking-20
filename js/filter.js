'use strict';

(function () {
  window.disableFilter = function (status) {
    var filterWrapper = document.querySelector('.map__filters');
    var selectFilter = filterWrapper.querySelectorAll('select');

    if (status) {
      filterWrapper.querySelector('fieldset').setAttribute('disabled', status);
    } else {
      filterWrapper.removeAttribute('disabled');
    }

    window.form.switchDisableStatus(selectFilter, status);
  };
})();
