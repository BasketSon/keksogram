'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  var onHashtagsInputBlur = function () {
    var tags = hashtagsInput.value;
    var tagsArray = tags.split(' ').filter(function (it) {
      return it !== '';
    });
    var checkSpelling = tagsArray.every(function (it) {
      return it.startsWith('#') && it.length < 20 && it.length > 1;
    });

    var checkRepeated = tagsArray.every(function (it, x) {
      return tagsArray.indexOf(it) === x;
    });

    if (tagsArray.length > 5) {
      hashtagsInput.setCustomValidity('Допустимо добавить не более 5 хэштегов.');

    } else if (!checkSpelling) {
      hashtagsInput.setCustomValidity('Хэштеги должны начинаться с ' +
      'символа "#" и содержать еще как минимум один символ, максимальная длина одного хэш-тега 20 символов.');

    } else if (!checkRepeated) {
      hashtagsInput.setCustomValidity('Хэштеги не должны повторяться.');

    } else {
      hashtagsInput.setCustomValidity('');
    }
    if (!hashtagsInput.checkValidity()) {
      setTimeout(function () {
        hashtagsInput.reportValidity();
      }, 0);
    }
  };

  hashtagsInput.addEventListener('blur', onHashtagsInputBlur);

})();
