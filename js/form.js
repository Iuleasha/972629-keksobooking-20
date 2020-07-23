'use strict';

(function () {
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var address = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var avatar = document.querySelector('#avatar');
  var images = document.querySelector('#images');

  var getAdFormFieldsets = function () {
    return adForm.querySelectorAll('fieldset');
  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    avatar.removeEventListener('change', uploadAvatar);
    images.removeEventListener('change', uploadImages);
    clearButton.removeEventListener('click', formReset);
    window.utils.addDisableStatus(getAdFormFieldsets());
    adForm.reset();
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    avatar.addEventListener('change', uploadAvatar);
    images.addEventListener('change', uploadImages);
    clearButton.addEventListener('click', formReset);
    window.utils.removeDisableStatus(getAdFormFieldsets());
  };

  var uploadAvatar = function () {
    var preview = adForm.querySelector('.ad-form-header__preview img');

    loadFile(avatar, preview);
  };

  var uploadImages = function () {
    var preview = adForm.querySelector('.ad-form__photo');
    var img = preview.querySelector('img');

    if (img) {
      loadFile(images, img);
    } else {
      img = document.createElement('img');
      loadFile(images, img);
      preview.appendChild(img);
    }
  };

  var loadFile = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var switchMinPrice = function () {
    var typeSelectValue = typeSelect.value;
    if (typeSelectValue === 'bungalo') {
      priceInput.setAttribute('min', '0');
      priceInput.setAttribute('placeholder', '0');
    } else if (typeSelectValue === 'flat') {
      priceInput.setAttribute('min', '1000');
      priceInput.setAttribute('placeholder', '1000');
    } else if (typeSelectValue === 'house') {
      priceInput.setAttribute('min', '5000');
      priceInput.setAttribute('placeholder', '5000');
    } else if (typeSelectValue === 'palace') {
      priceInput.setAttribute('min', '10000');
      priceInput.setAttribute('placeholder', '10000');
    }
  };
  var setAddress = function (value) {
    address.value = value;
  };
  var addRoomCapacityValidation = function () {
    var capacityNumber = Number(capacitySelect.value);

    if (roomNumberSelect.value === '1' && (capacityNumber === 0 || capacityNumber > 1)) {
      capacitySelect.setCustomValidity('для 1 гостя');
    } else if (roomNumberSelect.value === '2' && (capacityNumber === 0 || capacityNumber > 2)) {
      capacitySelect.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberSelect.value === '3' && (capacityNumber === 0 || capacityNumber > 3)) {
      capacitySelect.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (roomNumberSelect.value === '100' && capacityNumber > 0) {
      capacitySelect.setCustomValidity('«не для гостей»');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  typeSelect.addEventListener('input', switchMinPrice);
  timeInSelect.addEventListener('input', function (evt) {
    timeOutSelect.value = evt.target.value;
  });
  timeOutSelect.addEventListener('input', function (evt) {
    timeInSelect.value = evt.target.value;
  });
  capacitySelect.addEventListener('input', addRoomCapacityValidation);
  capacitySelect.addEventListener('invalid', addRoomCapacityValidation);
  roomNumberSelect.addEventListener('input', addRoomCapacityValidation);

  switchMinPrice();
  addRoomCapacityValidation();

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.sendForm(new FormData(adForm), window.success.onSuccess, window.error.onFormError);
  });


  var clearButton = adForm.querySelector('.ad-form__reset');

  var formReset = function () {
    window.main.deactivatePage();
  };

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    switchMinPrice: switchMinPrice,
    setAddress: setAddress,
    formReset: formReset,
  };
})();
