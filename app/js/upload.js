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
  var animStyle = document.createElement('style');
  document.head.insertAdjacentElement('beforeend', animStyle);

  var resetPreview = function () {
    previewImage.className = '';
    previewImage.src = '#';
    previewImage.style = '';
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
  previewContainer.insertAdjacentElement('afterbegin', back);
  previewContainer.style.overflow = 'hidden';
  back.style = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-size: auto ' + PREVIEW_CONTAINER_SIDE + 'px; background-repeat: repeat-x; filter: blur(9px); z-index: 0;';
  back.classList.add('img-upload__generated-background');
  imgEditingOverlay.querySelector('.cancel').addEventListener('click', closeEditingOverlay);

  var renderPreview = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewImage.src = reader.result;
      back.style.backgroundImage = 'url(' + reader.result + ')';
      previewImage.style.zIndex = '0'; // Без этого блюрится и имэджж
      setTimeout(function () {
        animStyle.textContent = '@keyframes backImg {from {background-position: left 0 top 0;} to {background-position: left -' + previewImage.naturalWidth * PREVIEW_CONTAINER_SIDE / previewImage.naturalHeight + 'px top 0;}}';
      }, 0);
    });
    reader.readAsDataURL(file);
  };

})();
