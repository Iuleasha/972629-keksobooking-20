'use strict';

(function () {
  var PROPERTY_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var createCardPopup = function (card) {
    var mapCard = window.variables.cardTemplate.content.querySelector('.map__card').cloneNode(true);

    mapCard.querySelector('.popup__title').textContent = card.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = card.offer.address();
    mapCard.querySelector('.popup__text--price').innerHTML = card.offer.price + '₽<span>/ночь</span>';
    mapCard.querySelector('.popup__type').textContent = PROPERTY_TYPES[card.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(createPopUpFeatures(card.offer.features));
    mapCard.querySelector('.popup__description').textContent = card.offer.description;
    mapCard.querySelector('.popup__photos').innerHTML = '';
    mapCard.querySelector('.popup__photos').appendChild(createPopUpPhotos(card.offer.photos));
    mapCard.querySelector('.popup__avatar').src = card.author.avatar;

    return mapCard;
  };
  var createPopUpFeatures = function (features) {
    var fragmet = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');

      feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
      fragmet.appendChild(feature);
    }

    return fragmet;
  };
  var createPopUpPhotos = function (photos) {
    var fragmet = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var imageTemplate = window.variables.cardTemplate.content.querySelector('.popup__photo').cloneNode();

      imageTemplate.src = photos[i];
      fragmet.appendChild(imageTemplate);
    }

    return fragmet;
  };
  var closeCardPopUp = function () {
    var card = window.variables.map.querySelector('.map__card');

    if (card) {
      card.remove();

      document.removeEventListener('keydown', onEscPress);
    }
  };
  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeCardPopUp();
    }
  };

  window.openCardPopUp = function (cardInfo) {
    closeCardPopUp();

    var newCard = createCardPopup(cardInfo);

    newCard.querySelector('.popup__close').addEventListener('click', function () {
      closeCardPopUp();
    });

    window.variables.map.insertBefore(newCard, window.variables.mapFiltersContainer);

    document.addEventListener('keydown', onEscPress);
  };
})();
