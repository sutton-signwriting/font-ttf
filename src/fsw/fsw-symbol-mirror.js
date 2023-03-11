
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that mirrors a symbol
 * @function fsw.symbolMirror
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @returns {string} mirrored FSW symbol
 * @example
 * fsw.symbolMirror('S10000')
 * 
 * return 'S10008'
 */
const symbolMirror = (fswSym) => {
  let parsed = parse.symbol(fswSym);
  if (!parsed.symbol) {
    return fswSym;
  }

  const size = symbolSize(parsed.symbol);
  if (!size) {
    return fswSym;
  }

  const base = parsed.symbol.slice(0,4);
  let fill = parsed.symbol.slice(4,5);
  let rot = parseInt(parsed.symbol.slice(5,6),16);

  const key1 = base + "08";
  const key2 = base + "18";
  var rAdd;
  if (symbolSize(key1) || symbolSize(key2)){
    rAdd = 8;
  } else {
    if ((rot===0) || (rot==4)) {rAdd=0;}
    if ((rot==1) || (rot==5)) {rAdd=6;}
    if ((rot==2) || (rot==6)) {rAdd=4;}
    if ((rot==3) || (rot==7)) {rAdd=2;}
  }
  let key='';
  while (!key || !symbolSize(key)) {
    rot += rAdd;
    if ((rot>7) && (rAdd<8)) { rot = rot -8;}
    if (rot>15) { rot = rot -16;}
    key = base + fill + rot.toString(16);
  }
  parsed.symbol=key;
  return compose.symbol(parsed);
}

export { symbolMirror }
