/*
 * Unit tests for src/expressions/modulus.js
 */

/* eslint-env jasmine */

const expression = require('../../src/expressions/modulus')

describe('modulus function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can subtract integer operands', function () {
    expect(expression(1, 2)).toBe(1)
    expect(expression(2, -5)).toBe(2)
    expect(expression(-18, -5)).toBe(-3)
    expect(expression(-18, 0)).toEqual(NaN)
  })

  it('can subtract float operands', function () {
    expect(expression(1.8, 2.4)).toBe(1.8)
    expect(expression(1.5, -4.87)).toBe(1.5) // -7.302 rounded
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
