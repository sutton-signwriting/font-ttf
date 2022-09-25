
import { parse } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

const blank = null;

/**
 * Function that normalizes a symbol with a minimum coordinate for a center of 500,500
 * @function fsw.symbolNormalize
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @returns {string} normalized FSW symbol
 * @example
 * fsw.symbolNormalize('S10000-CP10G_green_Z2')
 * 
 * return 'S10000493x485-CP10G_green_Z2'
 */
const symbolNormalize = (fswSym) => {
  const parsed = parse.symbol(fswSym);
  if (parsed.symbol) {
    let size = symbolSize(parsed.symbol);
    if (size) {
      return `${parsed.symbol}${500 - parseInt((size[0]+1) / 2)}x${500 - parseInt((size[1]+1) / 2)}${parsed.style || ''}`;
    }
  } else {
    return blank;
  }
}

export { symbolNormalize }
