'use strict';
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

import MultiBiMap from '../src/multibimap';

const lk1 = 'k1';
const lk2 = 'k2';
const lk3 = 'k3';
const lk4 = 'k4';

const lv1 = 'v1';
const lv2 = 'v2';
const lv3 = 'v3';
const lv4 = 'v4';


const ik1 = [lk2, lk3];
const ik2 = [lk3, lk4];
const iv1 = [lv2, lv3];
const iv2 = [lv3, lv4];


describe('basic behaviour', () => {
  let map;

  beforeEach(() => {
    map = new MultiBiMap({
      iterableKey: false,
      iterableValue: false
    });
  });

  it('should return false for has() and get() with unknown keys or values', () => {
    expect(map.hasKey('unknown')).to.be.false;
    expect(map.getKey('unknown')).to.be.false;
    expect(map.hasVal('unknown')).to.be.false;
    expect(map.getVal('unknown')).to.be.false;
  });

  it('should add(k, v), with has(), key() and val() returning as expected', () => {
    map.add(lk1, lv1);
    expect(map.hasKey(lk1)).to.be.true;
    expect(map.hasVal(lv1)).to.be.true;

    expect(map.getKey(lk1)).to.eql([lv1]);
    expect(map.getVal(lv1)).to.eql([lk1]);
  });

  it('should allow repeated adds', () => {
    map.add(lk1, lv1);
    expect(map.hasKey(lk1)).to.be.true;
    expect(map.hasKey(lk2)).to.be.false;
    expect(map.hasVal(lv1)).to.be.true;
    expect(map.hasVal(lv2)).to.be.false;

    expect(map.getKey(lk1)).to.eql([lv1]);
    expect(map.getKey(lk2)).to.be.false;
    expect(map.getVal(lv1)).to.eql([lk1]);
    expect(map.getVal(lv2)).to.be.false;
  });

  it('should add new, separate k-v pairings', () => {
    map.add(lk1, lv1);
    map.add(lk2, lv2);
    expect(map.hasKey(lk1)).to.be.true;
    expect(map.hasKey(lk2)).to.be.true;
    expect(map.hasVal(lv1)).to.be.true;
    expect(map.hasVal(lv2)).to.be.true;

    expect(map.getKey(lk1)).to.eql([lv1]);
    expect(map.getKey(lk2)).to.eql([lv2]);
    expect(map.getVal(lv1)).to.eql([lk1]);
    expect(map.getVal(lv2)).to.eql([lk2]);
  });

  it('should combine new, overlapping k-v pairings', () => {
    map.add(lk1, lv1);
    map.add(lk2, lv2);
    map.add(lk1, lv2);
    expect(map.hasKey(lk1)).to.be.true;
    expect(map.hasKey(lk2)).to.be.true;
    expect(map.hasVal(lv1)).to.be.true;
    expect(map.hasVal(lv2)).to.be.true;

    expect(map.getKey(lk1)).to.eql([lv1, lv2]);
    expect(map.getKey(lk2)).to.eql([lv2]);
    expect(map.getVal(lv1)).to.eql([lk1]);
    expect(map.getVal(lv2)).to.eql([lk2, lk1]);
  });

  it('should delete pairings', () => {
    map.add(lk1, lv1);
    map.add(lk1, lv2);
    map.add(lk2, lv1);
    map.delete(lk1, lv1);
    expect(map.hasKey(lk1)).to.be.true;
    expect(map.hasVal(lv1)).to.be.true;
    expect(map.has(lk1, lv1)).to.be.false;
    expect(map.getKey(lk1)).to.eql([lv2]);
    expect(map.getVal(lv1)).to.eql([lk2]);
  });

  it('should delete both key and value entries if a mapping is removed and it is the only mapping that contains those entitites', () => {
    map.add(lk1, lv1);
    map.delete(lk1, lv1);
    expect(map.hasKey(lk1)).to.be.false;
    expect(map.hasVal(lv1)).to.be.false;
    expect(map.getKey(lk1)).to.be.false;
    expect(map.getVal(lv1)).to.be.false;
  });

  it('should delete entire keys', () => {
    map.add(lk1, lv1);
    map.add(lk1, lv2);
    map.add(lk2, lv1);
    map.deleteKey(lk1);
    expect(map.hasKey(lk1)).to.be.false;
    expect(map.getVal(lv1)).to.eql([lk2]);
  });

  it('should delete entire vals', () => {
    map.add(lk1, lv1);
    map.add(lk2, lv1);
    map.add(lk1, lv2);
    map.deleteVal(lv1);
    expect(map.hasVal(lv1)).to.be.false;
    expect(map.getKey(lk1)).to.eql([lv2]);
  });

  it('should delete the value entry if a key is removed and it is the only pointer to that val', () => {
    map.add(lk1, lv1);
    map.add(lk1, lv2);
    map.add(lk2, lv2);

    map.deleteKey(lk1);
    expect(map.hasVal(lv1)).to.be.false;
    expect(map.hasVal(lv2)).to.be.true;
  });

  it('should delete the key entry if a value is removed and it is the only pointer to that key', () => {
    map.add(lk1, lv1);
    map.add(lk1, lv2);
    map.add(lk2, lv2);

    map.deleteVal(lv2);
    expect(map.hasKey(lk2)).to.be.false;
    expect(map.hasKey(lk1)).to.be.true;
  });

});


class With {
  constructor(map, opts) {
    this.map = map;
    const gives = new Gives(map, this);

    const _this = this;

    function done() {
      map.add(_this.k, _this.v, opts);
      return {gives};
    }

    this.and = {
      lv() {
        _this.v = lv1;
        return done();
      },
      iv() {
        _this.v = iv1;
        return done();
      }
    }
  }

  lk() {
    this.k = lk1;
    return this;
  }

  ik() {
    this.k = ik1;
    return this;
  }
}

class Gives {
  constructor(map, inputs) {
    this.map = map;
    this.inputs = inputs;
    const _this = this;

    const done = () => {
      this.k.forEach(k => {
        expect(map.getKey(k)).to.eql(this.v);
      });
      this.v.forEach(v => {
        expect(map.getVal(v)).to.eql(this.k);
      });
    };

    this.and = {
      lv() { // whatever we got as V, we are now treating it as a literal
        _this.v = [inputs.v];
        expect(map.hasVal(inputs.v)).to.be.true;
        done();
      },
      iv() { // if we got an array as v then we treat it as an iterable;
        _this.v = Array.isArray(inputs.v) ? inputs.v : [inputs.v];
        _this.v.forEach(v => expect(map.hasVal(v)).to.be.true);
        done();
      }
    }
  }

  lk() { // Whatever got passed in as K, we are now treating it as a literal
    this.k = [this.inputs.k];
    expect(this.map.hasKey(this.inputs.k)).to.be.true;
    return this;
  }

  ik() { // If we got an array we treat it as an iterable, otherwise create a new iterable for easier testing
    this.k = Array.isArray(this.inputs.k) ? this.inputs.k : [this.inputs.k];
    this.k.forEach(k => expect(this.map.hasKey(k)).to.be.true);
    return this;
  }
}

class Test {
  constructor(map, opts = {}) {
    this.with = new With(map, opts);
  }
}


describe('iterable vs literal behaviour', () => {
  let map;

  describe('iterableKey = FALSE and iterableValue = FALSE as default', () => {
    beforeEach(() => {
      map = new MultiBiMap({
        iterableKey: false,
        iterableValue: false
      });
    });

    it('should treat literal inputs transparently', () => {
      new Test(map, {}).with.lk().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable keys as literals ', () => {
      new Test(map, {}).with.ik().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable values as literals', () => {
      new Test(map, {}).with.lk().and.iv().gives.lk().and.lv();
    });
    it('should honour iterableKey override', () => {
      new Test(map, {iterableKey: true}).with.ik().and.lv().gives.ik().and.lv();
    });
    it('should honour iterableValue override', () => {
      new Test(map, {iterableValue: true}).with.lk().and.iv().gives.lk().and.iv();
    });
    it('should honour both iterableKey and iterableValue override', () => {
      new Test(map, {iterableKey: true, iterableValue: true}).with.ik().and.iv().gives.ik().and.iv();
    });
  });


  describe('iterableKey = TRUE and iterableValue = FALSE as default', () => {
    let map;

    beforeEach(() => {
      map = new MultiBiMap({
        iterableKey: true,
        iterableValue: false
      });
    });

    it('should treat literal inputs transparently', () => {
      new Test(map, {}).with.lk().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable keys as iterables', () => {
      new Test(map, {}).with.ik().and.lv().gives.ik().and.lv();
    });
    it('should treat iterable values as literals', () => {
      new Test(map, {}).with.lk().and.iv().gives.lk().and.lv();
    });
    it('should honour iterableKey override', () => {
      new Test(map, {iterableKey: false}).with.ik().and.lv().gives.lk().and.lv();
    });
    it('should honour iterableValue override', () => {
      new Test(map, {iterableValue: true}).with.lk().and.iv().gives.lk().and.iv();
    });
    it('should honour both iterableKey and iterableValue override', () => {
      new Test(map, {iterableKey: false, iterableValue: true}).with.ik().and.iv().gives.lk().and.iv();
    });
  });

  describe('iterableKey = FALSE and iterableValue = TRUE as default', () => {
    let map;

    beforeEach(() => {
      map = new MultiBiMap({
        iterableKey: false,
        iterableValue: true
      });
    });

    it('should treat literal inputs transparently', () => {
      new Test(map, {}).with.lk().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable keys as literals', () => {
      new Test(map, {}).with.ik().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable values as iterables', () => {
      new Test(map, {}).with.lk().and.iv().gives.lk().and.iv();
    });
    it('should honour iterableKey override', () => {
      new Test(map, {iterableKey: true}).with.ik().and.lv().gives.ik().and.lv();
    });
    it('should honour iterableValue override', () => {
      new Test(map, {iterableValue: false}).with.lk().and.iv().gives.lk().and.lv();
    });
    it('should honour both iterableKey and iterableValue override', () => {
      new Test(map, {iterableKey: true, iterableValue: false}).with.ik().and.iv().gives.ik().and.lv();
    });
  });

  describe('iterableKey = TRUE and iterableValue = TRUE as default', () => {
    let map;

    beforeEach(() => {
      map = new MultiBiMap({
        iterableKey: true,
        iterableValue: true
      });
    });

    it('should treat literal inputs transparently', () => {
      new Test(map, {}).with.lk().and.lv().gives.lk().and.lv();
    });
    it('should treat iterable keys as iterables', () => {
      new Test(map, {}).with.ik().and.lv().gives.ik().and.lv();
    });
    it('should treat iterable values as iterables', () => {
      new Test(map, {}).with.lk().and.iv().gives.lk().and.iv();
    });
    it('should honour iterableKey override', () => {
      new Test(map, {iterableKey: false}).with.ik().and.lv().gives.lk().and.lv();
    });
    it('should honour iterableValue override', () => {
      new Test(map, {iterableValue: false}).with.lk().and.iv().gives.lk().and.lv();
    });
    it('should honour both iterableKey and iterableValue override', () => {
      new Test(map, {iterableKey: false, iterableValue: false}).with.ik().and.iv().gives.lk().and.lv();
    });
  });


});
