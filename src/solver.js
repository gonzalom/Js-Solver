'use strict'

const _ = require('lodash')

/**
 * Operators
 */
const _addition = require('./expressions/addition')
const _subtraction = require('./expressions/subtraction')
const _multiplication = require('./expressions/multiplication')
const _division = require('./expressions/division')
const _modulus = require('./expressions/modulus')
const _increment = require('./expressions/increment')
const _decrement = require('./expressions/decrement')

// Class private methods
// http://davidvujic.blogspot.ie/2015/03/what-wait-really-oh-no-a-post-about-es6-classes-and-privacy.html
const _operators = new WeakMap()

/**
 * Filter number.
 *
 * @param value
 * @return {Number|NaN}
 * @private
 */
const _filterNumber = function (value) {
  if (/^([-+])?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value)
  }

  return NaN
}

/**
 * class Solver
 *
 * params = {
 *  debug: false,
 *  operations: [] // Operations to be executed. It accept OperationsBag, other Solver or the array convention.
 * }
 *
 * Example of use:
 * var solver = new Solver({debug: true})
 */
module.exports = class Solver {
  /**
   * Create a new ExpressionBase instance.
   *
   * @param {object} operators
   */
  constructor (operators = null) {
    _operators.set(this, _.isObject(operators) ? operators : Solver.getDefaultOperators())
  }

  /**
   * Get Default Operators.
   *
   * @return {object}
   */
  static getDefaultOperators () {
    return {
      addition: _addition,
      sum: _addition,
      plus: _addition,
      '+': _addition,
      subtraction: _subtraction,
      subtract: _subtraction,
      '-': _subtraction,
      multiplication: _multiplication,
      '*': _multiplication,
      division: _division,
      '/': _division,
      modulus: _modulus,
      '%': _modulus,
      increment: _increment,
      '++': _increment,
      decrement: _decrement,
      '--': _decrement
    }
  }

  getOperators () {
    return _operators.get(this)
  }

  solve (expression) {
    if (_.isArray(expression) || !_.isObject(expression)) {
      throw new TypeError('only expression objects accepted.')
    }

    if (!expression.hasOwnProperty('operator')) {
      throw new TypeError('missing operator.')
    }

    if (!expression.hasOwnProperty('operand1')) {
      throw new TypeError('missing operand1.')
    }

    if (expression.operand1 === undefined) {
      throw new TypeError('operand1 is undefined.')
    }

    if (!expression.hasOwnProperty('operand2')) {
      expression.operand2 = undefined
    }

    let operator = expression.operator
    if (operator.length > 2) { // Skip +, -, *, /, %, ++, --,...
      operator = _.snakeCase(operator)
    }

    const operators = _operators.get(this)

    if (!operators.hasOwnProperty(operator)) {
      throw new TypeError('operator ' + operator + ' not found.')
    }

    const operand1 = _.isObject(expression.operand1)
      ? this.solve(expression.operand1)
      : _filterNumber(expression.operand1)

    if (isNaN(operand1)) {
      throw new TypeError('operand1 is NaN.')
    }

    const operand2 = _.isObject(expression.operand2)
      ? this.solve(expression.operand2)
      : expression.operand2 === undefined ? undefined : _filterNumber(expression.operand2)

    if (isNaN(operand2) && operand2 !== undefined) {
      return operators[operator](operand1)
    }

    return operators[operator](operand1, operand2)
  }
}
