
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/swu/swu.mjs';
import { symbolSize } from './swu-symbol-size';
import { symbolLine, symbolFill } from './swu-symbol-text';

const symbolCanvas = function(swuSym){
  const parsed = parse.symbol(swuSym);

  if (parsed.symbol) {
    let size = symbolSize(parsed.symbol);
    if (size) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      let styling = parseStyle(parsed.style);
      let line = 'black';
      if (styling.colorize) {
        line = colorize(parsed.symbol);
      } else if (styling.detail) {
        line = styling.detail[0]
      }
      let fill = styling.detail && styling.detail[1] || 'white';
      let x1 = 500;
      let x2 = x1 + size[0]
      let y1 = 500;
      let y2 = y1 + size[1]
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
      context.font = (30*sizing) + "px 'SuttonSignWritingFill'";
      context.fillStyle = fill;
      context.fillText(symbolFill(parsed.symbol),((500-x1)*sizing),((500-y1)*sizing));
      context.font = (30*sizing) + "px 'SuttonSignWritingLine'";
      context.fillStyle = line;
      context.fillText(symbolLine(parsed.symbol),((500-x1)*sizing),((500-y1)*sizing));

      return canvas;
    }
  }
}

/**
 * Function that creates a PNG data url from an SWU symbol character with an optional style string
 * @function swu.symbolPng
 * @param {string} swuSym - an SWU symbol character with optional style string
 * @example
 * swu.symbolPng('񀀁-CP10G_green_Z2')
 * 
 * return 'data:image/png;base64,iVBORw...'
 */
const symbolPng = (swuSym) => {
  const canvas = symbolCanvas(swuSym);
  const png = canvas.toDataURL("image/png");
  canvas.remove();
  return png;
}

export { symbolPng }
