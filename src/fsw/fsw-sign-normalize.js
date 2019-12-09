
import { parse, ranges } from '@sutton-signwriting/core/fsw/fsw.mjs';
import { symbolSize } from './fsw-symbol-size';

/**
 * Function that normalizes an FSW sign for a center of 500,500
 * @function fsw.signNormalize
 * @param {string} fswSign - an FSW sign with optional style string
 * @example
 * fsw.signNormalize('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 * 
 * return 'M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475'
 */
const signNormalize = (fswSign) => {
  const parsed = parse.sign(fswSign);
  if (parsed.spatials) {
    const symbolsizes = parsed.spatials.reduce((output, spatial) => {
      const size = symbolSize(spatial.symbol);
      output[spatial.symbol] = {
        width: size[0],
        height: size[1]
      };
      return output;
    },{});

    const bbox = (symbols) => {
      const x1 = Math.min(...symbols.map(spatial => spatial.coord[0]));
      const y1 = Math.min(...symbols.map(spatial => spatial.coord[1]));
      const x2 = Math.max(...symbols.map(spatial => spatial.coord[0] + parseInt(symbolsizes[spatial.symbol].width)));
      const y2 = Math.max(...symbols.map(spatial => spatial.coord[1] + parseInt(symbolsizes[spatial.symbol].height)));
      return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      };
    }

    const hrange = ranges['hcenter'];
    const hsyms = parsed.spatials.filter((spatial) => {
      const dec = parseInt(spatial.symbol.slice(1, 4), 16);
      return (hrange[0] <= dec && hrange[1] >= dec);
    })

    const vrange = ranges['vcenter'];
    const vsyms = parsed.spatials.filter((spatial) => {
      const dec = parseInt(spatial.symbol.slice(1, 4), 16);
      return (vrange[0] <= dec && vrange[1] >= dec);
    })
    let abox = bbox(parsed.spatials);
    let max = [abox.x2, abox.y2];
    if (hsyms.length) {
      const hbox = bbox(hsyms);
      abox.x1 = hbox.x1;
      abox.x2 = hbox.x2;
    }
    if (vsyms.length) {
      const vbox = bbox(vsyms);
      abox.y1 = vbox.y1;
      abox.y2 = vbox.y2;
    }

    const offset = [parseInt((abox.x2 + abox.x1) / 2) - 500, parseInt((abox.y2 + abox.y1) / 2) - 500]
    const fswout = (parsed.sequence ? 'A' + parsed.sequence.join('') : '') +
      parsed.box + (max[0] - offset[0]) + 'x' + (max[1] - offset[1]) +
      parsed.spatials.map(spatial => spatial.symbol + (spatial.coord[0] - offset[0]) + 'x' + (spatial.coord[1] - offset[1])).join('') +
      (parsed.style || '');
    return fswout;
  }
}

export { signNormalize }
