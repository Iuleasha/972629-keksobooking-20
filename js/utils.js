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
  var switchDisableStatus = function (array, status) {
    for (var i = 0; i < array.length; i++) {
      if (status) {
        array[i].setAttribute('disabled', status);
      } else {
        array[i].removeAttribute('disabled');
      }
    }
  };

  window.utils = {
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomNumber: getRandomNumber,
    sliceArrayWithRandomLength: sliceArrayWithRandomLength,
    shuffleArray: shuffleArray,
    switchDisableStatus: switchDisableStatus,
  };
})();
