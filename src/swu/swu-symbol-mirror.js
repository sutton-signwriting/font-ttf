
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse, compose } from '@sutton-signwriting/core/swu/swu';
import { symbolSize } from './swu-symbol-size';

/**
 * Function that mirrors a symbol
 * @function swu.symbolMirror
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @returns {string} mirrored SWU symbol
 * @example
 * swu.symbolMirror('񀀁')
 * 
 * return '񀀉'
 */
const symbolMirror = (swuSym) => {
  let parsed = parse.symbol(swuSym);
  if (!parsed.symbol) {
    return swuSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return swuSym;
  }
  parsed.symbol = swu2key(parsed.symbol);

  const base = parsed.symbol.slice(0,4);
  let fill = parsed.symbol.slice(4,5);
  let rot = parseInt(parsed.symbol.slice(5,6),16);

  const key1 = base + "08";
  const key2 = base + "18";
  var rAdd;
  if (symbolSize(key2swu(key1)) || symbolSize(key2swu(key2))){
    rAdd = 8;
  } else {
    if ((rot===0) || (rot==4)) {rAdd=0;}
    if ((rot==1) || (rot==5)) {rAdd=6;}
    if ((rot==2) || (rot==6)) {rAdd=4;}
    if ((rot==3) || (rot==7)) {rAdd=2;}
  }
  let key='';
  while (!key || !symbolSize(key2swu(key))) {
    rot += rAdd;
    if ((rot>7) && (rAdd<8)) { rot = rot -8;}
    if (rot>15) { rot = rot -16;}
    key = base + fill + rot.toString(16);
  }
  parsed.symbol=key2swu(key);
  return compose.symbol(parsed);
}

export { symbolMirror }
