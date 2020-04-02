"use strict";

(function () {
  var contactForm = document.getElementById('contact-form');
  var URL = '/process-form';
  var ERROR_CLASS = 'form__message--negative';
  var SUCCESS_CLASS = 'form__message--positive';
  var HIDE_CLASS = 'not-displayed';
  var SUBMIT_BTN = document.getElementById('js_submitBtn');
  /**
   *
   * Gets values from htmlCollection (inputs or textareas)
   */

  function collectionToObject(collection) {
    var values = {};
    [].forEach.call(collection, function (item, index) {
      values[item.name] = item.value;
    });
    return values;
  }

  function clearForm(form) {
    var clear = function clear(collection) {
      [].forEach.call(collection, function (item) {
        item.value = '';

        if (item.parentNode.classList.contains('input--filled')) {
          item.parentNode.classList.remove('input--filled');
        }
      });
    };

    var inputs = form.getElementsByTagName('input');
    var areas = form.getElementsByTagName('textarea');
    clear(inputs);
    clear(areas);
  }

  function resetMessages(form) {
    var divs = form.getElementsByTagName('div');
    var elements = [];
    Array.prototype.forEach.call(divs, function (div) {
      if (div.classList.value.match(/.*_message$/)) {
        elements.push(div);
      }
    });
    elements.map(function (el) {
      el.classList.add(HIDE_CLASS);
    });
  }

  function disableSubmitButton() {
    SUBMIT_BTN.setAttribute('disabled', true);
  }

  function enableSubmitButton() {
    SUBMIT_BTN.removeAttribute('disabled');
  }
  /**
   *
   * @param values {}
   * @return string
   */


  function createParamsString(values) {
    var paramsString = '';
    Object.keys(values).map(function (key, index) {
      paramsString += index === 0 ? key + '=' + values[key] : '&' + key + '=' + values[key];
    });
    return paramsString;
  }

  function showResultMessage(className) {
    Array.prototype.forEach.call(contactForm.getElementsByClassName(className), function (element) {
      element.classList.remove(HIDE_CLASS);
    });
  }

  function processForm(form) {
    // by default inputs is not array
    var inputs = form.getElementsByTagName('input');
    var inputValues = collectionToObject(inputs);
    var textareas = form.getElementsByTagName('textarea');
    var areaValues = collectionToObject(textareas);
    var values = Object.assign(inputValues, areaValues);

    if (Object.keys(values).length > 0) {
      var http = new XMLHttpRequest();
      var params = createParamsString(values);
      http.open('POST', URL, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function () {
        if (http.status === 200 && http.responseText.toUpperCase() === 'OK') {
          console.log(http.responseText, 'response from server');
          showResultMessage(SUCCESS_CLASS);
          clearForm(form);
          enableSubmitButton();
        }

        if (http.status === 500) {
          console.log(http.responseText, 'error from server');
          showResultMessage(ERROR_CLASS);
          enableSubmitButton();
        }
      };

      http.send(params);
    }
  } // onSubmit gets data from form inputs and prepare them into object


  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      disableSubmitButton();
      processForm(contactForm);
    });
  }
})();