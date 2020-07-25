'use strict';

(function () {
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapWrapper = document.querySelector('.map__pins');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;

  var getCoordinates = function () {
    var x = Math.round(mapPinMain.offsetLeft + mainPinWidth / 2);
    var y = (window.main.isActive()) ? Math.round(mapPinMain.offsetTop + mainPinHeight) : Math.round(mapPinMain.offsetLeft + mainPinWidth / 2);

    return x + ', ' + y;
  };

  var reset = function () {
    mapPinMain.removeAttribute('style');
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      window.main.activatePage();
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

      var mapClientRect = mapWrapper.getBoundingClientRect();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var top = setCoordinates(mapPinMain.offsetTop - shift.y, MIN_MAP_HEIGHT - mainPinHeight, MAX_MAP_HEIGHT - mainPinHeight);
      var left = setCoordinates(mapPinMain.offsetLeft - shift.x, 0, mapClientRect.width);

      mapPinMain.style.top = top + 'px';
      mapPinMain.style.left = left + 'px';

      window.form.updateAddress();
    };

    var setCoordinates = function (current, min, max) {
      if (current <= min) {
        return min;
      } else if (current >= max) {
        return max;
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

      window.main.activatePage();
    }
  });

  window.mainPin = {
    mapPinMain: mapPinMain,
    reset: reset,
    getCoordinates: getCoordinates,
  };
})();
