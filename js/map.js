'use strict';

(function () {
  var MAX_PINS = 5;
  var map = document.querySelector('.map');
  var mapPinsWrapper = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var data = [];

  var enable = function () {
    map.classList.remove('map--faded');
    window.filter.enable();
  };

  var disable = function () {
    map.classList.add('map--faded');
    clearPins();
    closeCard();
    window.mainPin.reset();
    window.filter.disable();
  };

  var setData = function (arr) {
    data = arr.filter(function (item) {
      return item.hasOwnProperty('offer');
    });

    updatePins();
  };

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.slice(0, MAX_PINS).forEach(function (item) {
      fragment.appendChild(window.pin.create(item));
    });

    mapPinsWrapper.appendChild(fragment);
  };

  var clearPins = function () {
    var pins = mapPinsWrapper.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (element) {
      element.remove();
    });
  };

  var updatePins = function () {
    clearPins();
    closeCard();
    renderPins(window.filter.apply(data));
  };

  var closeCard = function () {
    var card = map.querySelector('.map__card');

    if (card) {
      card.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      window.pin.removeActiveClass();
      closeCard();
    }
  };

  var openCard = function (cardInfo) {
    closeCard();

    var newCard = window.card.create(cardInfo);

    newCard.querySelector('.popup__close').addEventListener('click', function () {
      window.pin.removeActiveClass();
      closeCard();
    });

    map.insertBefore(newCard, mapFiltersContainer);

    document.addEventListener('keydown', onEscPress);
  };

  window.map = {
    disable: disable,
    enable: enable,
    setData: setData,
    updatePins: updatePins,
    openCard: openCard,
  };
})();
