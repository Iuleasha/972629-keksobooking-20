'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;
  var mapClientRect = window.pin.mapPinsWrapper.getBoundingClientRect();
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

  var setMainPinCoordinates = function () {
    var mainPinTop = mapPinMain.offsetTop;
    var mainPinLeft = mapPinMain.offsetLeft;

    if (!window.map.isActive) {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight / 2));
    } else {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight));
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


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (mapPinMain.offsetTop - shift.y + mainPinHeight >= MAX_MAP_HEIGHT ||
        mapPinMain.offsetTop - shift.y + mainPinHeight < MIN_MAP_HEIGHT ||
        mapPinMain.offsetLeft - shift.x + mainPinWidth < mapClientRect.left ||
        mapPinMain.offsetLeft - shift.x + mainPinWidth > mapClientRect.right) {
        return;
      }

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      setMainPinCoordinates();
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
