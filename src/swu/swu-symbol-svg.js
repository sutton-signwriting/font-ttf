
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/swu/swu.mjs';
import { symbolSize } from './swu-symbol-size';
import { symbolText } from './swu-symbol-text';

/**
 * Function that creates an SVG image from an SWU symbol key with an optional style string
 * @function swu.symbolSvgBody
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @example
 * swu.symbolSvgBody('S10000')
 * 
 * return `<text font-size="0">S10000</text>
 *   <g transform="translate(500,500)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>
 *   </g>`
 */
 const symbolSvgBody = (swuSym) => {
  const parsed = parse.symbol(swuSym);
  const blank = '';
  if (!parsed.symbol) return blank;
  let styling = parseStyle(parsed.style);

  let x1, y1, x2, y2;
  if (parsed.coord) {
    x1 = parsed.coord[0];
    y1 = parsed.coord[1];
    x2 = 500 + (500-x1);
    y2 = 500 + (500-y1);
  } else {
    let size = symbolSize(parsed.symbol);
    if (!size) return blank;
    x1 = parseInt( 500 - (size[0])/2 );
    y1 = parseInt( 500 - (size[1])/2 );
    x2 = x1 + size[0];
    y2 = y1 + size[1];
  }

  let symSvg = symbolText(parsed.symbol);
  symSvg = `  <g transform="translate(${x1},${y1})">
${symSvg}
  </g>`;

  let line;
  if (styling.colorize) {
    line = colorize(parsed.symbol);
  } else if (styling.detail) {
    line = styling.detail[0]
  }
  if (line) {
    symSvg = symSvg.replace(/class="sym-line" fill="black"/, `class="sym-line" fill="${line}"`);
  }

  let fill = styling.detail && styling.detail[1];
  if (fill) {
    symSvg = symSvg.replace(/class="sym-fill" fill="white"/, `class="sym-fill" fill="${fill}"`);
  }

  let background = '';
  if (styling.padding) {
    x1 -= styling.padding;
    y1 -= styling.padding;
    x2 += styling.padding;
    y2 += styling.padding;
  }
  if (styling.background) {
    background = `\n  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" style="fill:${styling.background};" />`
  }

  return `<text font-size="0">${swuSym}</text>${background}
${symSvg}`;
}

/**
 * Function that creates an SVG image from an SWU symbol key with an optional style string
 * @function swu.symbolSvg
 * @param {string} swuSym - an SWU symbol key with optional style string
 * @example
 * swu.symbolSvg('S10000')
 * 
 * return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="500 500 15 30">
 *   <text font-size="0">S10000</text>
 *   <g transform="translate(500,500)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>
 *   </g>
 * </svg>`
 */
 const symbolSvg = (swuSym) => {
  const parsed = parse.symbol(swuSym);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (!parsed.symbol) return blank;
  let styling = parseStyle(parsed.style);

  let x1, y1, x2, y2;
  if (parsed.coord) {
    x1 = parsed.coord[0];
    y1 = parsed.coord[1];
    x2 = 500 + (500-x1);
    y2 = 500 + (500-y1);
  } else {
    let size = symbolSize(parsed.symbol);
    if (!size) return blank;
    x1 = parseInt( 500 - (size[0])/2 );
    y1 = parseInt( 500 - (size[1])/2 );
    x2 = x1 + size[0];
    y2 = y1 + size[1];
  }

  let classes = '';
  if (styling.classes) {
    classes = ` class="${styling.classes}"`
  }
  let id = '';
  if (styling.id) {
    id = ` id="${styling.id}"`
  }

  if (styling.padding) {
    x1 -= styling.padding;
    y1 -= styling.padding;
    x2 += styling.padding;
    y2 += styling.padding;
  }

  let sizing = '';
  if (styling.zoom != 'x') {
    sizing = ` width="${(x2 - x1) * (styling.zoom ? styling.zoom : 1)}" height="${(y2 - y1) * (styling.zoom ? styling.zoom : 1)}"`;
  }

  return `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${x2 - x1} ${y2 - y1}">
${symbolSvgBody(swuSym)}
</svg>`;
}

export { symbolSvgBody, symbolSvg }
