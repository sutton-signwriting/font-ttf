
import { parse } from '@sutton-signwriting/core/swu/swu.mjs';
import { coord2swu } from '@sutton-signwriting/core/convert/convert.mjs';
import { symbolSize } from './swu-symbol-size';

const blank = null;

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function swu.symbolNormalize
 * @param {string} swuSym - an SWU symbol character with optional coordinate and style string
 * @example
 * swu.symbolNormalize('񀀁')
 * 
 * return '񀀁𝣿𝣷'
 */
const symbolNormalize = (swuSym) => {
  const parsed = parse.symbol(swuSym);
  if (parsed.symbol) {
    let size = symbolSize(parsed.symbol);
    if (size) {
      return `${parsed.symbol}${coord2swu([(500 - parseInt(size[0] / 2)),(500 - parseInt(size[1] / 2))])}${parsed.style || ''}`;
    }
  } else {
    return blank;
  }
}

export { symbolNormalize }
