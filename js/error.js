'use strict';

(function () {
  var onErrorTemplate = document.querySelector('#error');
  var onErrorCreate = onErrorTemplate.content.querySelector('.error').cloneNode(true);
  var mainWrapper = document.querySelector('main');
  var errorMessageWrapper = onErrorCreate.querySelector('.error__message');
  var onError = function (errorMessage) {
    window.main.deactivatePage();

    var fragment = document.createDocumentFragment();

    if (errorMessage) {
      errorMessageWrapper.textContent = errorMessage;
    }

    fragment.appendChild(onErrorCreate);
    mainWrapper.appendChild(fragment);

    var errorWrapper = mainWrapper.querySelector('.error');

    var removeErrorPopup = function () {
      errorWrapper.removeEventListener('click', removeErrorPopup);
      document.removeEventListener('keydown', onEscPress);
      mainWrapper.querySelector('.error').remove();
    };

    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        removeErrorPopup();
      }
    };

    errorWrapper.addEventListener('click', removeErrorPopup);
    document.addEventListener('keydown', onEscPress);
  };

  window.error = {
    mainWrapper: mainWrapper,
    onError: onError,
  };
})();
