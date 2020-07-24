'use strict';

(function () {
  var onSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

  var onSuccess = function () {
    var onSuccessCreate = onSuccessTemplate.cloneNode(true);

    window.error.mainWrapper.appendChild(onSuccessCreate);

    var successWrapper = window.error.mainWrapper.querySelector('.success');
    var removeSuccessPopup = function () {
      successWrapper.removeEventListener('click', removeSuccessPopup);
      document.removeEventListener('keydown', onEscPress);
      window.error.mainWrapper.querySelector('.success').remove();
    };

    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        removeSuccessPopup();
      }
    };

    successWrapper.addEventListener('click', removeSuccessPopup);
    document.addEventListener('keydown', onEscPress);
  };

  window.success = {
    show: onSuccess,
  };
})();
