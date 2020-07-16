'use strict';

(function () {
  var enableFilter = function () {
    getFilterWrapper().removeAttribute('disabled');
    window.utils.removeDisableStatus(selectFilter());
  };

  var disableFilter = function () {
    getFilterWrapper().reset();
    getFilterWrapper().querySelector('fieldset').setAttribute('disabled', true);
    window.utils.addDisableStatus(selectFilter());
  };

  var getFilterWrapper = function () {
    return document.querySelector('.map__filters');
  };

  var selectFilter = function () {
    return getFilterWrapper().querySelectorAll('select');
  };

  var housingTypeFilter = function () {
    var housingType = document.querySelector('#housing-type');

    housingType.addEventListener('input', function () {
      window.pin.clearPins();
      window.card.closeCardPopUp();
      var value = housingType.value;

      if (value === 'any') {
        window.pin.setPinsToMap(window.pin.pinData);

        return;
      }

      var filteredData = window.pin.pinData.filter(function (item) {
        return item.offer.type === value;
      });

      window.pin.setPinsToMap(filteredData);
    });
  };

  housingTypeFilter();

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter,
  };
})();
