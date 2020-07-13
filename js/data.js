'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Внезапно, преступность никогда не была такой неорганизованной', 'Консультация с широким активом одухотворила всех причастных', 'Воистину радостный звук: полуночный пёсий вой', 'Никте не вправе осуждать звон колоколов', 'Есть над чем задуматься: зима близко', 'Давайте не будем укрепляться в мысли, что кровь стынет в жилах!', 'Подтверждено: героям были возданы соответствующие почести', 'Нашу победу сопровождал детский заливистый смех'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  var createCard = function (index) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + index + '.png',
      },
      'offer': {
        'title': window.utils.getRandomItemFromArray(TITLES),
        'address': function () {
          return this.location.x + ', ' + this.location.y;
        },
        'price': window.utils.getRandomNumber(1, 50000),
        'type': window.utils.getRandomItemFromArray(TYPES),
        'rooms': window.utils.getRandomNumber(1, 3),
        'guests': window.utils.getRandomNumber(0, 2),
        'checkin': window.utils.getRandomItemFromArray(TIMES),
        'checkout': window.utils.getRandomItemFromArray(TIMES),
        'features': window.utils.sliceArrayWithRandomLength(window.utils.shuffleArray(FEATURES)),
        'description': window.utils.getRandomItemFromArray(DESCRIPTIONS),
        'photos': window.utils.sliceArrayWithRandomLength(window.utils.shuffleArray(PHOTOS)),
        'location': {
          'x': window.utils.getRandomNumber(0, window.card.map.offsetWidth),
          'y': window.utils.getRandomNumber(130, 630),
        },
      },
    };
  };
  var createCardsArray = function createCardsArray(arrayLength) {
    var _cards = [];

    for (var i = 1; i <= arrayLength; i++) {
      _cards.push(createCard(i));
    }

    return _cards;
  };

  window.data = {
    cards: createCardsArray(8),
  };
})();
