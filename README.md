Solver
======

[![Build Status][ico-travis]][link-travis]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Software License][ico-license]](LICENCE.md)

# About

Javascript Object to solve arithmetic expressions.


# Installation

Clone the project with the following command:

```bash
git clone git@github.com:gonzalom/Js-Solver.git
```

Then you need to install npm packages:
```bash
npm install
```

# Usage

Plus and Times:

```javascript
const Solver = require('path/to/src/solver')

let solver = new Solver()

console.log(
  solver.solve({
    operand1: 3,
    operator: 'Plus',
    operand2: 1
  })
) // 3 + 1 = 4

console.log(
  solver.solve({
    operand1: 6,
    operator: 'Times',
    operand2: 2
  })
) // 6 * 2 = 12
```

Recursive:

```javascript
const Solver = require('path/to/src/solver')

let solver = new Solver()

console.log(
  solver.solve({
    operand1: 3,
    operator: 'Plus',
    operand2: {
      operand1: 6,
      operator: 'Times',
      operand2: 2
    }
  })
) // 3 + (6 * 2) = 15
```

# Issues

Bug reports and feature requests can be submitted on the [Github Issue Tracker](https://github.com/gonzalom/Js-Solver/issues).

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information.

# License

The Laravel Model Base is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://travis-ci.org/gonzalom/Js-Solver.svg?branch=master

[link-travis]: https://travis-ci.org/gonzalom/Js-Solver
[link-author]: https://github.com/gonzalom
