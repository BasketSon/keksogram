'use strict';

(function () {
  var uploadEffects = document.querySelector('.img-upload__effects');
  var previewImage = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.img-upload__slider');

  slider.classList.add('visually-hidden');

  var onSliderMove;

  uploadEffects.addEventListener('change', function () {
    var filter = uploadEffects.querySelector('input[type="radio"]:checked').value;
    previewImage.style.filter = '';
    previewImage.className = 'effects__preview--' + filter;
    slider.value = 100;
    slider.removeEventListener('change', onSliderMove);
    slider.classList.remove('visually-hidden');
    switch (filter) {
      case 'chrome':
        onSliderMove = function () {
          previewImage.style.filter = 'grayscale(' + slider.value / 100 + ')';
        };

        break;
      case 'sepia':
        onSliderMove = function () {
          previewImage.style.filter = 'sepia(' + slider.value / 100 + ')';
        };

        break;
      case 'marvin':
        onSliderMove = function () {
          previewImage.style.filter = 'invert(' + slider.value + '%)';
        };

        break;
      case 'phobos':
        onSliderMove = function () {
          previewImage.style.filter = 'blur(' + slider.value * 5 / 100 + 'px)';
        };

        break;
      case 'heat':
        onSliderMove = function () {
          previewImage.style.filter = 'brightness(' + (slider.value * 2 / 100 + 1) + ')';
        };

        break;
      case 'none':
        slider.classList.add('visually-hidden');

        break;
    }
    slider.addEventListener('mousedown', function () {
      slider.addEventListener('mousemove', onSliderMove);
    });
    slider.addEventListener('mouseup', function () {
      slider.removeEventListener('mousemove', onSliderMove);
    });
  });

})();
