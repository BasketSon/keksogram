'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var generatedPictures = window.createMockPhotoArray();

  window.renderPictures = function (picsArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picsArray.length; i++) {
      fragment.appendChild(renderPicture(picsArray[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  var bigPicture = document.querySelector('.modal-picture');

  window.renderMockBigPic = function (picsArray) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.modal-picture__img img').src = picsArray[0].url;
    bigPicture.querySelector('.likes-count').textContent = picsArray[0].likes;
    bigPicture.querySelector('.comments-count').textContent = picsArray[0].comments.length;
    for (var i = 0; i < picsArray[0].comments.length; i++) {
      bigPicture.querySelector('.social__comments').insertAdjacentHTML('beforeEnd',
          '<li class="social__comment social__comment--text">' +
      '<img class="social__picture" src="img/avatar-' +
      Math.ceil(Math.random() * 6) +
      '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' +
      '<p class="social__text">' +
      picsArray[0].comments[i] +
      '</p></li>');
    }
    bigPicture.querySelector('.social__caption').textContent = picsArray[0].description;
    bigPicture.querySelectorAll('.social__comment-count, .social__comments-loader').forEach(function (it) {
      it.classList.add('visually-hidden');
    });
  };

  window.renderMockBigPic(generatedPictures);
  window.renderPictures(generatedPictures);

})();
