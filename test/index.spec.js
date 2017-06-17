'use strict';
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('index', () => {
  it('should be requireable without error', () => {
    expect(() => require('../src/index')).not.to.throw();
  });
});