
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/swu/swu.mjs';
import { symbolSize } from './swu-symbol-size';
import { symbolLine, symbolFill } from './swu-symbol-text';

const signCanvas = function (swuSign) {
  const parsed = parse.sign(swuSign);

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

      context.font = (30*sizing) + "px 'SuttonSignWritingFill'";
      context.fillStyle = symFill;
      context.fillText(symbolFill(spatial.symbol),((spatial.coord[0]-x1)*sizing),((spatial.coord[1]-y1)*sizing));
      context.font = (30*sizing) + "px 'SuttonSignWritingLine'";
      context.fillStyle = symLine;
      context.fillText(symbolLine(spatial.symbol),((spatial.coord[0]-x1)*sizing),((spatial.coord[1]-y1)*sizing));

    })
    return canvas
  }
}

/**
 * Function that creates a PNG data url from an SWU sign with an optional style string
 * @function swu.signPng
 * @param {string} swuSign - an SWU sign with optional style string
 * @example
 * swu.signPng('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭')
 * 
 * return 'data:image/png;base64,iVBORw...'
 */
const signPng = (swuSign) => {
  const canvas = signCanvas(swuSign);
  const png = canvas.toDataURL("image/png");
  canvas.remove();
  return png;
}
export { signPng }

