
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/fsw/fsw.mjs';
import { symbolSize } from './fsw-symbol-size';
import { symbolLine, symbolFill } from './fsw-symbol-text';

const signCanvas = function (fswSign) {
  const parsed = parse.sign(fswSign);

  if (parsed.spatials) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    let styling = parseStyle(parsed.style);

    if (styling.detailsym) {
      styling.detailsym.forEach(sym => {
        if (parsed.spatials[sym.index - 1]){
          parsed.spatials[sym.index - 1].detail = sym.detail;
        }
      })
    }

    let x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
    let y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
    let x2 = parsed.max[0];
    let y2 = parsed.max[1];

    if (styling.zoomsym) {
      styling.zoomsym.forEach(sym => {
        if (parsed.spatials[sym.index - 1]){
          parsed.spatials[sym.index - 1].zoom = sym.zoom;
          if (sym.offset) {
            parsed.spatials[sym.index - 1].coord[0] += sym.offset[0];
            parsed.spatials[sym.index - 1].coord[1] += sym.offset[1];
          }
          let size = symbolSize(parsed.spatials[sym.index - 1].symbol)
          x2 = Math.max(x2, (parsed.spatials[sym.index - 1].coord[0] + (size[0] * sym.zoom)));
          y2 = Math.max(y2, (parsed.spatials[sym.index - 1].coord[1] + (size[1] * sym.zoom)));
        }
      })
    }

    if (styling.padding) {
      x1 -= styling.padding;
      y1 -= styling.padding;
      x2 += styling.padding;
      y2 += styling.padding;
    }

    let sizing = 1;
    if (styling.zoom != 'x') {
      sizing = styling.zoom;
    }

    let w = (x2-x1) * sizing;
    let h = (y2-y1) * sizing;

    canvas.width = w?w:1;
    canvas.height = h?h:1;

    if (styling.background) {
      context.rect(0,0,w,h);
      context.fillStyle=styling.background;
      context.fill();
    }

    const line = styling.detail && styling.detail[0] || "black";
    const fill = styling.detail && styling.detail[1] || "white";

    parsed.spatials.forEach(spatial => {
      let symLine = line;
      if (spatial.detail) {
        symLine = spatial.detail[0];
      } else if (styling.colorize) {
        symLine = colorize(spatial.symbol);
      }

      let symFill = fill;
      if (spatial.detail && spatial.detail[1]) {
        symFill = spatial.detail[1];
      }

      let symZoom = spatial.zoom || 1;

      context.font = (30*sizing*symZoom) + "px 'SuttonSignWritingFill'";
      context.fillStyle = symFill;
      context.fillText(symbolFill(spatial.symbol),((spatial.coord[0]-x1)*sizing),((spatial.coord[1]-y1)*sizing));
      context.font = (30*sizing*symZoom) + "px 'SuttonSignWritingLine'";
      context.fillStyle = symLine;
      context.fillText(symbolLine(spatial.symbol),((spatial.coord[0]-x1)*sizing),((spatial.coord[1]-y1)*sizing));

    })
    return canvas
  }
}

/**
 * Function that creates a binary PNG image from an FSW sign with an optional style string
 * @function fsw.signPng
 * @param {string} fswSign - an FSW sign with optional style string
 * @example
 * fsw.signPng('M525x535S2e748483x510S10011501x466S20544510x500S10019476x475')
 * 
 * return 'data:image/png;base64,iVBORw...'
 */
const signPng = (fswSign) => {
  const canvas = signCanvas(fswSign);
  const png = canvas.toDataURL("image/png");
  canvas.remove();
  return png;
}
export { signPng }

