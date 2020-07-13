'use strict';

(function () {
  var onErrorTemplate = document.querySelector('#error');
  var onErrorCreate = onErrorTemplate.content.querySelector('.error').cloneNode(true);
  var mainWrapper = document.querySelector('main');
  var errorMessageWrapper = onErrorCreate.querySelector('.error__message');
  window.loadData = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };

  var onError = function (errorMessage) {
    window.main.deactivatePage();

    var fragment = document.createDocumentFragment();

    errorMessageWrapper.textContent = errorMessage;
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
})();
