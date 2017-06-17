'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multibimap = require('./multibimap');

Object.keys(_multibimap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _multibimap[key];
    }
  });
});

require('babel-polyfill');

var _multibimap2 = _interopRequireDefault(_multibimap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _multibimap2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCBNdWx0aUJpTWFwIGZyb20gJy4vbXVsdGliaW1hcCc7XG5leHBvcnQgKiBmcm9tICcuL211bHRpYmltYXAnO1xuZXhwb3J0IGRlZmF1bHQgTXVsdGlCaU1hcDsiXX0=