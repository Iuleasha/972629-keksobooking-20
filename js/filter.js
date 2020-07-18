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
  var offersFeatures = mapFiltersWrapper.querySelectorAll('.map__checkbox');

  var enableFilter = function () {
    housingTypeSelect.addEventListener('input', filterOffers);
    housingPriceSelect.addEventListener('input', filterOffers);
    housingRoomsSelect.addEventListener('input', filterOffers);
    housingGuestsSelect.addEventListener('input', filterOffers);

    for (var i = 0; i < offersFeatures.length; i++) {
      offersFeatures[i].addEventListener('input', filterOffers);
    }

    mapFiltersWrapper.querySelector('fieldset').removeAttribute('disabled');
    window.utils.removeDisableStatus(allSelects);
  };

  var disableFilter = function () {
    housingTypeSelect.removeEventListener('input', filterOffers);
    housingPriceSelect.removeEventListener('input', filterOffers);
    housingRoomsSelect.removeEventListener('input', filterOffers);
    housingGuestsSelect.removeEventListener('input', filterOffers);

    for (var i = 0; i < offersFeatures.length; i++) {
      offersFeatures[i].removeEventListener('input', filterOffers);
    }

    mapFiltersWrapper.reset();
    mapFiltersWrapper.querySelector('fieldset').setAttribute('disabled', true);
    window.utils.addDisableStatus(allSelects);
  };

  var filterOffers = window.utils.debounce(function () {
    var housingTypeValue = housingTypeSelect.value;
    var housingPriceValue = housingPriceSelect.value;
    var housingRoomsValue = housingRoomsSelect.value;
    var housingGuestsValue = housingGuestsSelect.value;
    var checkedFeatures = Array.from(mapFiltersWrapper.querySelectorAll('.map__checkbox:checked'));

    checkedFeatures = checkedFeatures.map(function (checkbox) {
      return checkbox.value;
    });

    var filteredData = window.utils.shuffleArray(window.pin.pinData).filter(function (item) {
      return compareSelectValue(item.offer.type, housingTypeValue) &&
        compareValueByPrice(item.offer.price, housingPriceValue) &&
        compareSelectValue(String(item.offer.rooms), housingRoomsValue) &&
        compareSelectValue(String(item.offer.guests), housingGuestsValue) &&
        (checkedFeatures.length === 0 || filterOffersByFeatures(checkedFeatures, item.offer.features));
    });

    window.card.closeCardPopUp();
    window.pin.clearPins();
    window.pin.setPinsToMap(filteredData);
  });

  var compareSelectValue = function (itemValue, selectValue) {
    return selectValue === 'any' || itemValue === selectValue;
  };

  var compareValueByPrice = function (itemValue, selectValue) {
    return selectValue === 'any' ||
      selectValue === 'middle' && itemValue >= MIDDLE_LOW_PRICE && itemValue <= MIDDLE_HIGH_PRICE ||
      selectValue === 'low' && itemValue > MIDDLE_LOW_PRICE ||
      selectValue === 'high' && itemValue > MIDDLE_HIGH_PRICE;
  };

  var filterOffersByFeatures = function (checkedFeatures, offerFeatures) {
    var count = 0;

    checkedFeatures.forEach(function (val) {
      if (offerFeatures.includes(val)) {
        count++;
      }
    });

    return count === checkedFeatures.length;
  };

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter,
  };
})();
