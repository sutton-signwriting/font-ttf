
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that changes the fill of a symbol
 * @function fsw.symbolFlop
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @param {boolean} [positive=true] - increase the symbol fill
 * @returns {string} FSW symbol with changed fill
 * @example
 * fsw.symbolFlop('S10000')
 * 
 * return 'S10010'
 */
const symbolFlop = (fswSym, positive = true) => {
  let parsed = parse.symbol(fswSym);
  if (!parsed.symbol) {
    return fswSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return fswSym;
  }

  const step = positive?1:-1;

  const base = parsed.symbol.slice(0,4);
  let fill = parseInt(parsed.symbol.slice(4,5));
  let rot = parsed.symbol.slice(5,6);
  
  let key='';
  while (!key || !symbolSize(key)) {
    fill += step;
    if (fill>5) {fill=0;}
    if (fill<0) {fill=5;}
    key = base + fill + rot;
  }
  parsed.symbol=key;
  return compose.symbol(parsed);
}

export { symbolFlop }
