/*
 * Unit tests for src/solver.js
 */

/* eslint-env jasmine */

'use strict'

const Solver = require('../src/solver')
const _addition = require('../src/expressions/addition')

describe('Solver', function () {
  let solver

  beforeEach(function () {
    solver = new Solver()
  })

  it('mast be defined as Solver Object', function () {
    expect(solver).toBeDefined()
    expect(solver).toEqual(jasmine.any(Object))
    expect(solver).toEqual(jasmine.any(Solver))
  })

  it('can get the operators', function () {
    expect(solver.getOperators).toBeDefined()
    expect(solver.getOperators).toEqual(jasmine.any(Function))
    expect(solver.getOperators()).toEqual(jasmine.any(Object))
    expect(solver.getOperators()).toEqual(jasmine.objectContaining({addition: _addition}))
  })

  it('can use pre-configured operators like sum', function () {
    expect(solver.solve({
      operator: 'sum',
      operand1: 1,
      operand2: 2
    })).toBe(3)
  })

  it('can use pre-configured aliases like plus', function () {
    expect(solver.solve({
      operator: 'plus',
      operand1: 1,
      operand2: 2
    })).toBe(3)
  })

  it('accept any text format other than snake_case', function () {
    expect(solver.solve({
      operator: 'Plus',
      operand1: 1,
      operand2: 2
    })).toBe(3)

    expect(solver.solve({
      operator: 'PLUS',
      operand1: 1,
      operand2: 2
    })).toBe(3)
  })

  it('recognize camelCase format', function () {
    expect(solver.solve({
      operator: 'Plus',
      operand1: 1,
      operand2: 2
    })).toBe(3)

    expect(solver.solve({
      operator: 'PLUS',
      operand1: 1,
      operand2: 2
    })).toBe(3)
  })

  it('can use pre-configured aliases like plus', function () {
    expect(solver.solve({
      operator: 'plus',
      operand1: 1,
      operand2: 2
    })).toBe(3)
  })

  it('accept signed operands', function () {
    expect(solver.solve({
      operator: 'plus',
      operand1: +1,
      operand2: -2
    })).toBe(-1)
  })

  it('accept float operands', function () {
    expect(solver.solve({
      operator: 'sum',
      operand1: 1.8,
      operand2: 2.4
    })).toBe(4.2)
    expect(solver.solve({
      operator: 'sum',
      operand1: 1.5,
      operand2: -4.87
    })).toBe(-3.37)
  })

  it('casts numeral strings', function () {
    expect(solver.solve({
      operator: 'sum',
      operand1: '1',
      operand2: '3'
    })).toBe(4)

    expect(solver.solve({
      operator: 'sum',
      operand1: '1.8',
      operand2: '3.79'
    })).toBe(5.59)

    expect(solver.solve({
      operator: 'sum',
      operand1: '1.8',
      operand2: '-3.79'
    })).toBe(-1.99)
  })

  it('fails if we don\'t pass an object', function () {
    const values = [undefined, NaN, true, 1, 'string']

    expect(function () {
      return solver.solve()
    }).toThrowError(TypeError, 'only expression objects accepted.')

    values.forEach(function (value) {
      expect(function () {
        solver.solve(value)
      }).toThrowError(TypeError, 'only expression objects accepted.')
    })
  })

  it('fails if we pass an array', function () {
    const values = [
      [1, 'sum', 4]
    ]

    values.forEach(function (value) {
      expect(function () {
        solver.solve(value)
      }).toThrowError(TypeError, 'only expression objects accepted.')
    })
  })

  it('fails if we pass an object without the operator', function () {
    const values = [
      {argument1: 1, argument2: 2},
      {operand1: 1, operand2: 2}
    ]

    values.forEach(function (value) {
      expect(function () {
        solver.solve(value)
      }).toThrowError(TypeError, 'missing operator.')
    })
  })

  it('fails if we don\'t pass operand1', function () {
    expect(function () {
      return solver.solve({operator: 'sum'})
    }).toThrowError(TypeError, 'missing operand1.')

    expect(function () {
      return solver.solve({operator: 'sum', operand2: 1})
    }).toThrowError(TypeError, 'missing operand1.')
  })

  it('It doesn\'t require operand2, however, the expression may do', function () {
    expect(function () {
      return solver.solve({operator: 'sum', operand1: 1})
    }).toThrowError(TypeError)
  })

  it('fails if operand1 is undefined', function () {
    expect(function () {
      return solver.solve({operator: 'sum', operand1: undefined})
    }).toThrowError(TypeError, 'operand1 is undefined.')

    expect(function () {
      return solver.solve({operator: 'sum', operand1: undefined, operand2: 1})
    }).toThrowError(TypeError, 'operand1 is undefined.')
  })

  it('fails if the operand used is not defined', function () {
    expect(function () {
      return solver.solve({
        operator: 'notDefinedOperand',
        operand1: 1,
        operand2: 2
      })
    }).toThrowError(TypeError, 'operator not_defined_operand not found.')
  })

  it('required operand1 not to be undefined', function () {
    expect(function () {
      return solver.solve({
        operator: 'sum',
        operand1: undefined,
        operand2: 1
      })
    }).toThrowError(TypeError, 'operand1 is undefined.')
  })

  it('doesn\'t accept non numeric operands (or boolean)', function () {
    const values = [NaN, true, false, 'word']

    values.forEach(function (value) {
      expect(function () {
        return solver.solve({
          operator: 'sum',
          operand1: value,
          operand2: 1
        })
      }).toThrowError(TypeError, 'operand1 is NaN.')
    })

    values.forEach(function (value) {
      expect(function () {
        return solver.solve({
          operator: 'sum',
          operand1: 1,
          operand2: value
        })
      }).toThrowError(TypeError)
    })
  })

  it('is recursive', function () {
    expect(solver.solve({
      operator: 'sum',
      operand1: {
        operator: 'sum',
        operand1: { // 9
          operator: 'sum',
          operand1: { // 7
            operator: 'sum',
            operand1: 3,
            operand2: 4
          },
          operand2: 2
        },
        operand2: { // -4
          operator: 'sum',
          operand1: -8,
          operand2: +4
        }
      },
      operand2: 2
    })).toBe(7)
  })
})

describe('Solver with customized operators', function () {
  it('mast be defined as Solver Object', function () {
    let solver = new Solver({
      foo: function () {
        return 0
      }
    })

    expect(solver).toBeDefined()
    expect(solver).toEqual(jasmine.any(Object))
    expect(solver).toEqual(jasmine.any(Solver))
  })

  it('can set and resolve any added expression as a plugin', function () {
    let solver

    solver = new Solver({
      foo: function () {
        return 0
      }
    })

    expect(solver.solve({
      operator: 'foo',
      operand1: 4,
      operand2: 3
    })).toBe(0)

    solver = new Solver({
      pow: function (x, y) {
        return Math.pow(x, y)
      }
    })

    expect(solver.solve({
      operator: 'pow',
      operand1: 4,
      operand2: 3
    })).toBe(64)
  })

  it('can set and resolve any external object as a plugin', function () {
    let solver

    solver = new Solver(Math)

    expect(solver.solve({
      operator: 'Pow',
      operand1: 4,
      operand2: 3
    })).toBe(64)

    expect(solver.solve({
      operator: 'Pow',
      operand1: 4,
      operand2: 3
    })).toBe(64)

    expect(solver.solve({
      operator: 'ABS',
      operand1: -4.7
    })).toBe(4.7)
  })
})

describe('Solver using the default expressions', function () {
  let solver

  beforeEach(function () {
    solver = new Solver()
  })

  it('can sum integer operands', function () {
    expect(solver.solve({
      operator: '+',
      operand1: 3,
      operand2: 4
    })).toBe(7)

    expect(solver.solve({
      operator: '-',
      operand1: 3,
      operand2: 4
    })).toBe(-1)

    expect(solver.solve({
      operator: '*',
      operand1: 3,
      operand2: 4
    })).toBe(12)

    expect(solver.solve({
      operator: '/',
      operand1: 3,
      operand2: 4
    })).toBe(0.75)

    expect(solver.solve({
      operator: '%',
      operand1: 3,
      operand2: 4
    })).toBe(3)

    expect(solver.solve({
      operator: '++',
      operand1: 3
    })).toBe(4)

    expect(solver.solve({
      operator: '--',
      operand1: 3
    })).toBe(2)
  })
})
