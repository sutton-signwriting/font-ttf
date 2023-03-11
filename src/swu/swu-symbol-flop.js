
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse,compose } from '@sutton-signwriting/core/swu/swu';
import { symbolSize } from './swu-symbol-size';

/**
 * Function that changes the fill of a symbol
 * @function swu.symbolFlop
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @param {boolean} [positive=true] - increase the symbol fill
 * @returns {string} SWU symbol with changed fill
 * @example
 * swu.symbolFlop('񀀁')
 * 
 * return '񀀑'
 */
const symbolFlop = (swuSym, positive = true) => {
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

  const base = parsed.symbol.slice(0,4);
  let fill = parseInt(parsed.symbol.slice(4,5));
  let rot = parsed.symbol.slice(5,6);
  
  let key='';
  while (!key || !symbolSize(key2swu(key))) {
    fill += step;
    if (fill>5) {fill=0;}
    if (fill<0) {fill=5;}
    key = base + fill + rot;
  }
  parsed.symbol = key2swu(key);
  return compose.symbol(parsed);
}

export { symbolFlop }
