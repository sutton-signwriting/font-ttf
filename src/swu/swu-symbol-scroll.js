
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse,compose } from '@sutton-signwriting/core/swu/swu';
import { symbolSize } from './swu-symbol-size';

/**
 * Function that changes the base of a symbol
 * @function swu.symbolScroll
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @param {boolean} [positive=true] - increase the symbol base
 * @returns {string} SWU symbol with changed base
 * @example
 * swu.symbolScroll('񀀁')
 * 
 * return '񀁡'
 */
const symbolScroll = (swuSym, positive = true) => {
  let parsed = parse.symbol(swuSym);
  if (!parsed.symbol) {
    return swuSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return swuSym;
  }

  parsed.symbol = swu2key(parsed.symbol);

  const step = positive?1:-1;

  const base = parseInt(parsed.symbol.slice(1,4),16) + step;
  const fill = parsed.symbol.slice(4,5);
  const rot = parsed.symbol.slice(5,6);
  
  const key = 'S' + base.toString(16) + fill + rot;
  if (key.length == 6 && symbolSize(key2swu(key))) {
    parsed.symbol=key;
  }
  parsed.symbol = key2swu(parsed.symbol);
  return compose.symbol(parsed);
}

export { symbolScroll }
