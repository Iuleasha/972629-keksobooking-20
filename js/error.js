'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainWrapper = document.querySelector('main');

  var open = function (errorMessage) {
    var error = errorTemplate.cloneNode(true);
    error.querySelector('.error__message').textContent = errorMessage;

    mainWrapper.appendChild(error);
    error.addEventListener('click', function () {
      close();
    });
    document.addEventListener('keydown', onEscPress);
    window.main.deactivatePage();
  };

  var close = function () {
    var error = mainWrapper.querySelector('.error');

    if (error) {
      error.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      close();
    }
  };

  window.error = {
    show: open,
  };
})();
