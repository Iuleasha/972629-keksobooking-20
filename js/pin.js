'use strict';

(function () {
  var mapPinsWrapper = document.querySelector('.map__pins');

  var creatPin = function (pinInfo) {
    var pinTemplate = document.querySelector('#pin');
    var pin = pinTemplate.content.querySelector('.map__pin').cloneNode(true);

    pin.style.left = pinInfo.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinInfo.location.y - pin.offsetHeight + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;

    pin.addEventListener('click', function () {
      window.card.openCardPopUp(pinInfo);
    });

    return pin;
  };

  var setPinData = function (data) {
    var filteredData = data.filter(function (item) {
      return item.hasOwnProperty('offer');
    });

    window.pin.pinData = filteredData;

    setPinsToMap(filteredData);
  };

  var setPinsToMap = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 5 && i < data.length; i++) {
      fragment.appendChild(creatPin(data[i]));
    }

    mapPinsWrapper.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = mapPinsWrapper.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins.length > 0) {
      for (var i = 0; i < pins.length; i++) {
        mapPinsWrapper.removeChild(pins[i]);
      }
    }
  };

  window.pin = {
    setPinData: setPinData,
    setPinsToMap: setPinsToMap,
    mapPinsWrapper: mapPinsWrapper,
    clearPins: clearPins,
    pinData: [],
  };
})();
