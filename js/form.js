'use strict';

(function () {
  var EMPTY_CAPACITY = 0;
  var housingMinPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };
  var roomMaxCapacity = {
    '1': {maxCapacity: 1, errorMessage: '«для 1 гостя»'},
    '2': {maxCapacity: 2, errorMessage: '«для 2 гостей» или «для 1 гостя»'},
    '3': {maxCapacity: 3, errorMessage: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»'},
    '100': {maxCapacity: 0, errorMessage: '«не для гостей»'},
  };
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
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarPreview.src;
  var imagesPreview = adForm.querySelector('.ad-form__photo');
  var fieldsets = adForm.querySelectorAll('fieldset');

  var getAdFormFieldsets = function () {
    return fieldsets;
  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');
    avatar.removeEventListener('change', uploadAvatar);
    images.removeEventListener('change', uploadImages);
    clearButton.removeEventListener('click', formReset);
    window.utils.addDisableStatus(getAdFormFieldsets());
    adForm.reset();
    resetAvatar();
    resetImages();
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');
    avatar.addEventListener('change', uploadAvatar);
    images.addEventListener('change', uploadImages);
    clearButton.addEventListener('click', formReset);
    window.utils.removeDisableStatus(getAdFormFieldsets());
  };

  var uploadAvatar = function () {
    loadFile(avatar, avatarPreview);
  };

  var resetAvatar = function () {
    avatarPreview.src = defaultAvatar;
  };

  var uploadImages = function () {
    var img = imagesPreview.querySelector('img');

    if (img) {
      loadFile(images, img);
    } else {
      img = document.createElement('img');
      loadFile(images, img);
      imagesPreview.appendChild(img);
    }
  };

  var resetImages = function () {
    imagesPreview.innerHTML = '';
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
    var minPrice = housingMinPrice[typeSelect.value];

    priceInput.setAttribute('min', minPrice);
    priceInput.setAttribute('placeholder', minPrice);
  };

  var updateAddress = function () {
    address.value = window.mainPin.getCoordinates();
  };

  var addRoomCapacityValidation = function () {
    var capacityNumber = Number(capacitySelect.value);
    var room = roomMaxCapacity[roomNumberSelect.value];

    if (capacityNumber > room.maxCapacity ||
      capacityNumber === EMPTY_CAPACITY && room.maxCapacity !== EMPTY_CAPACITY) {
      capacitySelect.setCustomValidity(room.errorMessage);
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
    window.data.sendForm(new FormData(adForm), onSuccess, onError);
  });

  var onSuccess = function () {
    window.success.show();
    window.main.deactivatePage();
  };

  var onError = function (error) {
    window.error.show(error);
  };

  var clearButton = adForm.querySelector('.ad-form__reset');

  var formReset = function () {
    window.main.deactivatePage();
  };

  window.form = {
    disable: disableForm,
    enable: enableForm,
    updateAddress: updateAddress,
  };
})();
