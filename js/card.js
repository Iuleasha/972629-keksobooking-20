'use strict';

(function () {
  var housingTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCardPopup = function (card) {
    var mapCard = cardTemplate.cloneNode(true);
    var popupTitle = mapCard.querySelector('.popup__title');
    var popupFeatures = mapCard.querySelector('.popup__features');
    var popupDescription = mapCard.querySelector('.popup__description');
    var popupPhotos = mapCard.querySelector('.popup__photos');
    var popupAvatar = mapCard.querySelector('.popup__avatar');

    if (card.offer.title) {
      popupTitle.textContent = card.offer.title;
    } else {
      mapCard.removeChild(popupTitle);
    }

    mapCard.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCard.querySelector('.popup__text--price').innerHTML = card.offer.price + '₽<span>/ночь</span>';
    mapCard.querySelector('.popup__type').textContent = housingTypes[card.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    if (card.offer.features.length > 0) {
      popupFeatures.innerHTML = '';
      popupFeatures.appendChild(createPopUpFeatures(card.offer.features));
    } else {
      mapCard.removeChild(popupFeatures);
    }

    if (card.offer.title) {
      popupDescription.textContent = card.offer.description;
    } else {
      mapCard.removeChild(popupDescription);
    }

    if (card.offer.photos.length > 0) {
      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(createPopUpPhotos(card.offer.photos));
    } else {
      mapCard.removeChild(popupPhotos);
    }

    if (card.author.avatar && card.author) {
      popupAvatar.src = card.author.avatar;
    } else {
      mapCard.removeChild(popupAvatar);
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
