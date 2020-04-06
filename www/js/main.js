'use strict';

function debounce(fn, ms) {
  var delayed = false;
  return function () {
    if (!delayed) {
      delayed = true;
      setTimeout(function () {
        delayed = false;
      }, ms);
      fn();
    }
  };
}

function shroudEmail() {
  var username = "info";
  var hostname = "enrian.com";
  var linktext = username + "@" + hostname;
  var emailWrapper = document.getElementById('contactEmail');
  var emailText = document.createTextNode(username + '@' + hostname);
  var email = document.createElement('a');

  if (emailWrapper) {
    email.setAttribute('href', 'mail' + 'to:' + username + '@' + hostname);
    email.appendChild(emailText); // append email

    emailWrapper.appendChild(email);
  }
}

function Dom() {
  var mySVGsToInject = document.querySelectorAll('.inject-me');
  var injectorOptions = {
    evalScripts: 'once'
  };
  SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {});
}

document.addEventListener('DOMContentLoaded', function () {
  Dom();
});