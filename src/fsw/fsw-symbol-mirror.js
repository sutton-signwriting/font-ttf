
import { parse,compose } from '@sutton-signwriting/core/fsw/fsw';
import { mirrorKey } from '../mirror-key';

/**
 * Function that mirrors a symbol
 * @function fsw.symbolMirror
 * @param {string} fswSym - an FSW symbol key with optional coordinate and style string
 * @returns {string} mirrored FSW symbol
 * @throws {RangeError} if the symbol has no equivalent horizontal mirror
 * @example
 * fsw.symbolMirror('S10000')
 * 
 * return 'S10008'
 */
const symbolMirror = (fswSym) => {
  const parsed = parse.symbol(fswSym);
  if (!parsed.symbol) return fswSym;

  const symbol = mirrorKey(parsed.symbol);
  return symbol === parsed.symbol ? fswSym : compose.symbol({ ...parsed, symbol });
}

export { symbolMirror }
