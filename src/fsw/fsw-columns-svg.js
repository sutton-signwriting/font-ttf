
import { fsw } from '@sutton-signwriting/core';
import { columnSvg } from './fsw-column-svg';

/**
 * Function that creates an array of SVG column images for an FSW text
 * @function fsw.columnsSvg
 * @param {string} fswText - a text of FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of SVG columns
 * @example
 * fsw.columnsSvg('AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496',{
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return [`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="150" height="250" viewBox="0 0 150 250">
 *   <g transform="translate(56,20) scale(1) translate(-481,-471) ">
 *     <text font-size="0">AS14c20S27106M518x529S14c20481x471S27106503x489-D_black,white_Z1</text>
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
 *     <text font-size="0">AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468-D_black,white_Z1</text>
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
 *     <text font-size="0">S38800464x496-D_black,white_Z1</text>
 *     <g transform="translate(464,496)">
 *       <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􏌁</text>
 *       <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󿌁</text>
 *     </g>
 *   </g>
 * </svg>`]
 */
const columnsSvg = function (fswText, options) {
  if (typeof options !== 'object') options = {};
  let values = fsw.columns(fswText, options);
  let cols = values.columns.map( (col,i) => {
    return columnSvg(col,{...values.options,...{width:values.widths[i]}});
  })
  return cols;
}

export { columnsSvg }
