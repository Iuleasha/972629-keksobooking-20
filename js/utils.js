'use strict';

(function () {
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
  var addDisableStatus = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', true);
    }
  };
  var removeDisableStatus = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
  };

  window.utils = {
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomNumber: getRandomNumber,
    sliceArrayWithRandomLength: sliceArrayWithRandomLength,
    shuffleArray: shuffleArray,
    addDisableStatus: addDisableStatus,
    removeDisableStatus: removeDisableStatus,
  };
})();
