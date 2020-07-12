'use strict';

(function () {
  window.loadData = function (url, onSuccess) {
    var _cards = [];
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });

    xhr.open('GET', url);
    xhr.send();

    return _cards;
  };
})();
