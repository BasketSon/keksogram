'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');


  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', function () {
      window.renderMockBigPic(picture);
    });
    return pictureElement;
  };

  var generatedPictures = window.createMockPhotoArray();

  window.renderPictures = function (picsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picsArray.length; i++) {
      var smallPicture = renderPicture(picsArray[i]);
      fragment.appendChild(smallPicture);
    }
    picturesContainer.appendChild(fragment);
  };

  var bigPicture = document.querySelector('.modal-picture');

  window.renderMockBigPic = function (picture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.modal-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    for (var i = 0; i < picture.comments.length; i++) {
      bigPicture.querySelector('.social__comments').insertAdjacentHTML('beforeEnd',
          '<li class="social__comment social__comment--text">' +
      '<img class="social__picture" src="img/avatar-' +
      Math.ceil(Math.random() * 6) +
      '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' +
      '<p class="social__text">' +
      picture.comments[i] +
      '</p></li>');
    }
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelectorAll('.social__comment-count, .social__comments-loader').forEach(function (it) {
      it.classList.add('visually-hidden');
    });
    bigPicture.querySelector('.cancel').addEventListener('click', onCancelClick);
    window.addEventListener('keydown', onEscDown);
  };

  var hideBigPic = function () {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.social__comments').innerHTML = '';
  };

  var onEscDown = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      hideBigPic();
      window.removeEventListener('keydown', onEscDown);
    }
  };

  var onCancelClick = function () {
    hideBigPic();
    window.remove('keydown', onEscDown);
  };

  window.renderPictures(generatedPictures);


})();
