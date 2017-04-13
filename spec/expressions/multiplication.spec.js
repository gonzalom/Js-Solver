/*
 * Unit tests for src/expressions/multiplication.js
 */

/* eslint-env jasmine */

'use strict'

const expression = require('../../src/expressions/multiplication')

describe('multiplication function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can subtract integer operands', function () {
    expect(expression(1, 2)).toBe(2)
    expect(expression(2, -5)).toBe(-10)
    expect(expression(-3, -5)).toBe(15)
  })

  it('can subtract float operands', function () {
    expect(expression(1.8, 2.4)).toBe(4.32)
    expect(expression(1.5, -4.87)).toBe(-7.30) // -7.302 rounded
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
