'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  window.utils = {
    isEscKeycode: function (evt) {
      return evt.which === ESC_KEY_CODE;
    }
  };
})();
