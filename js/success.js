'use strict';

(function () {
  var onSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainWrapper = document.querySelector('main');

  var onSuccess = function () {
    var success = onSuccessTemplate.cloneNode(true);

    mainWrapper.appendChild(success);

    success.addEventListener('click', function () {
      close();
    });
    document.addEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape') {
      close();
    }
  };

  var close = function () {
    var element = mainWrapper.querySelector('.success');

    if (element) {
      element.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.success = {
    show: onSuccess,
  };
})();
