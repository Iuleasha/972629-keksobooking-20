'use strict';

(function () {
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var address = document.querySelector('#address');

  var disableForm = function (status) {
    var adFormForm = document.querySelector('.ad-form');
    var adFormFieldsets = adFormForm.querySelectorAll('fieldset');

    if (status) {
      adFormForm.classList.add('ad-form--disabled');
    } else {
      adFormForm.classList.remove('ad-form--disabled');
    }

    window.utils.switchDisableStatus(adFormFieldsets, status);
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

  window.form = {
    disableForm: disableForm,
    switchMinPrice: switchMinPrice,
    setAddress: setAddress,
  };
})();
