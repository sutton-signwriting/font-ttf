
import { key2id } from '@sutton-signwriting/core/convert/convert'; 
import { parse } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize as symSize } from '../font/font-symbol-size';

/**
 * Function that returns the size of a symbol using an FSW symbol key
 * @function fsw.symbolSize
 * @param {string} fsw - an FSW symbol key
 * @returns {number[]} width and height of symbol
 * @example
 * fsw.symbolSize("S10000")
 * 
 * return [15,30]
 */
const symbolSize = function (fsw){
  const parsed = parse.symbol(fsw);
  if (!parsed.symbol) {
    return undefined;
  }
  return symSize(key2id(fsw));
}

export { symbolSize }
