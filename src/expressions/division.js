'use strict'

/**
 * function division
 *
 * Aliases: subtract, -
 *
 * @param {number} x
 * @param {number} y
 * @return {number|NaN}
 */
module.exports = function division (x, y) {
  if (x === undefined || y === undefined) {
    throw new TypeError('Requires two operands.')
  }

  let result = x / y

  // Notice: We round to 2 decimals because Javascript have an issue with float numbers.
  return result % 1 === 0 ? result : Math.round(result * 100) / 100
}
