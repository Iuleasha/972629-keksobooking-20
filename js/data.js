'use strict';

(function () {
  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        if (onError) {
          onError();
        } else {
          window.error.onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });

    xhr.addEventListener('error', function () {
      window.error.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.error.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  var loadData = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };

  var sendForm = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);
    xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
    xhr.send(data);
  };

  window.data = {
    sendForm: sendForm,
    loadData: loadData,
  };
})();
