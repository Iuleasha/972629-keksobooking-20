'use strict';

(function () {
  var creatPin = function (pinInfo) {
    var pin = window.variables.pinTemplate.content.querySelector('.map__pin').cloneNode(true);

    pin.style.left = pinInfo.offer.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinInfo.offer.location.y - pin.offsetHeight + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;

    pin.addEventListener('click', function () {
      window.openCardPopUp(pinInfo);
    });

    return pin;
  };

  window.setPinsToMap = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.card.cards.length; i++) {
      fragment.appendChild(creatPin(window.card.cards[i]));
    }

    window.variables.mapPinsWrapper.appendChild(fragment);
  };
})();
