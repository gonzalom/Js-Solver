'use strict'

/**
 * function increment
 *
 * Aliases: ++
 *
 * @param {number} x
 * @return {number|NaN}
 */
module.exports = function increment (x) {
  if (x === undefined) {
    throw new TypeError('Requires one operand.')
  }

  return ++x
}
