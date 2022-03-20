
import { parse as parseStyle, compose as composeStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { columnDefaults } from '@sutton-signwriting/core/swu/swu.mjs';
import { signSvgBody } from './swu-sign-svg';
import { symbolSvgBody } from './swu-symbol-svg';

/**
 * Function that creates an SVG image for a column of SWU
 * @function swu.columnSvg
 * @param {array} swuColumn - an array of objects with information about FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string} column svg
 * @example
 * swu.columnSvg([
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
 *     "text": "𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻",
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
 *     "text": "𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦",
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
 *     "text": "񏌁𝣢𝤂",
 *     "zoom": 1
 *   }
 * ],
 * {
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="150" height="250" viewBox="0 0 150 250">
 *   <g transform="translate(56,20) scale(1) translate(-481,-471) ">
 *     <text font-size="0">𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻-D_black,white_Z1</text>
 *     <g transform="translate(481,471)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􁲡</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󱲡</text>
 *     </g>
 *     <g transform="translate(503,489)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􈩧</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󸩧</text>
 *     </g>
 *   </g>
 *   <g transform="translate(57,118) scale(1) translate(-482,-468) ">
 *     <text font-size="0">𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦-D_black,white_Z1</text>
 *     <g transform="translate(489,515)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􃊫</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󳊫</text>
 *     </g>
 *     <g transform="translate(482,490)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􃊢</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󳊢</text>
 *     </g>
 *     <g transform="translate(508,496)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􆇡</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󶇡</text>
 *     </g>
 *     <g transform="translate(500,468)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􋛕</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󻛕</text>
 *     </g>
 *   </g>
 *   <g transform="translate(39,203) scale(1) translate(-464,-496) ">
 *     <text font-size="0">񏌁𝣢𝤂-D_black,white_Z1</text>
 *     <g transform="translate(464,496)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􏌁</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󿌁</text>
 *     </g>
 *   </g>
 * </svg>`
 */
const columnSvg = (swuColumn, options) => {
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  //if (typeof swuColumn !== 'array') return blank;
  if (typeof options !== 'object') options = {};
  const values = Object.assign(columnDefaults,options);

  let x1 = 0;
  let y1 = 0;
  let x2 = values.width;
  let y2 = values.height;

  let background = '';
  if (values.background) {
    background = `\n  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" style="fill:${values.background};" />`
  }

  let sizing = ` width="${values.width}" height="${values.height}"`;

  let svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
  <text font-size="0">${x1}</text>${background}`

  svg += swuColumn.map( item => {
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

    return '<g transform="translate(' + (item.x) + ',' + (item.y) + ') scale(' + item.zoom + ') translate(' + (-item.minX) + ',' + (-item.minY) + ') ">' + (item.segment=="sign"?signSvgBody(item.text):symbolSvgBody(item.text)) + '</g>';
  }).join('\n');

  svg += '\n</svg>';

  return svg;
}

export { columnSvg }
