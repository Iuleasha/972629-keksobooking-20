'use strict';

(function () {

  window.loadData = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        window.error.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      window.error.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.error.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };

  window.sendForm = function (data, onSuccess) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        window.error.onError();
      }
    });

    xhr.addEventListener('error', function () {
      window.error.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.error.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
