'use strict';

(function () {
  var XHR_SUCCESS_STATUS = 200;
  var XHR_TIMEOUT = 10000;

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_SUCCESS_STATUS) {
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

    xhr.timeout = XHR_TIMEOUT;
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
