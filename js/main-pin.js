'use strict';

(function () {
  var PIN_ARROW_HEIGHT = 22;
  var mapPinMain = document.querySelector('.map__pin--main');

  var setMainPinCoordinates = function () {
    var mainPinWidth = mapPinMain.offsetWidth;
    var mainPinHeight = mapPinMain.offsetHeight;
    var mainPinTop = mapPinMain.offsetTop;
    var mainPinLeft = mapPinMain.offsetLeft;

    if (!window.map.isActive) {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight / 2));
    } else {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight + PIN_ARROW_HEIGHT));
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activateMap();
    }
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.map.activateMap();
    }
  });

  window.mainPin = {
    setMainPinCoordinates: setMainPinCoordinates,
  };
})();
