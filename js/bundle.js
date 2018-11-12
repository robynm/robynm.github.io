(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(el) {
    _classCallCheck(this, View);

    this.el = el;
  }

  _createClass(View, [{
    key: "listenTo",
    value: function listenTo(eventType, selector, listener) {
      var _this = this;

      var elements = this.el.querySelectorAll(selector);

      Array.prototype.forEach.call(elements, function (elem) {
        elem.addEventListener(eventType, listener.bind(_this));
      });
    }
  }, {
    key: "debounce",
    value: function debounce(func, wait, immediate) {
      var timeout = void 0;

      return function () {
        var context = this,
            args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
          func.apply(context, args);
        }
      };
    }
  }]);

  return View;
}();

exports.default = View;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.js');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_AppBase) {
  _inherits(Gallery, _AppBase);

  function Gallery(el) {
    _classCallCheck(this, Gallery);

    // defaults
    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, el));

    _this.imageSelector = '.gallery-open';
    _this.gallerySelector = '.gallery-container';
    _this.contentSelector = 'main';
    _this.displaySelector = '.modal-image';
    _this.imageCollection = _this.el.querySelectorAll('.image-div');
    _this.currentIndex = 0;

    _this.galleryImageSize = window.innerWidth > 640 ? 'large' : 'med';

    _this.listenTo("click", _this.imageSelector, _this.openGallery);
    _this.listenTo("click", ".close", _this.closeGallery);
    _this.listenTo("click", ".next", _this.nextImage);
    _this.listenTo("click", ".prev", _this.prevImage);
    _this.listenTo("click", _this.gallerySelector, _this.handleGalleryClick);

    window.addEventListener("keyup", _this.handleKeyUp.bind(_this));

    return _this;
  }

  _createClass(Gallery, [{
    key: 'openGallery',
    value: function openGallery(e) {
      e.preventDefault();
      var container = this.el.querySelector(this.gallerySelector);
      var body = document.body;

      this.currentIndex = e.target.parentElement.getAttribute('data-order');
      this.displayImageInGallery(this.currentIndex);

      body.classList.add('no-scroll');
      container.classList.add('open');
    }
  }, {
    key: 'closeGallery',
    value: function closeGallery(e) {
      if (e) {
        e.preventDefault();
      }

      var body = document.body;
      var container = this.el.querySelector(this.gallerySelector);
      var image = this.el.querySelector('.gallery-img');

      container.querySelector(this.displaySelector).src = "";
      container.querySelector('.caption').innerHTML = "";

      container.classList.remove('open');
      body.classList.remove('no-scroll');
      this.resetControlVisibility();
    }
  }, {
    key: 'nextImage',
    value: function nextImage(e) {
      if (e) {
        e.preventDefault();
      }

      if (this.currentIndex < this.imageCollection.length - 1) {
        this.currentIndex++;
        this.displayImageInGallery(this.currentIndex);
      }
    }
  }, {
    key: 'prevImage',
    value: function prevImage(e) {
      if (e) {
        e.preventDefault();
      }

      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.displayImageInGallery(this.currentIndex);
      }
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {

      // in-gallery actions
      if (this.el.querySelector('.gallery-container').classList.contains("open")) {
        switch (e.keyCode) {
          case 27:
            // Escape
            this.closeGallery();
            break;

          case 37:
            // Left arrow
            this.prevImage();
            break;

          case 39:
            // Right arrow
            this.nextImage();
            break;
        }
      }
    }
  }, {
    key: 'handleGalleryClick',
    value: function handleGalleryClick(e) {
      // close gallery on background click
      // ignore if gallery isn't open
      if (e.target.classList.contains('gallery-container') && e.target.classList.contains('open')) {
        this.closeGallery(e);
      }
      // toggle control visibility on image click
      else if (e.target.classList.contains('image-container') || e.target.classList.contains('modal-image')) {
          this.toggleControlVisibility();
        }
    }
  }, {
    key: 'toggleControlVisibility',
    value: function toggleControlVisibility() {
      var controls = Array.prototype.slice.call(document.querySelectorAll('.nav'));
      controls.forEach(function (control) {
        return control.classList.toggle('opacity-0');
      });
    }
  }, {
    key: 'resetControlVisibility',
    value: function resetControlVisibility() {
      var controls = Array.prototype.slice.call(document.querySelectorAll('.nav'));
      controls.forEach(function (control) {
        return control.classList.remove('opacity-0');
      });
    }
  }, {
    key: 'displayImageInGallery',
    value: function displayImageInGallery(index) {
      var images = this.imageCollection;
      var gallery = this.el.querySelector(this.gallerySelector);

      var currentImage = images[index].querySelector('img');
      var galleryImage = gallery.querySelector(this.displaySelector);

      galleryImage.classList.add('loading');
      galleryImage.addEventListener('load', function () {
        galleryImage.classList.remove('loading');
      });

      galleryImage.src = currentImage.getAttribute('data-src-' + this.galleryImageSize);
      galleryImage.alt = currentImage.alt;
      gallery.querySelector('.caption').innerHTML = currentImage.alt;
    }
  }]);

  return Gallery;
}(_Base2.default);

exports.default = Gallery;

},{"./Base.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./Base.js');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyLoad = function (_AppBase) {
  _inherits(LazyLoad, _AppBase);

  function LazyLoad(el) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, el));

    _this.images = Array.prototype.slice.call(_this.el.querySelectorAll('.lazy-load'));
    _this.scrollListener = _this.debounce(_this.loadImages, 50).bind(_this);
    _this.imageSize = _this.getImageSize();

    window.addEventListener("DOMContentLoaded", _this.loadImages.bind(_this));
    window.addEventListener("scroll", _this.scrollListener);
    return _this;
  }

  _createClass(LazyLoad, [{
    key: 'getImageSize',
    value: function getImageSize() {
      var screenWidth = window.innerWidth;
      if (window.innerWidth > 600) {
        return 'med';
      }
      return 'small';
    }
  }, {
    key: 'isVisible',
    value: function isVisible(element) {
      var bounds = element.getBoundingClientRect();

      return bounds.top > 0 && bounds.top < window.innerHeight || bounds.bottom > 0 && bounds.bottom < window.innerHeight;
    }
  }, {
    key: 'loadImage',
    value: function loadImage(imageEl) {
      imageEl.src = imageEl.getAttribute('data-src-' + this.imageSize);
      imageEl.classList.remove('lazy-load');
    }
  }, {
    key: 'loadImages',
    value: function loadImages() {
      var _this2 = this;

      if (this.images.length === 0) {
        window.removeEventListener("scroll", this.scrollListener);
        return;
      }

      this.images = this.images.filter(function (img) {
        if (_this2.isVisible(img)) {
          _this2.loadImage(img);
          return false;
        }
        return true;
      });
    }
  }]);

  return LazyLoad;
}(_Base2.default);

exports.default = LazyLoad;

},{"./Base.js":1}],4:[function(require,module,exports){
'use strict';

var _LazyLoad = require('./LazyLoad.js');

var _LazyLoad2 = _interopRequireDefault(_LazyLoad);

var _Gallery = require('./Gallery.js');

var _Gallery2 = _interopRequireDefault(_Gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

  var lazyLoadView = new _LazyLoad2.default(document.querySelector('.container'));
  var galleryView = new _Gallery2.default(document.querySelector('.container'));
})();

},{"./Gallery.js":2,"./LazyLoad.js":3}]},{},[4]);
