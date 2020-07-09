'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainPinWidth = mapPinMain.offsetWidth;
  var mainPinHeight = mapPinMain.offsetHeight;
  var mapClientRect = window.pin.mapPinsWrapper.getBoundingClientRect();

  var setMainPinCoordinates = function () {
    var mainPinTop = mapPinMain.offsetTop;
    var mainPinLeft = mapPinMain.offsetLeft;

    if (!window.map.isActive) {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight / 2));
    } else {
      window.form.setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight + window.pin.pinArrowHeight));
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

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.pageY >= window.data.maxMapHeight || moveEvt.pageY < window.data.minMapHeight || moveEvt.pageX < mapClientRect.left || moveEvt.pageX > mapClientRect.right) {
        return;
      }

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();

          setMainPinCoordinates();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
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
