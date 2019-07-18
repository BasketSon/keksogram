'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var upload = document.querySelector('#upload-file');
  var imgEditingOverlay = document.querySelector('.img-upload__overlay');
  var previewImage = imgEditingOverlay.querySelector('.img-upload__preview img');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

  var resetPreview = function () {
    previewImage.className = '';
    previewImage.src = '#';
    previewImage.style = '';
    document.querySelector('.img-upload__slider').classList.add('visually-hidden');
  }
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
    imgEditingOverlay.classList.remove('hidden');
    var preview = upload.files[0];
    renderPreview(preview);
    window.addEventListener('keydown', onEscPress);
  });

  imgEditingOverlay.querySelector('.cancel').addEventListener('click', closeEditingOverlay);

  var renderPreview = function (file) {
    var fileName = file.name.toLowerCase();
    var checkFileType = IMG_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (checkFileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };


})();
