/*jshint node:true */

'use strict';

var isString = require('lodash.isstring');
var assert = require('assert-error');

module.exports = function factory(adapter) {
  var Impl = adapter.getInstance();

  function Decimal(x) {
    assert(this instanceof Decimal, new Error('Decimal must be called with new'));
    assert(isString(x), new TypeError('Expected a string but instead got ' + typeof x));

    var value = new Impl(adapter.parseInput(x));

    this.val = function val() {
      return value;
    };
  }

  Decimal.getAdapter = getAdapter;
  Decimal.getPrecision = getPrecision;
  Decimal.setPrecision = setPrecision;
  Decimal.JSONReviver = JSONReviver;
  Decimal.Impl = Impl;

  var p = Decimal.prototype;

  p.toString = p.toJSON = function toString() {
    return adapter.toString(this.val());
  };

  p.valueOf = function valueOf() {
    return adapter.valueOf(this.val());
  };

  function getAdapter() {
    return adapter;
  }

  function getPrecision() {
    return adapter.getPrecision(Impl);
  }

  function setPrecision(n) {
    adapter.setPrecision(Impl, n);
  }

  function JSONReviver(key, x) {
    if (key === '') {
      return x;
    }

    return new Decimal(x);
  }

  return Decimal;
};
