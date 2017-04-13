/*
 * Unit tests for src/expressions/addition.js
 */

/* eslint-env jasmine */

'use strict'

const expression = require('../../src/expressions/addition')

describe('expression function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can sum integer operands', function () {
    expect(expression(1, 2)).toBe(3)
    expect(expression(-5, 1)).toBe(-4)
  })

  it('can sum float operands', function () {
    expect(expression(1.8, 2.4)).toBe(4.2)
    expect(expression(1.5, -4.87)).toBe(-3.37)
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
