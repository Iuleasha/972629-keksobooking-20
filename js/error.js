'use strict';

(function () {
  var errorTemplate = document.querySelector('#error');
  var mainWrapper = document.querySelector('main');

  var getCloneNode = function () {
    return errorTemplate.content.querySelector('.error').cloneNode(true);
  };

  var onFormError = function () {
    window.main.deactivatePage();
    mainWrapper.appendChild(getCloneNode());
    closeErrorPopUp();
  };

  var onError = function (errorMessage) {
    var errorCloneNode = getCloneNode();
    var errorMessageWrapper = errorCloneNode.querySelector('.error__message');

    errorMessageWrapper.textContent = errorMessage;

    window.main.deactivatePage();
    mainWrapper.appendChild(errorCloneNode);
    closeErrorPopUp();
  };

  var closeErrorPopUp = function () {
    var errorWrapper = mainWrapper.querySelector('.error');

    if (errorWrapper) {
      var removeErrorPopup = function () {
        mainWrapper.querySelector('.error').remove();
        errorWrapper.removeEventListener('click', removeErrorPopup);
        document.removeEventListener('keydown', onEscPress);
      };

      var onEscPress = function (evt) {
        if (evt.key === 'Escape') {
          removeErrorPopup();
        }
      };

      errorWrapper.addEventListener('click', removeErrorPopup);
      document.addEventListener('keydown', onEscPress);
    }
  };

  window.error = {
    mainWrapper: mainWrapper,
    onError: onError,
    onFormError: onFormError,
  };
})();
