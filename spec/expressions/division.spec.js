/*
 * Unit tests for src/expressions/division.js
 */

/* eslint-env jasmine */

'use strict'

const expression = require('../../src/expressions/division')

describe('division function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can subtract integer operands', function () {
    expect(expression(8, 4)).toBe(2)
    expect(expression(1, 2)).toBe(0.5)
    expect(expression(2, -5)).toBe(-0.4)
    expect(expression(-3, -5)).toBe(0.6)
    expect(expression(5, 0)).toBe(Infinity)
  })

  it('can subtract float operands', function () {
    expect(expression(1.8, 2.4)).toBe(0.75)
    expect(expression(1.5, -4.87)).toBe(-0.31)
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
