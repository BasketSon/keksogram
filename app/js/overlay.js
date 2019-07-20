'use strict';

(function () {
  var overlay = document.createElement('div');
  overlay.style = 'position: fixed; z-index: 50; top: 0; left: 0; pointer-events: none; width: 100vw; height: 100vh';
  document.body.insertAdjacentElement('afterbegin', overlay);

  var followCursor = document.createElement('div');
  overlay.appendChild(followCursor);
  followCursor.style =
     'position: absolute;' +
     'width: 20px;' +
     'height: 20px;' +
     'border-radius: 50%;' +
     'pointer-events: none;' +
     'z-index: 50;' +
     'cursor: none;' +
     'opacity: 0;' +
     'border: 3px solid red;';
  document.addEventListener('mousemove', function (e) {
    followCursor.style.top = e.clientY - 10 + 'px';
    followCursor.style.left = e.clientX - 10 + 'px';
  });

  var getRandomColorPresence = function () {
    return Math.floor(Math.random() * 255);
  };

  document.addEventListener('click', function () {
    followCursor.style.borderColor = 'rgb(' + getRandomColorPresence() + ',' + getRandomColorPresence() + ',' + getRandomColorPresence() + ')';
    followCursor.style.opacity = '1';
    followCursor.style.transition = 'transform 0.2s ease-out';
    followCursor.style.transform = 'scale(4)';
    setTimeout(function () {
      followCursor.style.opacity = '0.7';
      followCursor.style.transform = 'scale(1)';
      setTimeout(function () {
        followCursor.style.transition = '';
        followCursor.style.transform = '';
        followCursor.style.opacity = '0';
      }, 200);
    }, 200);
  });

})();
