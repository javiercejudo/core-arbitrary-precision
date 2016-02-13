/*jshint node:true, mocha:true */

'use strict';

require('should');

var adapter = require('floating-adapter');
var decimalFactory = require('../src/');

describe('core functionality', function() {
  var Decimal = decimalFactory(adapter);

  describe('constructor', function() {
    it('should throw if called without new', function() {
      (function() {
        /*jshint -W064*/
        Decimal('1');
      }).should.throw();
    });

    it('should throw if used without a string', function() {
      (function() {
        new Decimal(1);
      }).should.throw(TypeError);
    });
  });

  describe('getAdapter', function() {
    it('should return the adapter that was passed in', function() {
      Decimal.getAdapter().should.be.exactly(adapter);
    });
  });

  describe('precision', function() {
    it('should be able to get the current precision', function() {
      Decimal.getPrecision().should.have.type('number');
    });

    it('should be able to set the current precision', function() {
      var initialPrecision = Decimal.getPrecision();

      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
      Decimal.setPrecision(initialPrecision);
    });
  });

  describe('implementation', function() {
    it('should expose the implementation constructor', function() {
      new Decimal.Impl(2).plus(new Decimal.Impl(3)).valueOf().should.be.exactly(5);
    });

    it('should be able to set the current precision', function() {
      var initialPrecision = Decimal.getPrecision();

      Decimal.setPrecision(42);
      Decimal.getPrecision().should.be.exactly(42);
      Decimal.setPrecision(initialPrecision);
    });
  });

  describe('toString, valueOf and JSON', function() {
    it('should be able to return a string representation', function() {
      var decimalOne = new Decimal('1');

      decimalOne.toString().should.be.exactly('1')
        .and.exactly(decimalOne.toJSON());

      decimalOne.valueOf().should.be.exactly(1);
    });

    it('should play nicely with Number()', function() {
      var decimalOne = new Decimal('1');

      Number(decimalOne).should.be.exactly(1);
    });

    it('should play nicely with JSON.stringify()', function() {
      var Decimal40 = decimalFactory(adapter);

      Decimal40.setPrecision(40);

      var decimalOne = new Decimal40('1');
      var stringified = JSON.stringify([decimalOne]);

      stringified.should.be.exactly('["1"]');

      JSON.parse(stringified, Decimal40.JSONReviver)[0].should.eql(decimalOne);
    });
  });
});
