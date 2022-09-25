
import { parse as parseStyle, compose as composeStyle} from '@sutton-signwriting/core/style/style'; 
import { columnDefaults, parse, colorize } from '@sutton-signwriting/core/fsw/fsw';
import { symbolLine, symbolFill } from './fsw-symbol-text';

const columnCanvas = function (fswColumn, options) {
  if (typeof options !== 'object') options = {};
  const values = Object.assign(columnDefaults,options);

  const canvas = document.createElement('canvas');
  canvas.width = values.width;
  canvas.height = values.height;
  const context = canvas.getContext('2d');

  if (values.background) {
    context.rect(0,0,values.width,values.height);
    context.fillStyle=values.background;
    context.fill();
  }

  fswColumn.map( item => {
    const dash = item.text.indexOf('-')
    if (dash>0) {
      const itemStyle = item.text.substring(dash);
      const newStyle = {
        ...values.style,
        ...parseStyle(itemStyle)
      };
      item.text = item.text.replace(itemStyle,composeStyle(newStyle));
    } else {
      item.text += composeStyle(values.style);
    }
    item.zoom = item.zoom * values.style.zoom;

    let parsed = {};
    if (item.segment=="sign") {
      parsed = parse.sign(item.text);
    } else {
      let sym = parse.symbol(item.text);
      parsed.style = sym.style;
      parsed.spatials = [sym];
    }
    let styling = parseStyle(parsed.style);

    if (styling.background) {
      context.fillStyle=styling.background;
      context.fillRect(item.x - styling.padding*item.zoom, item.y - styling.padding*item.zoom,(item.width + styling.padding*2)*item.zoom,(item.height + styling.padding*2)*item.zoom);
    }

    if (styling.detailsym) {
      styling.detailsym.forEach(sym => {
        if (parsed.spatials[sym.index - 1]){
          parsed.spatials[sym.index - 1].detail = sym.detail;
        }
      })
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

      context.font = (30*item.zoom) + "px 'SuttonSignWritingFill'";
      context.fillStyle = symFill;
      context.fillText(symbolFill(spatial.symbol),item.x + ((spatial.coord[0] - item.minX)*item.zoom), item.y + ((spatial.coord[1] - item.minY)*item.zoom))
      context.font = (30*item.zoom) + "px 'SuttonSignWritingLine'";
      context.fillStyle = symLine;
      context.fillText(symbolLine(spatial.symbol),item.x + ((spatial.coord[0] - item.minX)*item.zoom), item.y + ((spatial.coord[1] - item.minY)*item.zoom))
    })
  })
  return canvas
}

/**
 * Function that creates a PNG data url for a column of FSW
 * @function fsw.columnPng
 * @param {ColumnData} fswColumn - an array of objects with information about FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string} column png data url
 * @example
 * fsw.columnPng([
 *   {
 *     "x": 56,
 *     "y": 20,
 *     "minX": 481,
 *     "minY": 471,
 *     "width": 37,
 *     "height": 58,
 *     "lane": 0,
 *     "padding": 0,
 *     "segment": "sign",
 *     "text": "AS14c20S27106M518x529S14c20481x471S27106503x489",
 *     "zoom": 1
 *   },
 *   {
 *     "x": 57,
 *     "y": 118,
 *     "minX": 482,
 *     "minY": 468,
 *     "width": 36,
 *     "height": 65,
 *     "lane": 0,
 *     "padding": 0,
 *     "segment": "sign",
 *     "text": "AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468",
 *     "zoom": 1
 *   },
 *   {
 *     "x": 39,
 *     "y": 203,
 *     "minX": 464,
 *     "minY": 496,
 *     "width": 72,
 *     "height": 8,
 *     "lane": 0,
 *     "padding": 0,
 *     "segment": "symbol",
 *     "text": "S38800464x496",
 *     "zoom": 1
 *   }
 * ],
 * {
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return 'data:image/png;base64,iVBORw...'
 */
const columnPng = (fswColumn, options) => {
  const canvas = columnCanvas(fswColumn, options);
  const png = canvas.toDataURL("image/png");
  canvas.remove();
  return png;
}

export { columnPng }
