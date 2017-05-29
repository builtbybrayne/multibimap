'use strict';

class _Map {
  constructor() {
    this.map = new Map();
  }

  addIterable(k, v) {
    if (!this.map.has(k))
      this.map.set(k, new Set());

    const set = this.map.get(k);
    v.forEach(val => set.add(val));
  }

  add(k, v) {
    if (!this.map.has(k))
      this.map.set(k, new Set());

    this.map.get(k).add(v);
  }

  get(k) {
    return this.map.get(k);
  }

  has(k, v) {
    if (arguments.length < 2)
      return this.map.has(k);
    else
      return this.map.has(k) && this.map.get(k).has(v);
  }

  delete(k, v) {
    if (arguments.length < 2)
      this.map.delete(k);
    else
      if (this.map.has(k))
        this.map.get(k).delete(v);
  }
}

export default class MultiBiMap {
  constructor(opts={}) {
    this.opts = Object.assign({
      iterableKey: false,
      iterableValue: false
    }, opts);
    this._byKey = new _Map();
    this._byVal = new _Map();
  }

  getKey(k) {
    return this._byKey.has(k) ? [...this._byKey.get(k).values()] : false;
  }

  getVal(v) {
    return this._byVal.has(v) ? [...this._byVal.get(v).values()] : false;
  }

  add(k, v, opts={}) {
    opts = Object.assign({
      iterableKey: this.opts.iterableKey,
      iterableValue: this.opts.iterableValue
    }, opts);

    k = opts.iterableKey && !Array.isArray(k) ? [k] : k;
    v = opts.iterableValue && !Array.isArray(v) ? [v] : v;
    
    if (opts.iterableKey && opts.iterableValue) {
      k.forEach(k => this._byKey.addIterable(k, v));
      v.forEach(v => this._byVal.addIterable(v, k));

    } else if (opts.iterableKey) {
      this._byVal.addIterable(v, k);
      k.forEach(k => this._byKey.add(k, v));

    } else if (opts.iterableValue) {
      this._byKey.addIterable(k, v);
      v.forEach(v => this._byVal.add(v, k));

    } else {
      this._byKey.add(k, v);
      this._byVal.add(v, k);

    }
  }

  has(k, v) {
    return this._byKey.has(k) && this._byKey.get(k).has(v);
  }

  hasKey(k) {
    return this._byKey.has(k);
  }

  hasVal(v) {
    return this._byVal.has(v);
  }

  delete(k, v) {
    if (this._byKey.has(k)) {
      this._byKey.get(k).delete(v);
    }
    if (this._byVal.has(v)) {
      this._byVal.get(v).delete(k);
    }
  }

  deleteKey(k) {
    if (this._byKey.has(k)) {
      this._byKey.get(k).forEach(v => {
        if (this._byVal.has(v))
          this._byVal.get(v).delete(k);
      });
      this._byKey.delete(k);
    }
  }

  deleteVal(v) {
    if (this._byVal.has(v)) {
      this._byVal.get(v).forEach(k => {
        if (this._byKey.has(k))
          this._byKey.get(k).delete(v);
      });
      this._byVal.delete(v);
    }
  }



}