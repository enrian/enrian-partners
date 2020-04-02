'use strict'; // debounce for optimalization

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
  var header = document.getElementById('js_main-header');
  var navHeight = 80;
  var windowWidth = document.documentElement.clientWidth;
  var mySVGsToInject = document.querySelectorAll('.inject-me');
  var injectorOptions = {
    evalScripts: 'once',
    each: function each(svg) {// Callback after each SVG is injected
      // console.log('SVG injected: ' + svg.getAttribute('id'));
    }
  }; // Trigger the injection

  SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {
    // Callback after all SVGs are injected
    // console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
    if (document.getElementById('enrian-in-the-world')) {
      mapActions();
    }
  });
  var navTrigger = document.getElementById('js_navTrigger');
  navTrigger.addEventListener('click', function () {
    var navBlock = document.getElementById('js_navBlock');

    if (navBlock.classList.contains('is-open')) {
      navTrigger.classList.remove('is-open');
      navBlock.classList.remove('is-open');
      header.classList.remove('is-open');
      return;
    } else {
      navTrigger.classList.add('is-open');
      navBlock.classList.add('is-open');
      header.classList.add('is-open');
    }
  });

  var scrolledHeader = function scrolledHeader() {
    if (window.pageYOffset > navHeight) {
      if (!header.classList.contains('is-scrolled')) {
        header.classList.add('is-scrolled');
      }
    } else {
      if (header.classList.contains('is-scrolled')) {
        header.classList.remove('is-scrolled');
      }
    }
  };

  var formInputs = function formInputs() {
    [].forEach.call(document.querySelectorAll('input.input__field'), function (inputEl, index, array) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        inputEl.parentNode.classList.add('input--filled');
      } // events:


      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      ev.target.parentNode.classList.add('input--filled');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('input--filled');
      }
    }
  };

  smoothScroll.init({
    offset: windowWidth < 1368 ? 80 : 0,
    selectorHeader: '[data-scroll-header]'
  });
  var countersOptions = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.'
  };

  var counters = function counters() {
    var numbersSection = document.getElementById('enrian-numbers');
    var countries = document.getElementById('js_counter-countries');
    var customers = document.getElementById('js_counter-customers');
    var projects = document.getElementById('js_counter-projects');
    var team = document.getElementById('js_counter-team');

    if (numbersSection) {
      var countriesAnim = new CountUp(countries, 0, countries.getAttribute('data-count'), 0, 4, countersOptions);
      var customersAnim = new CountUp(customers, 0, customers.getAttribute('data-count'), 0, 4, countersOptions);
      var projectsAnim = new CountUp(projects, 0, projects.getAttribute('data-count'), 0, 4, countersOptions);
      var teamAnim = new CountUp(team, 0, team.getAttribute('data-count'), 0, 4, countersOptions);
      window.setTimeout(function () {
        countriesAnim.start();
        customersAnim.start();
        projectsAnim.start();
        teamAnim.start();
      }, 1000);
    }
  };

  var ngiStudyCounters = function ngiStudyCounters() {
    var section = document.getElementById('ngi-numbers');
    var teamSize = document.getElementById('js_teamSize');
    var totalTeamSize = document.getElementById('js_totalTeamSize');
    var projectLength = document.getElementById('js_projectLength');

    if (section) {
      var teamSizeAnim = new CountUp(teamSize, 0, teamSize.getAttribute('data-count'), 0, 4, countersOptions);
      var totalTeamSizeAnim = new CountUp(totalTeamSize, 0, totalTeamSize.getAttribute('data-count'), 0, 4, countersOptions);
      var projectLengthAnim = new CountUp(projectLength, 0, projectLength.getAttribute('data-count'), 0, 4, countersOptions);
      window.setTimeout(function () {
        teamSizeAnim.start();
        totalTeamSizeAnim.start();
        projectLengthAnim.start();
      }, 1000);
    }
  };

  var mapActions = function mapActions() {
    var countries = document.querySelectorAll('.js_detail');
    var info = document.getElementById('js_country');
    var infoCountryName = document.getElementById('js_countryName');

    var setCountryName = function setCountryName(el) {
      infoCountryName.textContent = el.getAttribute('data-name');
    };

    var infoBlockPosition = debounce(function (event) {
      var e = event || window.event;
      var mousePos = {
        x: e.clientX,
        y: e.clientY
      };
      info.style.top = mousePos.y - 20 + 'px';
      info.style.left = mousePos.x + 20 + 'px';
    }, 20);
    [].forEach.call(countries, function (el, index, array) {
      el.addEventListener('mouseover', function () {
        setCountryName(el);
        info.classList.add('is-open');
      });
      el.addEventListener('mouseout', function () {
        info.classList.remove('is-open');
      });
    });
    window.addEventListener('mousemove', infoBlockPosition);
  };

  formInputs();
  counters();
  ngiStudyCounters(); // mapActions();

  window.onscroll = function () {
    debounce(scrolledHeader(), 15);
  };
} //------------------------------------------------------------------------------
//------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function () {
  Dom();
  shroudEmail();
  $('.js-slick').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true
  });
}); //------------------------------------------------------------------------------