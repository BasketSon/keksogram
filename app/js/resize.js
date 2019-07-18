'use strict';

(function () {
  var smallerButton = document.querySelector('.scale__control--smaller');
  var biggerButton = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var previewImage = document.querySelector('.img-upload__preview img');

  smallerButton.addEventListener('click', function () {
    if (parseInt(scaleValue.value, 10) > 25) {
      var value = parseInt(scaleValue.value, 10) - 25;
      scaleValue.value = value + '%';
      previewImage.style.transform = 'scale(' + value / 100 + ')';
    }
  });

  biggerButton.addEventListener('click', function () {
    if (parseInt(scaleValue.value, 10) < 100) {
      var value = parseInt(scaleValue.value, 10) + 25;
      scaleValue.value = value + '%';
      previewImage.style.transform = 'scale(' + value / 100 + ')';
    }
  });

})();
