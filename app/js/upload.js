'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var PREVIEW_CONTAINER_SIDE = 600;
  var IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var upload = document.querySelector('#upload-file');
  var imgEditingOverlay = document.querySelector('.img-upload__overlay');
  var previewImage = imgEditingOverlay.querySelector('.img-upload__preview img');
  var previewContainer = imgEditingOverlay.querySelector('.img-upload__preview');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

  var resetPreview = function () {
    previewImage.className = '';
    previewImage.src = '#';
    previewImage.style = '';
    clearInterval(interval);
    document.querySelector('.img-upload__slider').classList.add('visually-hidden');
  };
  var closeEditingOverlay = function () {
    imgEditingOverlay.classList.add('hidden');
    upload.value = '';
    resetPreview();
    window.removeEventListener('keydown', onEscPress);
  };
  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      if (document.activeElement !== hashtagsInput && document.activeElement !== descriptionInput) {
        evt.preventDefault();
        closeEditingOverlay();
      }
    }
  };


  upload.addEventListener('change', function () {
    var preview = upload.files[0];
    var fileName = preview.name.toLowerCase();
    var checkFileType = IMG_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (preview.size > 10 * 1024 * 1024) {
      upload.setCustomValidity('Допустимый размер файла не более 10 мегабайт');
      upload.reportValidity();
    } else if (!checkFileType) {
      upload.setCustomValidity('Неверный формат изображения.');
      upload.reportValidity();
    } else {
      upload.setCustomValidity('');
      renderPreview(preview);
      imgEditingOverlay.classList.remove('hidden');
      window.addEventListener('keydown', onEscPress);
    }
  });

  var back = document.createElement('div');
  var interval;
  previewContainer.insertAdjacentElement('afterbegin', back);
  previewContainer.style.overflow = 'hidden';
  back.style = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-size: auto ' + PREVIEW_CONTAINER_SIDE + 'px; background-repeat: repeat-x; filter: blur(9px); z-index: 0;';
  var leftCoord = 0;
  imgEditingOverlay.querySelector('.cancel').addEventListener('click', closeEditingOverlay);

  var renderPreview = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewImage.src = reader.result;
      back.style.backgroundImage = 'url(' + reader.result + ')';
      previewImage.style.zIndex = '0'; // Без этого блюрится и имэджж
      interval = setInterval(function () {
        back.style.backgroundPosition = leftCoord-- + 'px 0';
        if (Math.abs(leftCoord) > previewImage.naturalWidth * PREVIEW_CONTAINER_SIDE / previewImage.naturalHeight) {
          leftCoord = 0;
        }
      }, 32);
    });
    reader.readAsDataURL(file);
  };


})();
