'use strict';

(function () {
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var URL_GET = 'https://js.dump.academy/kekstagram/data';

  var sendRequest = function (method, URL, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, URL);

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        var error;
        switch (xhr.status) {
          case 400:
            error = 'Неверный запрос';
            break;
          case 401:
            error = 'Пользователь не авторизован';
            break;
          case 404:
            error = 'Ошибка 404. Ничего не найдено';
            break;
          default:
            error = 'Ошибка соединения, статус ответа' + xhr.status + ' ' + xhr.statusText;
        }
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за' + xhr.timeout / 1000 + ' секунд');
    });
    xhr.timeout = 5000;
    xhr.send(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      sendRequest('GET', URL_GET, onSuccess, onError);

    },
    upload: function (onSuccess, onError, data) {
      sendRequest('POST', URL_POST, onSuccess, onError, data);
    }
  };
})();
