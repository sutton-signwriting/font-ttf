
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that changes the base of a symbol
 * @function fsw.symbolScroll
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @param {boolean} [positive=true] - increase the symbol base
 * @returns {string} FSW symbol with changed base
 * @example
 * fsw.symbolScroll('S10000')
 * 
 * return 'S10100'
 */
const symbolScroll = (fswSym, positive = true) => {
  let parsed = parse.symbol(fswSym);
  if (!parsed.symbol) {
    return fswSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return fswSym;
  }

  const step = positive?1:-1;

  const base = parseInt(parsed.symbol.slice(1,4),16) + step;
  const fill = parsed.symbol.slice(4,5);
  const rot = parsed.symbol.slice(5,6);
  
  const key = 'S' + base.toString(16) + fill + rot;
  if (symbolSize(key)) {
    parsed.symbol=key;
  }

  return compose.symbol(parsed);
}

export { symbolScroll }
