'use strict';

(function () {
  var PIN_ARROW_HEIGHT = 22;
  var mapPinMain = document.querySelector('.map__pin--main');

  window.setMainPinCoordinates = function () {
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinWidth = mainPin.offsetWidth;
    var mainPinHeight = mainPin.offsetHeight;
    var mainPinTop = mainPin.offsetTop;
    var mainPinLeft = mainPin.offsetLeft;

    if (!window.variables.isActive) {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight / 2));
    } else {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight + PIN_ARROW_HEIGHT));
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.activateMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      window.activateMap();
    }
  });
})();
