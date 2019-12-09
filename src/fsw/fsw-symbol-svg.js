
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/fsw/fsw.mjs';
import { symbolSize } from './fsw-symbol-size';
import { symbolText } from './fsw-symbol-text';

/**
 * Function that creates an SVG image from an FSW symbol key with an optional style string
 * @function fsw.symbolSvg
 * @param {string} fswSym - an FSW symbol key with optional style string
 * @example
 * fsw.symbolSvg('S10000')
 * 
 * return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="500 500 15 30">
 *   <text font-size="0">S10000</text>
 *   <g transform="translate(500,500)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>
 *   </g>
 * </svg>`
 */
const symbolSvg = (fswSym) => {
  const parsed = parse.symbol(fswSym);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (parsed.symbol) {
    let size = symbolSize(parsed.symbol);
    if (size) {
      let styling = parseStyle(parsed.style);
      let line;
      let symSvg = symbolText(parsed.symbol);
      symSvg = `  <g transform="translate(500,500)">
${symSvg}
  </g>`;
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
      let x1 = 500;
      let y1 = 500;
      let background = '';
      if (styling.padding) {
        x1 -= styling.padding;
        y1 -= styling.padding;
        size[0] += styling.padding * 2;
        size[1] += styling.padding * 2;
      }
      if (styling.background) {
        background = `\n  <rect x="${x1}" y="${y1}" width="${size[0]}" height="${size[1]}" style="fill:${styling.background};" />`
      }
      let sizing = '';
      if (styling.zoom != 'x') {
        sizing = ` width="${size[0] * (styling.zoom ? styling.zoom : 1)}" height="${size[1] * (styling.zoom ? styling.zoom : 1)}"`;
      }
      let classes = '';
      if (styling.classes) {
        classes = ` class="${styling.classes}"`
      }
      let id = '';
      if (styling.id) {
        id = ` id="${styling.id}"`
      }
      return `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${size[0]} ${size[1]}">
  <text font-size="0">${fswSym}</text>${background}
${symSvg}
</svg>`;
    }
  }
  return blank;
}

export { symbolSvg }
