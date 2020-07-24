'use strict';

(function () {
  var mapPinsWrapper = document.querySelector('.map__pins');

  var createPin = function (pinInfo) {
    var pinTemplate = document.querySelector('#pin');
    var pin = pinTemplate.content.querySelector('.map__pin').cloneNode(true);

    pin.style.left = pinInfo.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinInfo.location.y - pin.offsetHeight + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;

    pin.addEventListener('click', function () {
      window.card.open(pinInfo);
    });

    return pin;
  };

  var setPinData = function (data) {
    var filteredData = data.filter(function (item) {
      return item.hasOwnProperty('offer');
    });

    window.pin.data = filteredData;

    setPinsToMap(filteredData);
  };

  var setPinsToMap = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      fragment.appendChild(createPin(item));
    });

    mapPinsWrapper.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = mapPinsWrapper.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    setData: setPinData,
    setToMap: setPinsToMap,
    mapWrapper: mapPinsWrapper,
    clear: clearPins,
    data: [],
  };
})();
