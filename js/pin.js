'use strict';

(function () {
  var createPin = function (pinInfo) {
    var pinTemplate = document.querySelector('#pin');
    var pin = pinTemplate.content.querySelector('.map__pin').cloneNode(true);

    pin.style.left = pinInfo.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinInfo.location.y - pin.offsetHeight + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = pinInfo.author.avatar;
    pinImg.alt = pinInfo.offer.title;

    pin.addEventListener('click', function () {
      removeActiveClass();
      pin.classList.add('map__pin--active');
      window.map.openCard(pinInfo);
    });

    return pin;
  };


  var removeActiveClass = function () {
    var activePin = document.querySelector('.map__pin--active');

    if (!activePin) {
      return;
    }

    activePin.classList.remove('map__pin--active');
  };

  window.pin = {
    create: createPin,
    removeActiveClass: removeActiveClass,
  };
})();
