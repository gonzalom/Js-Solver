/*
 * Unit tests for src/expressions/decrement.js
 */

/* eslint-env jasmine */

'use strict'

const expression = require('../../src/expressions/decrement')

describe('decrement function', function () {
  it('mast be defined as Function', function () {
    expect(expression).toBeDefined()
    expect(expression).toEqual(jasmine.any(Function))
  })

  it('can subtract integer operands', function () {
    expect(expression(1)).toBe(0)
    expect(expression(-5)).toBe(-6)
    expect(expression(8)).toBe(7)
    expect(expression(0)).toBe(-1)
  })

  it('can subtract float operands', function () {
    expect(expression(1.8)).toBe(0.8)
    expect(expression(-4.87)).toBe(-5.87)
    expect(expression(0.87)).toBe(-0.13)
  })

  it('requires one operands', function () {
    expect(function () {
      expression()
    }).toThrowError(TypeError, 'Requires one operand.')

    expect(function () {
      expression(undefined)
    }).toThrowError(TypeError, 'Requires one operand.')
  })
})
