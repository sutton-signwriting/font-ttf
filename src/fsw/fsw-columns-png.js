
import { columns } from '@sutton-signwriting/core/fsw/fsw';
import { columnPng } from './fsw-column-png';

/**
 * Function that creates an array of PNG data urls for an FSW text
 * @function fsw.columnsPng
 * @param {string} fswText - a text of FSW signs and punctuation
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of PNG data urls
 * @example
 * fsw.columnsPng('AS14c20S27106M518x529S14c20481x471S27106503x489 AS18701S1870aS2e734S20500M518x533S1870a489x515S18701482x490S20500508x496S2e734500x468 S38800464x496',{
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return ['data:image/png;base64,iVBORw...']
 */
const columnsPng = function (fswText, options) {
  if (typeof options !== 'object') options = {};
  let values = columns(fswText, options);
  let cols = values.columns.map( (col,i) => {
    return columnPng(col,{...values.options,...{width:values.widths[i]}});
  })
  return cols;
}

export { columnsPng }
