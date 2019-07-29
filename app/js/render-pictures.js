'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');


  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', function () {
      window.renderBigPic(picture);
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

  var removePictures = function () {
    picturesContainer.querySelectorAll('.picture').forEach(function (it) {
      it.remove();
    });
  };

  var bigPicture = document.querySelector('.modal-picture');

  window.renderBigPic = function (picture) {
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
    showFilters();
  };
  var generatedPictures = window.createMockPhotoArray();

  var onLoadError = function (err) {
    var errorMessage = window.createPopup(err, 'error');
    var closeErrorMessage = errorMessage.querySelector('button');
    closeErrorMessage.setAttribute('title', 'Закрыть сообщение и загрузить mock-данные');
    closeErrorMessage.addEventListener('click', function () {
      pictures = generatedPictures;
      onLoadSuccess(pictures);
    });
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);

  var showFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var buttonIdsToCallbacks = {
    'filter-popular': function (pics) {
      return pics;
    },
    'filter-new': function (pics) {
      return pics.slice()
          .sort(function () {
            return 0.5 - Math.random();
          })
          .slice(0, 10);
    },
    'filter-discussed': function (pics) {
      return pics.slice()
          .sort(function (left, right) {
            return right.comments.length - left.comments.length;
          });
    }
  };

  imgFilters.addEventListener('click', function (evt) {
    if (evt.target instanceof HTMLButtonElement) {
      activateButton(evt);
      filterPictures(evt);

    }
  });

  var activateButton = function (evt) {
    imgFilters.querySelectorAll('button').forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };

  var filterPictures = window.debounce(function (evt) {
    removePictures();
    window.renderPictures(buttonIdsToCallbacks[evt.target.id](pictures));
  });


})();
