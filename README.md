# core-arbitrary-precision

[![Build Status](https://travis-ci.org/javiercejudo/core-arbitrary-precision.svg)](https://travis-ci.org/javiercejudo/core-arbitrary-precision)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/core-arbitrary-precision/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/core-arbitrary-precision?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/core-arbitrary-precision/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/core-arbitrary-precision)

Abstraction for core arbitrary precision functionality in
[big.js](https://github.com/MikeMcl/big.js),
[bignumber.js](https://github.com/MikeMcl/bignumber.js),
[decimal.js](https://github.com/MikeMcl/decimal.js)
and others via adapters.

## Install

    npm i core-arbitrary-precision

## Usage

Pending CodePen example.

### Adapters

- [[adapter]](https://github.com/javiercejudo/linear-bigjs-adapter) [[lib]](https://github.com/javiercejudo/linear-big.js) linear-big.js
- [[adapter]](https://github.com/javiercejudo/bigjs-adapter) [[lib]](https://github.com/MikeMcl/big.js) big.js
- [[adapter]](https://github.com/javiercejudo/bignumberjs-adapter) [[lib]](https://github.com/MikeMcl/bignumber.js) bignumber.js
- [[adapter]](https://github.com/javiercejudo/decimaljs-adapter) [[lib]](https://github.com/MikeMcl/decimal.js) decimal.js
- [[adapter]](https://github.com/javiercejudo/bigdecimal-adapter) [[lib]](https://github.com/iriscouch/bigdecimal.js) bigdecimal.js
- [[adapter]](https://github.com/javiercejudo/floating-adapter) [[lib]](https://github.com/javiercejudo/floating) floating
- [[adapter]](https://github.com/javiercejudo/linear-converter-adapter) [[lib]](https://github.com/javiercejudo/linear-converter) linear-converter
- [[adapter]](https://github.com/javiercejudo/very-simple-statistics-adapter) [[lib]](https://github.com/sumanla13a/statistics-module) statistics-module

See [up to date list](https://www.npmjs.com/browse/keyword/core-arbitrary-precision-adapter).

### Factory and configuration

```js
var decimalFactory = require('core-arbitrary-precision');
var adapter = require('bigjs-adapter'); // See adapters section for full list

var Decimal = decimalFactory(adapter);

Decimal.getPrecision(); // => 20
Decimal.setPrecision(5);
Decimal.getPrecision(); // => 5
```

### Operations

This core package has no operations, but they can be added:

```js
new Decimal('2').pow(new Decimal('3')).valueOf(); // => Error!

var Decimal = require('pow-arbitrary-precision')(Decimal);
new Decimal('2').pow(new Decimal('3')).valueOf(); // => '8'
```

### toString, valueOf and toJSON

```js
var decimalOne = new Decimal('1');

// with bigjs-adapter (other adapters might have differing implementations)
decimalOne.toString() === decimalOne.valueOf() === decimalOne.toJSON(); // => true

Number(decimalThird); // => 1
```

### JSON.stringify and JSON.parse with reviver

```js
var decimalOne = new Decimal('1');

var stringified = JSON.stringify([decimalOne]); // => '["1"]'

JSON.parse(stringified, decimalOne.JSONReviver)[0]; // => new decimalOne('1')
```

See [spec](test/spec.js).

## Related projects

- [arbitrary-precision](https://github.com/javiercejudo/linear-arbitrary-precision): Arbitrary precision abstraction.
- [linear-arbitrary-precision](https://github.com/javiercejudo/arbitrary-precision): Linear arbitrary precision abstraction.
- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [linear-conversion](https://github.com/javiercejudo/linear-conversion): Linear conversion class for *linear-converter*.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [rescale-util](https://github.com/javiercejudo/rescale-util): Rescale utilities.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
