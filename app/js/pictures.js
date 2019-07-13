'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var getRandomNumberOfInterval = function (left, right) {
    var lower = right - left > 0 ? left : right;
    return lower + Math.floor(Math.random() * Math.abs(right - left));
  };

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var x = 1;
  var photos = new Array(NUMBER_OF_PHOTOS).fill('').map(function () {
    return x++;
  });

  var GeneratePhoto = function () {
    this.url = 'photos/' + photos.splice(getRandomNumberOfInterval(0, photos.length - 1), 1)[0] + '.jpg';
    this.likes = getRandomNumberOfInterval(MIN_LIKES, MAX_LIKES);
    this.comments = comments.filter(function () {
      return Math.round(Math.random())
    });
    this.description = descriptions[getRandomNumberOfInterval(0, descriptions.length - 1)]
  };

  window.createMockPhotoArray = function () {
    var photoArray = [];
    for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
      photoArray.push(new GeneratePhoto());
    }
    return photoArray;
  };
})();
