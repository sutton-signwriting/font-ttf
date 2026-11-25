
import { swu2key, key2swu } from '@sutton-signwriting/core/convert/convert';
import { parse, compose } from '@sutton-signwriting/core/swu/swu';
import { mirrorKey } from '../mirror-key';

/**
 * Function that mirrors a symbol
 * @function swu.symbolMirror
 * @param {string} swuSym - an SWU symbol with optional coordinate and style string
 * @returns {string} mirrored SWU symbol
 * @throws {RangeError} if the symbol has no equivalent horizontal mirror
 * @example
 * swu.symbolMirror('񀀁')
 * 
 * return '񀀉'
 */
const symbolMirror = (swuSym) => {
  const parsed = parse.symbol(swuSym);
  if (!parsed.symbol) return swuSym;

  const symbol = key2swu(mirrorKey(swu2key(parsed.symbol)));
  return symbol === parsed.symbol ? swuSym : compose.symbol({ ...parsed, symbol });
}

export { symbolMirror }
