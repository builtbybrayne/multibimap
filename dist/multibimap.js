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
      if (arguments.length < 2) this.map.delete(k);else if (this.map.has(k)) {
        this.map.get(k).delete(v);
      }
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
      deleteOnly(k, v, this._byKey, this._byVal);
      deleteOnly(v, k, this._byVal, this._byKey);
    }
  }, {
    key: 'deleteKey',
    value: function deleteKey(k) {
      deleteAll(k, this._byKey, this._byVal);
    }
  }, {
    key: 'deleteVal',
    value: function deleteVal(v) {
      deleteAll(v, this._byVal, this._byKey);
    }
  }]);

  return MultiBiMap;
}();

exports.default = MultiBiMap;


function deleteAll(a, aMap, bMap) {
  if (aMap.has(a)) {
    aMap.get(a).forEach(function (b) {
      return deleteOnly(b, a, bMap);
    });
    aMap.delete(a);
  }
}

function deleteOnly(a, b, aMap) {
  if (aMap.has(a)) {
    var bSet = aMap.get(a);
    bSet.delete(b);
    if (!bSet.size) {
      aMap.delete(a);
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tdWx0aWJpbWFwLmpzIl0sIm5hbWVzIjpbIl9NYXAiLCJtYXAiLCJNYXAiLCJrIiwidiIsImhhcyIsInNldCIsIlNldCIsImdldCIsImZvckVhY2giLCJhZGQiLCJ2YWwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJkZWxldGUiLCJNdWx0aUJpTWFwIiwib3B0cyIsIk9iamVjdCIsImFzc2lnbiIsIml0ZXJhYmxlS2V5IiwiaXRlcmFibGVWYWx1ZSIsIl9ieUtleSIsIl9ieVZhbCIsInZhbHVlcyIsIkFycmF5IiwiaXNBcnJheSIsImFkZEl0ZXJhYmxlIiwiZGVsZXRlT25seSIsImRlbGV0ZUFsbCIsImEiLCJhTWFwIiwiYk1hcCIsImIiLCJiU2V0Iiwic2l6ZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxJO0FBQ0osa0JBQWM7QUFBQTs7QUFDWixTQUFLQyxHQUFMLEdBQVcsSUFBSUMsR0FBSixFQUFYO0FBQ0Q7Ozs7Z0NBRVdDLEMsRUFBR0MsQyxFQUFHO0FBQ2hCLFVBQUksQ0FBQyxLQUFLSCxHQUFMLENBQVNJLEdBQVQsQ0FBYUYsQ0FBYixDQUFMLEVBQ0UsS0FBS0YsR0FBTCxDQUFTSyxHQUFULENBQWFILENBQWIsRUFBZ0IsSUFBSUksR0FBSixFQUFoQjs7QUFFRixVQUFNRCxNQUFNLEtBQUtMLEdBQUwsQ0FBU08sR0FBVCxDQUFhTCxDQUFiLENBQVo7QUFDQUMsUUFBRUssT0FBRixDQUFVO0FBQUEsZUFBT0gsSUFBSUksR0FBSixDQUFRQyxHQUFSLENBQVA7QUFBQSxPQUFWO0FBQ0Q7Ozt3QkFFR1IsQyxFQUFHQyxDLEVBQUc7QUFDUixVQUFJLENBQUMsS0FBS0gsR0FBTCxDQUFTSSxHQUFULENBQWFGLENBQWIsQ0FBTCxFQUNFLEtBQUtGLEdBQUwsQ0FBU0ssR0FBVCxDQUFhSCxDQUFiLEVBQWdCLElBQUlJLEdBQUosRUFBaEI7O0FBRUYsV0FBS04sR0FBTCxDQUFTTyxHQUFULENBQWFMLENBQWIsRUFBZ0JPLEdB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QkFBVXpCLENBQVYsRUFBYSxLQUFLa0IsTUFBbEIsRUFBMEIsS0FBS0MsTUFBL0I7QUFDRDs7OzhCQUVTbEIsQyxFQUFHO0FBQ1h3QixnQkFBVXhCLENBQVYsRUFBYSxLQUFLa0IsTUFBbEIsRUFBMEIsS0FBS0QsTUFBL0I7QUFDRDs7Ozs7O2tCQXJFa0JOLFU7OztBQXlFckIsU0FBU2EsU0FBVCxDQUFtQkMsQ0FBbkIsRUFBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUNoQyxNQUFJRCxLQUFLekIsR0FBTCxDQUFTd0IsQ0FBVCxDQUFKLEVBQWlCO0FBQ2ZDLFNBQUt0QixHQUFMLENBQVNxQixDQUFULEVBQVlwQixPQUFaLENBQW9CO0FBQUEsYUFBS2tCLFdBQVdLLENBQVgsRUFBY0gsQ0FBZCxFQUFpQkUsSUFBakIsQ0FBTDtBQUFBLEtBQXBCO0FBQ0FELFNBQUtoQixNQUFMLENBQVllLENBQVo7QUFDRDtBQUNGOztBQUVELFNBQVNGLFVBQVQsQ0FBb0JFLENBQXBCLEVBQXVCRyxDQUF2QixFQUEwQkYsSUFBMUIsRUFBZ0M7QUFDOUIsTUFBSUEsS0FBS3pCLEdBQUwsQ0FBU3dCLENBQVQsQ0FBSixFQUFpQjtBQUNmLFFBQU1JLE9BQU9ILEtBQUt0QixHQUFMLENBQVNxQixDQUFULENBQWI7QUFDQUksU0FBS25CLE1BQUwsQ0FBWWtCLENBQVo7QUFDQSxRQUFJLENBQUNDLEtBQUtDLElBQVYsRUFBZ0I7QUFDZEosV0FBS2hCLE1BQUwsQ0FBWWUsQ0FBWjtBQUNEO0FBQ0Y7QUFDRiIsImZpbGUiOiJtdWx0aWJpbWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBfTWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXAgPSBuZXcgTWFwKCk7XG4gIH1cblxuICBhZGRJdGVyYWJsZShrLCB2KSB7XG4gICAgaWYgKCF0aGlzLm1hcC5oYXMoaykpXG4gICAgICB0aGlzLm1hcC5zZXQoaywgbmV3IFNldCgpKTtcblxuICAgIGNvbnN0IHNldCA9IHRoaXMubWFwLmdldChrKTtcbiAgICB2LmZvckVhY2godmFsID0+IHNldC5hZGQodmFsKSk7XG4gIH1cblxuICBhZGQoaywgdikge1xuICAgIGlmICghdGhpcy5tYXAuaGFzKGspKVxuICAgICAgdGhpcy5tYXAuc2V0KGssIG5ldyBTZXQoKSk7XG5cbiAgICB0aGlzLm1hcC5nZXQoaykuYWRkKHYpO1xuICB9XG5cbiAgZ2V0KGspIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuZ2V0KGspO1xuICB9XG5cbiAgaGFzKGssIHYpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpXG4gICAgICByZXR1cm4gdGhpcy5tYXAuaGFzKGspO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLm1hcC5oYXMoaykgJiYgdGhpcy5tYXAuZ2V0KGspLmhhcyh2KTtcbiAgfVxuXG4gIGRlbGV0ZShrLCB2KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKVxuICAgICAgdGhpcy5tYXAuZGVsZXRlKGspO1xuICAgIGVsc2UgaWYgKHRoaXMubWFwLmhhcyhrKSkge1xuICAgICAgdGhpcy5tYXAuZ2V0KGspLmRlbGV0ZSh2KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlCaU1hcCB7XG4gIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaXRlcmFibGVLZXk6IGZhbHNlLFxuICAgICAgaXRlcmFibGVWYWx1ZTogZmFsc2VcbiAgICB9LCBvcHRzKTtcbiAgICB0aGlzLl9ieUtleSA9IG5ldyBfTWFwKCk7XG4gICAgdGhpcy5fYnlWYWwgPSBuZXcgX01hcCgpO1xuICB9XG5cbiAgZ2V0S2V5KGspIHtcbiAgICByZXR1cm4gdGhpcy5fYnlLZXkuaGFzKGspID8gWy4uLnRoaXMuX2J5S2V5LmdldChrKS52YWx1ZXMoKV0gOiBmYWxzZTtcbiAgfVxuXG4gIGdldFZhbCh2KSB7XG4gICAgcmV0dXJuIHRoaXMuX2J5VmFsLmhhcyh2KSA/IFsuLi50aGlzLl9ieVZhbC5nZXQodikudmFsdWVzKCldIDogZmFsc2U7XG4gIH1cblxuICBhZGQoaywgdiwgb3B0cyA9IHt9KSB7XG4gICAgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgaXRlcmFibGVLZXk6IHRoaXMub3B0cy5pdGVyYWJsZUtleSxcbiAgICAgIGl0ZXJhYmxlVmFsdWU6IHRoaXMub3B0cy5pdGVyYWJsZVZhbHVlXG4gICAgfSwgb3B0cyk7XG5cbiAgICBrID0gb3B0cy5pdGVyYWJsZUtleSAmJiAhQXJyYXkuaXNBcnJheShrKSA/IFtrXSA6IGs7XG4gICAgdiA9IG9wdHMuaXRlcmFibGVWYWx1ZSAmJiAhQXJyYXkuaXNBcnJheSh2KSA/IFt2XSA6IHY7XG5cbiAgICBpZiAob3B0cy5pdGVyYWJsZUtleSAmJiBvcHRzLml0ZXJhYmxlVmFsdWUpIHtcbiAgICAgIGsuZm9yRWFjaChrID0+IHRoaXMuX2J5S2V5LmFkZEl0ZXJhYmxlKGssIHYpKTtcbiAgICAgIHYuZm9yRWFjaCh2ID0+IHRoaXMuX2J5VmFsLmFkZEl0ZXJhYmxlKHYsIGspKTtcblxuICAgIH0gZWxzZSBpZiAob3B0cy5pdGVyYWJsZUtleSkge1xuICAgICAgdGhpcy5fYnlWYWwuYWRkSXRlcmFibGUodiwgayk7XG4gICAgICBrLmZvckVhY2goayA9PiB0aGlzLl9ieUtleS5hZGQoaywgdikpO1xuXG4gICAgfSBlbHNlIGlmIChvcHRzLml0ZXJhYmxlVmFsdWUpIHtcbiAgICAgIHRoaXMuX2J5S2V5LmFkZEl0ZXJhYmxlKGssIHYpO1xuICAgICAgdi5mb3JFYWNoKHYgPT4gdGhpcy5fYnlWYWwuYWRkKHYsIGspKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9ieUtleS5hZGQoaywgdik7XG4gICAgICB0aGlzLl9ieVZhbC5hZGQodiwgayk7XG5cbiAgICB9XG4gIH1cblxuICBoYXMoaywgdikge1xuICAgIHJldHVybiB0aGlzLl9ieUtleS5oYXMoaykgJiYgdGhpcy5fYnlLZXkuZ2V0KGspLmhhcyh2KTtcbiAgfVxuXG4gIGhhc0tleShrKSB7XG4gICAgcmV0dXJuIHRoaXMuX2J5S2V5LmhhcyhrKTtcbiAgfVxuXG4gIGhhc1ZhbCh2KSB7XG4gICAgcmV0dXJuIHRoaXMuX2J5VmFsLmhhcyh2KTtcbiAgfVxuXG4gIGRlbGV0ZShrLCB2KSB7XG4gICAgZGVsZXRlT25seShrLCB2LCB0aGlzLl9ieUtleSwgdGhpcy5fYnlWYWwpO1xuICAgIGRlbGV0ZU9ubHkodiwgaywgdGhpcy5fYnlWYWwsIHRoaXMuX2J5S2V5KTtcbiAgfVxuXG4gIGRlbGV0ZUtleShrKSB7XG4gICAgZGVsZXRlQWxsKGssIHRoaXMuX2J5S2V5LCB0aGlzLl9ieVZhbCk7XG4gIH1cblxuICBkZWxldGVWYWwodikge1xuICAgIGRlbGV0ZUFsbCh2LCB0aGlzLl9ieVZhbCwgdGhpcy5fYnlLZXkpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gZGVsZXRlQWxsKGEsIGFNYXAsIGJNYXApIHtcbiAgaWYgKGFNYXAuaGFzKGEpKSB7XG4gICAgYU1hcC5nZXQoYSkuZm9yRWFjaChiID0+IGRlbGV0ZU9ubHkoYiwgYSwgYk1hcCkpO1xuICAgIGFNYXAuZGVsZXRlKGEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU9ubHkoYSwgYiwgYU1hcCkge1xuICBpZiAoYU1hcC5oYXMoYSkpIHtcbiAgICBjb25zdCBiU2V0ID0gYU1hcC5nZXQoYSk7XG4gICAgYlNldC5kZWxldGUoYik7XG4gICAgaWYgKCFiU2V0LnNpemUpIHtcbiAgICAgIGFNYXAuZGVsZXRlKGEpO1xuICAgIH1cbiAgfVxufSJdfQ==