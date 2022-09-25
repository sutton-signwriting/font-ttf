
import { columns } from '@sutton-signwriting/core/swu/swu';
import { columnSvg } from './swu-column-svg';

/**
 * Function that creates an array of SVG column images for an SWU text
 * @function swu.columnsSvg
 * @param {string} swuText - a text of SWU signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of SVG columns
 * @example
 * swu.columnsSvg('𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂',{
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return [`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="150" height="250" viewBox="0 0 150 250">
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
 * </svg>`]
 */
const columnsSvg = function (swuText, options) {
  if (typeof options !== 'object') options = {};
  let values = columns(swuText, options);
  let cols = values.columns.map( (col,i) => {
    return columnSvg(col,{...values.options,...{width:values.widths[i]}});
  })
  return cols;
}

export { columnsSvg }
