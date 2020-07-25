'use strict';

(function () {
  var PROPERTY_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCardPopup = function (card) {
    var mapCard = cardTemplate.cloneNode(true);

    if (card.offer.title) {
      mapCard.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      mapCard.removeChild(mapCard.querySelector('.popup__title'));
    }

    mapCard.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCard.querySelector('.popup__text--price').innerHTML = card.offer.price + '₽<span>/ночь</span>';
    mapCard.querySelector('.popup__type').textContent = PROPERTY_TYPES[card.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    if (card.offer.features.length > 0) {
      mapCard.querySelector('.popup__features').innerHTML = '';
      mapCard.querySelector('.popup__features').appendChild(createPopUpFeatures(card.offer.features));
    } else {
      mapCard.removeChild(mapCard.querySelector('.popup__features'));
    }

    if (card.offer.title) {
      mapCard.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      mapCard.removeChild(mapCard.querySelector('.popup__description'));
    }

    if (card.offer.photos.length > 0) {
      mapCard.querySelector('.popup__photos').innerHTML = '';
      mapCard.querySelector('.popup__photos').appendChild(createPopUpPhotos(card.offer.photos));
    } else {
      mapCard.removeChild(mapCard.querySelector('.popup__photos'));
    }

    if (card.author.avatar && card.author) {
      mapCard.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      mapCard.removeChild(mapCard.querySelector('.popup__avatar'));
    }

    return mapCard;
  };

  var createPopUpFeatures = function (features) {
    var fragmet = document.createDocumentFragment();

    features.forEach(function (item) {
      var feature = document.createElement('li');

      feature.classList.add('popup__feature', 'popup__feature--' + item);
      fragmet.appendChild(feature);
    });

    return fragmet;
  };

  var createPopUpPhotos = function (photos) {
    var fragmet = document.createDocumentFragment();

    photos.forEach(function (item) {
      var imageTemplate = cardTemplate.querySelector('.popup__photo').cloneNode();

      imageTemplate.src = item;

      fragmet.appendChild(imageTemplate);
    });

    return fragmet;
  };

  window.card = {
    create: createCardPopup,
  };
})();
