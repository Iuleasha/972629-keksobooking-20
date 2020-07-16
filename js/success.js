'use strict';

(function () {

  var onSuccess = function () {
    var onSuccessTemplate = document.querySelector('#success');
    var onSuccessCreate = onSuccessTemplate.content.querySelector('.success').cloneNode(true);

    var fragment = document.createDocumentFragment();

    fragment.appendChild(onSuccessCreate);
    window.error.mainWrapper.appendChild(fragment);

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
    window.main.deactivatePage();
    window.form.formReset();
    window.pin.clearPins();
  };
  window.success = {
    onSuccess: onSuccess,
  };

})();
