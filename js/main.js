'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Внезапно, преступность никогда не была такой неорганизованной', 'Консультация с широким активом одухотворила всех причастных', 'Воистину радостный звук: полуночный пёсий вой', 'Никте не вправе осуждать звон колоколов', 'Есть над чем задуматься: зима близко', 'Давайте не будем укрепляться в мысли, что кровь стынет в жилах!', 'Подтверждено: героям были возданы соответствующие почести', 'Нашу победу сопровождал детский заливистый смех'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinTemplate = document.querySelector('#pin');
var map = document.querySelector('.map');
var mapPinsWrapper = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var getRandomItemFromArray = function (array) {
  var randomArrayItemIndex = Math.floor(Math.random() * array.length);

  return array[randomArrayItemIndex];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var sliceArrayWithRandomLength = function (array) {
  return array.slice(0, getRandomNumber(1, array.length));
};

var shuffleArray = function (array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
};

var createCardsArray = function (arrayLength) {
  var cards = [];

  for (var i = 1; i <= arrayLength; i++) {
    cards.push(createCard(i));
  }

  return cards;
};

var createCard = function (index) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png',
    },
    'offer': {
      'title': getRandomItemFromArray(TITLES),
      'address': function () {
        return this.location.x + ', ' + this.location.y;
      },
      'price': getRandomNumber(1, 50000),
      'type': getRandomItemFromArray(TYPES),
      'rooms': getRandomNumber(1, 3),
      'guests': getRandomNumber(0, 2),
      'checkin': getRandomItemFromArray(TIMES),
      'checkout': getRandomItemFromArray(TIMES),
      'features': sliceArrayWithRandomLength(shuffleArray(FEATURES)),
      'description': getRandomItemFromArray(DESCRIPTIONS),
      'photos': sliceArrayWithRandomLength(shuffleArray(PHOTOS)),
      'location': {
        'x': getRandomNumber(0, map.offsetWidth),
        'y': getRandomNumber(130, 630),
      },
    },
  };
};

var setPinsToMap = function () {
  var fragment = document.createDocumentFragment();
  var cards = createCardsArray(8);

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(creatPin(cards[i]));
  }

  mapPinsWrapper.appendChild(fragment);
  map.insertBefore(createCardDescription(cards[0]), mapFiltersContainer);
};

var creatPin = function (pinInfo) {
  var pin = pinTemplate.content.querySelector('.map__pin').cloneNode(true);

  pin.style.left = pinInfo.offer.location.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = pinInfo.offer.location.y - pin.offsetHeight + 'px';

  var pinImg = pin.querySelector('img');

  pinImg.src = pinInfo.author.avatar;
  pinImg.alt = pinInfo.offer.title;

  return pin;
};

var createCardDescription = function (card) {
  var mapCard = cardTemplate.content.querySelector('.map__card').cloneNode(true);
  var propertyType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  mapCard.querySelector('.popup__title').textContent = card.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = card.offer.address();
  mapCard.querySelector('.popup__text--price').innerHTML = card.offer.price + '₽<span>/ночь</span>';
  mapCard.querySelector('.popup__type').textContent = propertyType[card.offer.type];
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
    var feature = document.createElement('div');

    feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
    fragmet.appendChild(feature);
  }

  return fragmet;
};

var createPopUpPhotos = function (photos) {
  var fragmet = document.createDocumentFragment();
  var attributes = {
    class: 'popup__photo',
    width: '45',
    height: '40',
    alt: 'Фотография жилья',
  };

  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.src = photos[i];

    for (var key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        photo.setAttribute(key, attributes[key]);
      }
    }

    fragmet.appendChild(photo);
  }

  return fragmet;
};

setPinsToMap();
