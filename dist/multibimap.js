'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Map = function () {
  function _Map() {
    _classCallCheck(this, _Map);

    this.map = new Map();
  }

  _createClass(_Map, [{
    key: 'addIterable',
    value: function addIterable(k, v) {
      if (!this.map.has(k)) this.map.set(k, new Set());

      var set = this.map.get(k);
      v.forEach(function (val) {
        return set.add(val);
      });
    }
  }, {
    key: 'add',
    value: function add(k, v) {
      if (!this.map.has(k)) this.map.set(k, new Set());

      this.map.get(k).add(v);
    }
  }, {
    key: 'get',
    value: function get(k) {
      return this.map.get(k);
    }
  }, {
    key: 'has',
    value: function has(k, v) {
      if (arguments.length < 2) return this.map.has(k);else return this.map.has(k) && this.map.get(k).has(v);
    }
  }, {
    key: 'delete',
    value: function _delete(k, v) {
      if (arguments.length < 2) this.map.delete(k);else if (this.map.has(k)) this.map.get(k).delete(v);
    }
  }]);

  return _Map;
}();

var MultiBiMap = function () {
  function MultiBiMap() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MultiBiMap);

    this.opts = Object.assign({
      iterableKey: false,
      iterableValue: false
    }, opts);
    this._byKey = new _Map();
    this._byVal = new _Map();
  }

  _createClass(MultiBiMap, [{
    key: 'getKey',
    value: function getKey(k) {
      return this._byKey.has(k) ? [].concat(_toConsumableArray(this._byKey.get(k).values())) : false;
    }
  }, {
    key: 'getVal',
    value: function getVal(v) {
      return this._byVal.has(v) ? [].concat(_toConsumableArray(this._byVal.get(v).values())) : false;
    }
  }, {
    key: 'add',
    value: function add(k, v) {
      var _this = this;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      opts = Object.assign({
        iterableKey: this.opts.iterableKey,
        iterableValue: this.opts.iterableValue
      }, opts);

      k = opts.iterableKey && !Array.isArray(k) ? [k] : k;
      v = opts.iterableValue && !Array.isArray(v) ? [v] : v;

      if (opts.iterableKey && opts.iterableValue) {
        k.forEach(function (k) {
          return _this._byKey.addIterable(k, v);
        });
        v.forEach(function (v) {
          return _this._byVal.addIterable(v, k);
        });
      } else if (opts.iterableKey) {
        this._byVal.addIterable(v, k);
        k.forEach(function (k) {
          return _this._byKey.add(k, v);
        });
      } else if (opts.iterableValue) {
        this._byKey.addIterable(k, v);
        v.forEach(function (v) {
          return _this._byVal.add(v, k);
        });
      } else {
        this._byKey.add(k, v);
        this._byVal.add(v, k);
      }
    }
  }, {
    key: 'has',
    value: function has(k, v) {
      return this._byKey.has(k) && this._byKey.get(k).has(v);
    }
  }, {
    key: 'hasKey',
    value: function hasKey(k) {
      return this._byKey.has(k);
    }
  }, {
    key: 'hasVal',
    value: function hasVal(v) {
      return this._byVal.has(v);
    }
  }, {
    key: 'delete',
    value: function _delete(k, v) {
      if (this._byKey.has(k)) {
        this._byKey.get(k).delete(v);
      }
      if (this._byVal.has(v)) {
        this._byVal.get(v).delete(k);
      }
    }
  }, {
    key: 'deleteKey',
    value: function deleteKey(k) {
      var _this2 = this;

      if (this._byKey.has(k)) {
        this._byKey.get(k).forEach(function (v) {
          if (_this2._byVal.has(v)) _this2._byVal.get(v).delete(k);
        });
        this._byKey.delete(k);
      }
    }
  }, {
    key: 'deleteVal',
    value: function deleteVal(v) {
      var _this3 = this;

      if (this._byVal.has(v)) {
        this._byVal.get(v).forEach(function (k) {
          if (_this3._byKey.has(k)) _this3._byKey.get(k).delete(v);
        });
        this._byVal.delete(v);
      }
    }
  }]);

  return MultiBiMap;
}();

exports.default = MultiBiMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdWx0aWJpbWFwLmpzIl0sIm5hbWVzIjpbIl9NYXAiLCJtYXAiLCJNYXAiLCJrIiwidiIsImhhcyIsInNldCIsIlNldCIsImdldCIsImZvckVhY2giLCJhZGQiLCJ2YWwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJkZWxldGUiLCJNdWx0aUJpTWFwIiwib3B0cyIsIk9iamVjdCIsImFzc2lnbiIsIml0ZXJhYmxlS2V5IiwiaXRlcmFibGVWYWx1ZSIsIl9ieUtleSIsIl9ieVZhbCIsInZhbHVlcyIsIkFycmF5IiwiaXNBcnJheSIsImFkZEl0ZXJhYmxlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLEk7QUFDSixrQkFBYztBQUFBOztBQUNaLFNBQUtDLEdBQUwsR0FBVyxJQUFJQyxHQUFKLEVBQVg7QUFDRDs7OztnQ0FFV0MsQyxFQUFHQyxDLEVBQUc7QUFDaEIsVUFBSSxDQUFDLEtBQUtILEdBQUwsQ0FBU0ksR0FBVCxDQUFhRixDQUFiLENBQUwsRUFDRSxLQUFLRixHQUFMLENBQVNLLEdBQVQsQ0FBYUgsQ0FBYixFQUFnQixJQUFJSSxHQUFKLEVBQWhCOztBQUVGLFVBQU1ELE1BQU0sS0FBS0wsR0FBTCxDQUFTTyxHQUFULENBQWFMLENBQWIsQ0FBWjtBQUNBQyxRQUFFSyxPQUFGLENBQVU7QUFBQSxlQUFPSCxJQUFJSSxHQUFKLENBQVFDLEdBQVIsQ0FBUDtBQUFBLE9BQVY7QUFDRDs7O3dCQUVHUixDLEVBQUdDLEMsRUFBRztBQUNSLFVBQUksQ0FBQyxLQUFLSCxHQUFMLENBQVNJLEdBQVQsQ0FBYUYsQ0FBYixDQUFMLEVBQ0UsS0FBS0YsR0FBTCxDQUFTSyxHQUFULENBQWFILENBQWIsRUFBZ0IsSUFBSUksR0FBSixFQUFoQjs7QUFFRixXQUFLTixHQUFMLENBQVNPLEdBQVQsQ0FBYUwsQ0FBYixFQUFnQk8sR0FBaEIsQ0FBb0JOLENBQXBCO0FBQ0Q7Ozt3QkFFR0QsQyxFQUFHO0FBQ0wsYUFBTyxLQUFLRixHQUFMLENB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TUFBbkIsQ0FBMEJYLENBQTFCO0FBQ0Q7QUFDRjs7OzhCQUVTQSxDLEVBQUc7QUFBQTs7QUFDWCxVQUFJLEtBQUtrQixNQUFMLENBQVloQixHQUFaLENBQWdCRixDQUFoQixDQUFKLEVBQXdCO0FBQ3RCLGFBQUtrQixNQUFMLENBQVliLEdBQVosQ0FBZ0JMLENBQWhCLEVBQW1CTSxPQUFuQixDQUEyQixhQUFLO0FBQzlCLGNBQUksT0FBS2EsTUFBTCxDQUFZakIsR0FBWixDQUFnQkQsQ0FBaEIsQ0FBSixFQUNFLE9BQUtrQixNQUFMLENBQVlkLEdBQVosQ0FBZ0JKLENBQWhCLEVBQW1CVSxNQUFuQixDQUEwQlgsQ0FBMUI7QUFDSCxTQUhEO0FBSUEsYUFBS2tCLE1BQUwsQ0FBWVAsTUFBWixDQUFtQlgsQ0FBbkI7QUFDRDtBQUNGOzs7OEJBRVNDLEMsRUFBRztBQUFBOztBQUNYLFVBQUksS0FBS2tCLE1BQUwsQ0FBWWpCLEdBQVosQ0FBZ0JELENBQWhCLENBQUosRUFBd0I7QUFDdEIsYUFBS2tCLE1BQUwsQ0FBWWQsR0FBWixDQUFnQkosQ0FBaEIsRUFBbUJLLE9BQW5CLENBQTJCLGFBQUs7QUFDOUIsY0FBSSxPQUFLWSxNQUFMLENBQVloQixHQUFaLENBQWdCRixDQUFoQixDQUFKLEVBQ0UsT0FBS2tCLE1BQUwsQ0FBWWIsR0FBWixDQUFnQkwsQ0FBaEIsRUFBbUJXLE1BQW5CLENBQTBCVixDQUExQjtBQUNILFNBSEQ7QUFJQSxhQUFLa0IsTUFBTCxDQUFZUixNQUFaLENBQW1CVixDQUFuQjtBQUNEO0FBQ0Y7Ozs7OztrQkFyRmtCVyxVIiwiZmlsZSI6Im11bHRpYmltYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIF9NYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcCA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIGFkZEl0ZXJhYmxlKGssIHYpIHtcbiAgICBpZiAoIXRoaXMubWFwLmhhcyhrKSlcbiAgICAgIHRoaXMubWFwLnNldChrLCBuZXcgU2V0KCkpO1xuXG4gICAgY29uc3Qgc2V0ID0gdGhpcy5tYXAuZ2V0KGspO1xuICAgIHYuZm9yRWFjaCh2YWwgPT4gc2V0LmFkZCh2YWwpKTtcbiAgfVxuXG4gIGFkZChrLCB2KSB7XG4gICAgaWYgKCF0aGlzLm1hcC5oYXMoaykpXG4gICAgICB0aGlzLm1hcC5zZXQoaywgbmV3IFNldCgpKTtcblxuICAgIHRoaXMubWFwLmdldChrKS5hZGQodik7XG4gIH1cblxuICBnZXQoaykge1xuICAgIHJldHVybiB0aGlzLm1hcC5nZXQoayk7XG4gIH1cblxuICBoYXMoaywgdikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMilcbiAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoayk7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRoaXMubWFwLmhhcyhrKSAmJiB0aGlzLm1hcC5nZXQoaykuaGFzKHYpO1xuICB9XG5cbiAgZGVsZXRlKGssIHYpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpXG4gICAgICB0aGlzLm1hcC5kZWxldGUoayk7XG4gICAgZWxzZVxuICAgICAgaWYgKHRoaXMubWFwLmhhcyhrKSlcbiAgICAgICAgdGhpcy5tYXAuZ2V0KGspLmRlbGV0ZSh2KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aUJpTWFwIHtcbiAgY29uc3RydWN0b3Iob3B0cz17fSkge1xuICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaXRlcmFibGVLZXk6IGZhbHNlLFxuICAgICAgaXRlcmFibGVWYWx1ZTogZmFsc2VcbiAgICB9LCBvcHRzKTtcbiAgICB0aGlzLl9ieUtleSA9IG5ldyBfTWFwKCk7XG4gICAgdGhpcy5fYnlWYWwgPSBuZXcgX01hcCgpO1xuICB9XG5cbiAgZ2V0S2V5KGspIHtcbiAgICByZXR1cm4gdGhpcy5fYnlLZXkuaGFzKGspID8gWy4uLnRoaXMuX2J5S2V5LmdldChrKS52YWx1ZXMoKV0gOiBmYWxzZTtcbiAgfVxuXG4gIGdldFZhbCh2KSB7XG4gICAgcmV0dXJuIHRoaXMuX2J5VmFsLmhhcyh2KSA/IFsuLi50aGlzLl9ieVZhbC5nZXQodikudmFsdWVzKCldIDogZmFsc2U7XG4gIH1cblxuICBhZGQoaywgdiwgb3B0cz17fSkge1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGl0ZXJhYmxlS2V5OiB0aGlzLm9wdHMuaXRlcmFibGVLZXksXG4gICAgICBpdGVyYWJsZVZhbHVlOiB0aGlzLm9wdHMuaXRlcmFibGVWYWx1ZVxuICAgIH0sIG9wdHMpO1xuXG4gICAgayA9IG9wdHMuaXRlcmFibGVLZXkgJiYgIUFycmF5LmlzQXJyYXkoaykgPyBba10gOiBrO1xuICAgIHYgPSBvcHRzLml0ZXJhYmxlVmFsdWUgJiYgIUFycmF5LmlzQXJyYXkodikgPyBbdl0gOiB2O1xuICAgIFxuICAgIGlmIChvcHRzLml0ZXJhYmxlS2V5ICYmIG9wdHMuaXRlcmFibGVWYWx1ZSkge1xuICAgICAgay5mb3JFYWNoKGsgPT4gdGhpcy5fYnlLZXkuYWRkSXRlcmFibGUoaywgdikpO1xuICAgICAgdi5mb3JFYWNoKHYgPT4gdGhpcy5fYnlWYWwuYWRkSXRlcmFibGUodiwgaykpO1xuXG4gICAgfSBlbHNlIGlmIChvcHRzLml0ZXJhYmxlS2V5KSB7XG4gICAgICB0aGlzLl9ieVZhbC5hZGRJdGVyYWJsZSh2LCBrKTtcbiAgICAgIGsuZm9yRWFjaChrID0+IHRoaXMuX2J5S2V5LmFkZChrLCB2KSk7XG5cbiAgICB9IGVsc2UgaWYgKG9wdHMuaXRlcmFibGVWYWx1ZSkge1xuICAgICAgdGhpcy5fYnlLZXkuYWRkSXRlcmFibGUoaywgdik7XG4gICAgICB2LmZvckVhY2godiA9PiB0aGlzLl9ieVZhbC5hZGQodiwgaykpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J5S2V5LmFkZChrLCB2KTtcbiAgICAgIHRoaXMuX2J5VmFsLmFkZCh2LCBrKTtcblxuICAgIH1cbiAgfVxuXG4gIGhhcyhrLCB2KSB7XG4gICAgcmV0dXJuIHRoaXMuX2J5S2V5LmhhcyhrKSAmJiB0aGlzLl9ieUtleS5nZXQoaykuaGFzKHYpO1xuICB9XG5cbiAgaGFzS2V5KGspIHtcbiAgICByZXR1cm4gdGhpcy5fYnlLZXkuaGFzKGspO1xuICB9XG5cbiAgaGFzVmFsKHYpIHtcbiAgICByZXR1cm4gdGhpcy5fYnlWYWwuaGFzKHYpO1xuICB9XG5cbiAgZGVsZXRlKGssIHYpIHtcbiAgICBpZiAodGhpcy5fYnlLZXkuaGFzKGspKSB7XG4gICAgICB0aGlzLl9ieUtleS5nZXQoaykuZGVsZXRlKHYpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYnlWYWwuaGFzKHYpKSB7XG4gICAgICB0aGlzLl9ieVZhbC5nZXQodikuZGVsZXRlKGspO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUtleShrKSB7XG4gICAgaWYgKHRoaXMuX2J5S2V5LmhhcyhrKSkge1xuICAgICAgdGhpcy5fYnlLZXkuZ2V0KGspLmZvckVhY2godiA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9ieVZhbC5oYXModikpXG4gICAgICAgICAgdGhpcy5fYnlWYWwuZ2V0KHYpLmRlbGV0ZShrKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fYnlLZXkuZGVsZXRlKGspO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVZhbCh2KSB7XG4gICAgaWYgKHRoaXMuX2J5VmFsLmhhcyh2KSkge1xuICAgICAgdGhpcy5fYnlWYWwuZ2V0KHYpLmZvckVhY2goayA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9ieUtleS5oYXMoaykpXG4gICAgICAgICAgdGhpcy5fYnlLZXkuZ2V0KGspLmRlbGV0ZSh2KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fYnlWYWwuZGVsZXRlKHYpO1xuICAgIH1cbiAgfVxuXG5cblxufSJdfQ==