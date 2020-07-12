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

  var getPinsData = function () {
    window.loadData('https://javascript.pages.academy/keksobooking/data', setPinsToMap);
  };

  var setPinsToMap = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(creatPin(data[i]));
    }

    mapPinsWrapper.appendChild(fragment);
  };

  window.pin = {
    getPinsData: getPinsData,
    mapPinsWrapper: mapPinsWrapper,
  };
})();
