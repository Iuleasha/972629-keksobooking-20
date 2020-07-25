'use strict';

(function () {
  var MIDDLE_LOW_PRICE = 10000;
  var MIDDLE_HIGH_PRICE = 50000;
  var mapFiltersWrapper = document.querySelector('.map__filters');
  var allSelects = mapFiltersWrapper.querySelectorAll('select');
  var housingTypeSelect = mapFiltersWrapper.querySelector('#housing-type');
  var housingPriceSelect = mapFiltersWrapper.querySelector('#housing-price');
  var housingRoomsSelect = mapFiltersWrapper.querySelector('#housing-rooms');
  var housingGuestsSelect = mapFiltersWrapper.querySelector('#housing-guests');

  var enableFilter = function () {
    mapFiltersWrapper.addEventListener('change', onFormChangeDebounce);
    mapFiltersWrapper.querySelector('fieldset').removeAttribute('disabled');
    window.utils.removeDisableStatus(allSelects);
  };

  var disableFilter = function () {
    mapFiltersWrapper.removeEventListener('change', onFormChangeDebounce);
    mapFiltersWrapper.reset();
    mapFiltersWrapper.querySelector('fieldset').setAttribute('disabled', true);
    window.utils.addDisableStatus(allSelects);
  };

  var onFormChangeDebounce = window.utils.debounce(function () {
    window.map.updatePins();
  });

  var filterOffers = function (data) {
    var housingTypeValue = housingTypeSelect.value;
    var housingPriceValue = housingPriceSelect.value;
    var housingRoomsValue = housingRoomsSelect.value;
    var housingGuestsValue = housingGuestsSelect.value;
    var checkedFeatures = Array.from(mapFiltersWrapper.querySelectorAll('.map__checkbox:checked'));

    checkedFeatures = checkedFeatures.map(function (checkbox) {
      return checkbox.value;
    });

    return data.filter(function (item) {
      return compareSelectValue(item.offer.type, housingTypeValue) &&
        compareValueByPrice(item.offer.price, housingPriceValue) &&
        compareSelectValue(String(item.offer.rooms), housingRoomsValue) &&
        compareSelectValue(String(item.offer.guests), housingGuestsValue) &&
        (checkedFeatures.length === 0 || filterOffersByFeatures(checkedFeatures, item.offer.features));
    });
  };

  var compareSelectValue = function (itemValue, selectValue) {
    return selectValue === 'any' || itemValue === selectValue;
  };

  var compareValueByPrice = function (itemValue, selectValue) {
    switch (selectValue) {
      case 'middle':
        return itemValue >= MIDDLE_LOW_PRICE && itemValue <= MIDDLE_HIGH_PRICE;
      case 'low':
        return itemValue > MIDDLE_LOW_PRICE;
      case 'high':
        return itemValue > MIDDLE_HIGH_PRICE;
      default:
        return true;
    }
  };

  var filterOffersByFeatures = function (checkedFeatures, offerFeatures) {
    return checkedFeatures.every(function (val) {
      return offerFeatures.includes(val);
    });
  };

  window.filter = {
    apply: filterOffers,
    disable: disableFilter,
    enable: enableFilter,
  };
})();
