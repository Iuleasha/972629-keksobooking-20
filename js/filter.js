'use strict';

(function () {
  var mapFiltersWrapper = document.querySelector('.map__filters');
  var allSelects = mapFiltersWrapper.querySelectorAll('select');
  var housingTypeSelect = mapFiltersWrapper.querySelector('#housing-type');

  var enableFilter = function () {
    housingTypeSelect.addEventListener('input', filterOffers);
    mapFiltersWrapper.querySelector('fieldset').removeAttribute('disabled');
    window.utils.removeDisableStatus(allSelects);
  };

  var disableFilter = function () {
    housingTypeSelect.removeEventListener('input', filterOffers);
    mapFiltersWrapper.reset();
    mapFiltersWrapper.querySelector('fieldset').setAttribute('disabled', true);
    window.utils.addDisableStatus(allSelects);
  };

  var filterOffers = function () {
    var housingTypeValue = housingTypeSelect.value;

    var filteredData = window.pin.pinData.filter(function (item) {
      return compareSelectValue(item.offer.type, housingTypeValue);
    });

    window.card.closeCardPopUp();
    window.pin.clearPins();
    window.pin.setPinsToMap(filteredData);
  };

  var compareSelectValue = function (itemValuse, selectValue) {
    return selectValue === 'any' || itemValuse === selectValue;
  };

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter,
  };
})();
