'use strict';

var pinTemplate = document.querySelector('#pin');
var map = document.querySelector('.map');
var mapPinsWrapper = document.querySelector('.map__pins');
var cards = [];

var arrayRandElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var randNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randShuffle = function (array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  }).slice(0, randNumber(1, array.length));
};

var createCardArray = function () {
  for (var i = 1; i <= 8; i++) {
    cards.push(createCard(i));
  }
};

var createCard = function (index) {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Внезапно, преступность никогда не была такой неорганизованной', 'Консультация с широким активом одухотворила всех причастных', 'Воистину радостный звук: полуночный пёсий вой', 'Никте не вправе осуждать звон колоколов', 'Есть над чем задуматься: зима близко', 'Давайте не будем укрепляться в мысли, что кровь стынет в жилах!', 'Подтверждено: героям были возданы соответствующие почести', 'Нашу победу сопровождал детский заливистый смех'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  return {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png',
    },
    'offer': {
      'title': arrayRandElement(TITLES),
      'address': function () {
        return this.location.x + ', ' + this.location.y;
      },
      'price': randNumber(1, 50000),
      'type': arrayRandElement(TYPES),
      'rooms': randNumber(1, 3),
      'guests': randNumber(0, 2),
      'checkin': arrayRandElement(TIMES),
      'checkout': arrayRandElement(TIMES),
      'features': randShuffle(FEATURES),
      'description': arrayRandElement(DESCRIPTIONS),
      'photos': randShuffle(PHOTOS),
      'location': {
        'x': randNumber(0, map.offsetWidth),
        'y': randNumber(130, 630),
      },
    },
  };
};

var setPinsToMap = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    var pin = pinTemplate.content.querySelector('.map__pin');

    pin.style.left = cards[i].offer.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = cards[i].offer.location.y - pin.offsetHeight + 'px';

    var pinImg = pin.querySelector('img');

    pinImg.src = cards[i].author.avatar;
    pinImg.alt = cards[i].offer.title;

    fragment.appendChild(pin.cloneNode(true));
  }

  mapPinsWrapper.appendChild(fragment);
};

createCardArray();
setPinsToMap();
