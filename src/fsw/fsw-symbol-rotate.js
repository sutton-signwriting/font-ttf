
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that rotates a symbol
 * @function fsw.symbolRotate
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @param {boolean} [clockwise=true] - rotate the symbol clockwise
 * @returns {string} rotated FSW symbol
 * @example
 * fsw.symbolRotate('S10000')
 * 
 * return 'S10007'
 */
const symbolRotate = (fswSym, clockwise = true) => {
  let parsed = parse.symbol(fswSym);
  if (!parsed.symbol) {
    return fswSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return fswSym;
  }

  const step = clockwise?1:-1;

  const base = parsed.symbol.slice(0,4);
  let fill = parsed.symbol.slice(4,5);
  let rot = parseInt(parsed.symbol.slice(5,6),16);
  
  let key='';
  while (!key || !symbolSize(key)) {
    if (rot>7){
      rot += step;
      if (rot>15) {rot=8;}
      if (rot<8) {rot=15;}
      key = base + fill + rot.toString(16);
    } else {
      rot -= step;
      if (rot>7) {rot=0;}
      if (rot<0) {rot=7;}
      key = base + fill + rot;
    }
  }
  parsed.symbol=key;
  return compose.symbol(parsed);
}

export { symbolRotate }
