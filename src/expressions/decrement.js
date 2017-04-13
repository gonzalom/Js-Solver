'use strict'

/**
 * function decrement
 *
 * Aliases: --
 *
 * @param {number} x
 * @return {number|NaN}
 */
module.exports = function decrement (x) {
  if (x === undefined) {
    throw new TypeError('Requires one operand.')
  }

  let result = x
  result--

  // Notice: We round to 2 decimals because Javascript have an issue with float numbers.
  return result % 1 === 0 ? result : Math.round(result * 100) / 100
}
