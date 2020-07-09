'use strict';

(function () {
  var mapPinsWrapper = document.querySelector('.map__pins');
  var PIN_ARROW_HEIGHT = 22;

  var creatPin = function (pinInfo) {
    var pinTemplate = document.querySelector('#pin');
    var pin = pinTemplate.content.querySelector('.map__pin').cloneNode(true);

    pin.style.left = pinInfo.offer.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinInfo.offer.location.y - pin.offsetHeight - PIN_ARROW_HEIGHT + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;

    pin.addEventListener('click', function () {
      window.card.openCardPopUp(pinInfo);
    });

    return pin;
  };

  var setPinsToMap = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.cards.length; i++) {
      fragment.appendChild(creatPin(window.data.cards[i]));
    }

    mapPinsWrapper.appendChild(fragment);
  };

  window.pin = {
    setPinsToMap: setPinsToMap,
    mapPinsWrapper: mapPinsWrapper,
    pinArrowHeight: PIN_ARROW_HEIGHT
  };
})();
