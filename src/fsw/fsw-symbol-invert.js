
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that inverts a symbol
 * @function fsw.symbolInvert
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @returns {string} inverted FSW symbol
 * @example
 * fsw.symbolInvert('S10000')
 * 
 * return 'S1000c'
 */
const symbolInvert = (fswSym) => {
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
  let rot = parsed.symbol.slice(5,6);

  const key1 = base + "08";
  const key2 = base + "18";
  let map;
  if (symbolSize(key1) || symbolSize(key2)){
    map = {
      '0': 'c', '1': 'd', '2': 'e', '3': 'f',
      '4': '8', '5': '9', '6': 'a', '7': 'b',
      'c': '0', 'd': '1', 'e': '2', 'f': '3',
      '8': '4', '9': '5', 'a': '6', 'b': '7'
    };
  } else {
    map = {
      '0': '4', '1': '3', '2': '2', '3': '1',
      '4': '0', '5': '7', '6': '6', '7': '5'
    };
  }

  if (rot in map) {
    const key = base + fill + map[rot];
    if (symbolSize(key)){
      parsed.symbol=key;
    }
  }
  return compose.symbol(parsed);
}

export { symbolInvert }
