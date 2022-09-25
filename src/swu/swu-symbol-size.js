
import { swu2id } from '@sutton-signwriting/core/convert/convert'; 
import { symbolSize as symSize } from '../font/font-symbol-size';

/**
 * Function that returns the size of a symbol using an SWU symbol character
 * @function swu.symbolSize
 * @param {string} swu - an SWU symbol character
 * @returns {number[]} width and height of symbol
 * @example
 * swu.symbolSize("񀀁")
 * 
 * return [15,30]
 */
const symbolSize = function (swu){
  return symSize(swu2id(swu));
}

export { symbolSize }
