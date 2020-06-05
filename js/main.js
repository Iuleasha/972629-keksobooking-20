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

setPinsToMap();
