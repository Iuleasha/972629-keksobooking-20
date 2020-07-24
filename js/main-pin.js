'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

  var setMainPinCoordinates = function () {
    if (!window.map.isActive) {
      mapPinMain.removeAttribute('style');
      window.form.setAddress(Math.round(mapPinMain.offsetLeft + mainPinWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mainPinHeight / 2));
    } else {
      window.form.setAddress(Math.round(mapPinMain.offsetLeft + mainPinWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mainPinHeight));
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0 && !window.map.isActive) {
      window.map.activateMap();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var underMoveElement = document.elementFromPoint(moveEvt.clientX, moveEvt.clientY);

      if (!underMoveElement) {
        return;
      }

      var mapPins = underMoveElement.closest('.map__pins');

      if (!mapPins) {
        return;
      }

      var mapClientRect = window.pin.mapWrapper.getBoundingClientRect();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var top = setCoordinates(mapPinMain.offsetTop - shift.y, MIN_MAP_HEIGHT, MAX_MAP_HEIGHT, mainPinHeight);
      var left = setCoordinates(mapPinMain.offsetLeft - shift.x, 0, mapClientRect.width, mainPinWidth / 2);

      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';

      setMainPinCoordinates();
    };

    var setCoordinates = function (current, min, max, pinSize) {
      if (current <= min - pinSize) {
        return min - pinSize;
      } else if (current >= max - pinSize) {
        return max - pinSize;
      } else {
        return current;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();

        mapPinMain.removeEventListener('click', onClickPreventDefault);
      };

      mapPinMain.addEventListener('click', onClickPreventDefault);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      window.map.activateMap();
    }
  });

  window.mainPin = {
    mapPinMain: mapPinMain,
    setMainPinCoordinates: setMainPinCoordinates,
  };
})();
