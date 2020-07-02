'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Внезапно, преступность никогда не была такой неорганизованной', 'Консультация с широким активом одухотворила всех причастных', 'Воистину радостный звук: полуночный пёсий вой', 'Никте не вправе осуждать звон колоколов', 'Есть над чем задуматься: зима близко', 'Давайте не будем укрепляться в мысли, что кровь стынет в жилах!', 'Подтверждено: героям были возданы соответствующие почести', 'Нашу победу сопровождал детский заливистый смех'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PROPERTY_TYPES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
var PIN_ARROW_HEIGHT = 22;

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

var createCardsArray = function createCardsArray(arrayLength) {
  var _cards = [];

  for (var i = 1; i <= arrayLength; i++) {
    _cards.push(createCard(i));
  }

  return _cards;
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

  pin.addEventListener('click', function () {
    openCardPopUp(pinInfo);
  });

  return pin;
};


var createCardDescription = function (card) {
  var mapCard = cardTemplate.content.querySelector('.map__card').cloneNode(true);

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
    var imageTemplate = cardTemplate.content.querySelector('.popup__photo').cloneNode();

    imageTemplate.src = photos[i];
    fragmet.appendChild(imageTemplate);
  }

  return fragmet;
};

var openCardPopUp = function (cardInfo) {
  closeCardPopUp();

  var newCard = createCardDescription(cardInfo);

  newCard.querySelector('.popup__close').addEventListener('click', function () {
    closeCardPopUp();
  });

  map.insertBefore(newCard, mapFiltersContainer);

  document.addEventListener('keydown', onEscPress);
};

var onEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closeCardPopUp();
  }
};

var closeCardPopUp = function () {
  var card = map.querySelector('.map__card');

  if (card) {
    card.remove();

    document.removeEventListener('keydown', onEscPress);
  }
};

var disableFilter = function (status) {
  var filterWrapper = document.querySelector('.map__filters');
  var selectFilter = filterWrapper.querySelectorAll('select');

  if (status) {
    filterWrapper.querySelector('fieldset').setAttribute('disabled', status);
  } else {
    filterWrapper.removeAttribute('disabled');
  }

  switchDisableStatus(selectFilter, status);
};

var disableForm = function (status) {
  var adFormForm = document.querySelector('.ad-form');
  var adFormFieldsets = adFormForm.querySelectorAll('fieldset');

  if (status) {
    adFormForm.classList.add('ad-form--disabled');
  } else {
    adFormForm.classList.remove('ad-form--disabled');
  }

  switchDisableStatus(adFormFieldsets, status);
};

var switchDisableStatus = function (array, status) {
  for (var i = 0; i < array.length; i++) {
    if (status) {
      array[i].setAttribute('disabled', status);
    } else {
      array[i].removeAttribute('disabled');
    }
  }
};

var setAddress = function (value) {
  var address = document.querySelector('#address');

  address.value = value;
};

var setMainPinCoordinates = function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var mainPinTop = mainPin.offsetTop;
  var mainPinLeft = mainPin.offsetLeft;

  if (!isActive) {
    setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight / 2));
  } else {
    setAddress(Math.round(mainPinLeft + mainPinWidth / 2) + ', ' + Math.round(mainPinTop + mainPinHeight + PIN_ARROW_HEIGHT));
  }
};


var activateMap = function () {
  if (isActive) {
    return;
  }

  isActive = true;

  map.classList.remove('map--faded');
  setPinsToMap();
  disableFilter(false);
  disableForm(false);
  setMainPinCoordinates();
};

disableFilter(true);
disableForm(true);
setMainPinCoordinates();

var isActive = false;
var cards = createCardsArray(8);
var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activateMap();
  }
});

/* Валидация */
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var priceInput = document.querySelector('#price');
var typeSelect = document.querySelector('#type');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

var addRoomCapacityValidation = function () {
  var capacityNumber = Number(capacitySelect.value);

  if (roomNumberSelect.value === '1' && (capacityNumber === 0 || capacityNumber > 1)) {
    capacitySelect.setCustomValidity('для 1 гостя');
  } else if (roomNumberSelect.value === '2' && (capacityNumber === 0 || capacityNumber > 2)) {
    capacitySelect.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
  } else if (roomNumberSelect.value === '3' && (capacityNumber === 0 || capacityNumber > 3)) {
    capacitySelect.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (roomNumberSelect.value === '100' && capacityNumber > 0) {
    capacitySelect.setCustomValidity('«не для гостей»');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

addRoomCapacityValidation();

capacitySelect.addEventListener('input', addRoomCapacityValidation);
capacitySelect.addEventListener('invalid', addRoomCapacityValidation);
roomNumberSelect.addEventListener('input', addRoomCapacityValidation);


var switchMinPrice = function () {
  var typeSelectValue = typeSelect.value;
  if (typeSelectValue === 'bungalo') {
    priceInput.setAttribute('min', '0');
    priceInput.setAttribute('placeholder', '0');
  } else if (typeSelectValue === 'flat') {
    priceInput.setAttribute('min', '1000');
    priceInput.setAttribute('placeholder', '1000');
  } else if (typeSelectValue === 'house') {
    priceInput.setAttribute('min', '5000');
    priceInput.setAttribute('placeholder', '5000');
  } else if (typeSelectValue === 'palace') {
    priceInput.setAttribute('min', '10000');
    priceInput.setAttribute('placeholder', '10000');
  }
};

switchMinPrice();

typeSelect.addEventListener('input', switchMinPrice);

timeInSelect.addEventListener('input', function (evt) {
  timeOutSelect.value = evt.target.value;
});

timeOutSelect.addEventListener('input', function (evt) {
  timeInSelect.value = evt.target.value;
});
