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
    pictureElement.addEventListener('click', function () {
      window.renderMockBigPic(picture);
    });
    return pictureElement;
  };


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
      (picture.comments[i].message ? picture.comments[i].message : picture.comments[i]) +
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
    if (window.utils.isEscKeycode(evt)) {
      hideBigPic();
      window.removeEventListener('keydown', onEscDown);
    }
  };

  var onCancelClick = function () {
    hideBigPic();
    window.remove('keydown', onEscDown);
  };

  var pictures;

  var onLoadSuccess = function (response) {
    pictures = response;
    window.renderPictures(pictures);
    console.log(response)
  };
  var generatedPictures = window.createMockPhotoArray();

  var onLoadError = function (err) {
    var errorMessage = document.createElement('div');
    errorMessage.style = 'position: fixed; z-index: 25;' +
    'top: 15vh;' +
    'left: 35vw;' +
    'width: 30vw;' +
    'color: #D8000C; background-color: #FFBABA;' +
    'padding: 12px;';
    document.body.insertAdjacentElement('afterbegin', errorMessage);
    var closeErrorButton = document.createElement('button');
    closeErrorButton.style = 'display: inline-block; padding: 0; margin: 0; border: none; background: none; border: none;' +
    'margin-right: 12px; font-size: 40px; line-height: 16px; font-weight: bold';
    closeErrorButton.setAttribute('title', 'Закрыть сообщение и загрузить mock-данные');
    closeErrorButton.textContent = '྾';
    closeErrorButton.addEventListener('click', function () {
      errorMessage.remove();
      window.renderPictures(generatedPictures);
    });

    errorMessage.textContent = err;
    errorMessage.insertAdjacentElement('afterbegin', closeErrorButton);
  };

  window.backend.load(onLoadSuccess, onLoadError);

})();
