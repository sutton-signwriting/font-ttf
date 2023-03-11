
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse,compose } from '@sutton-signwriting/core/swu/swu';
import { symbolSize } from './swu-symbol-size';

/**
 * Function that rotates a symbol
 * @function swu.symbolRotate
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @param {boolean} [clockwise=true] - rotate the symbol clockwise
 * @returns {string} rotated SWU symbol
 * @example
 * swu.symbolRotate('񀀁')
 * 
 * return '񀀈'
 */
const symbolRotate = (swuSym, clockwise = true) => {
  let parsed = parse.symbol(swuSym);
  if (!parsed.symbol) {
    return swuSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return swuSym;
  }

  parsed.symbol = swu2key(parsed.symbol);

  const step = clockwise?1:-1;

  const base = parsed.symbol.slice(0,4);
  let fill = parsed.symbol.slice(4,5);
  let rot = parseInt(parsed.symbol.slice(5,6),16);
  
  let key='';
  while (!key || !symbolSize(key2swu(key))) {
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
  parsed.symbol=key2swu(key);
  return compose.symbol(parsed);
}

export { symbolRotate }
