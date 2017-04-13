/*
 * Unit tests for src/expressions/subtraction.js
 */

/* eslint-env jasmine */

const expression = require('../../src/expressions/subtraction')

describe('subtraction function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can subtract integer operands', function () {
    expect(expression(1, 2)).toBe(-1)
    expect(expression(1, -5)).toBe(6)
  })

  it('can subtract float operands', function () {
    expect(expression(1.8, 2.4)).toBe(-0.6)
    expect(expression(1.5, -4.87)).toBe(6.37)
  })

  it('requires one operands', function () {
    expect(function () {
      expression()
    }).toThrowError(TypeError, 'Requires two operands.')

    expect(function () {
      expression(undefined)
    }).toThrowError(TypeError, 'Requires two operands.')
    expect(function () {
      expression(1)
    }).toThrowError(TypeError, 'Requires two operands.')

    expect(function () {
      expression(1, undefined)
    }).toThrowError(TypeError, 'Requires two operands.')

    expect(function () {
      expression(undefined, undefined)
    }).toThrowError(TypeError, 'Requires two operands.')
  })
})
