'use strict';

(function () {
  window.createPopup = function (err, type) {
    var popup = document.createElement('div');
    popup.style = 'position: fixed; z-index: 25;' +
    'top: 15vh;' +
    'left: 35vw;' +
    'width: 30vw;' +
    'padding: 12px;';
    var closePopup = document.createElement('button');
    closePopup.style = 'display: inline-block; padding: 0; margin: 0; border: none; background: none; border: none;' +
    'margin-right: 12px; font-size: 40px; line-height: 16px; font-weight: bold';
    closePopup.textContent = '྾';
    closePopup.addEventListener('click', function () {
      popup.remove();
    });
    if (type === 'error') {
      popup.style.color = '#D8000C';
      popup.style.backgroundColor = '#FFBABA';

      var text = err;
    } else {
      popup.style.color = '#4F8A10';
      popup.style.backgroundColor = '#DFF2BF';
      text = 'Форма успешно отправлена.';
    }
    popup.textContent = text;
    popup.insertAdjacentElement('afterbegin', closePopup);

    return popup;
  };

})();
