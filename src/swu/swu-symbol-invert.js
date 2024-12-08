
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse, compose } from '@sutton-signwriting/core/swu/swu';
import { symbolSize } from './swu-symbol-size';

/**
 * Function that inverts a symbol
 * @function swu.symbolInvert
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @returns {string} inverted SWU symbol
 * @example
 * swu.symbolInvert('񀀁')
 * 
 * return '񀀍'
 */
const symbolInvert = (swuSym) => {
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
  let rot = parsed.symbol.slice(5,6);

  const key1 = base + "08";
  const key2 = base + "18";
  let map;
  if (symbolSize(key2swu(key1)) || symbolSize(key2swu(key2))){
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
    if (symbolSize(key2swu(key))){
      parsed.symbol=key2swu(key);
    }
  }
  return compose.symbol(parsed);
}

export { symbolInvert }
