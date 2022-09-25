
import { columns } from '@sutton-signwriting/core/swu/swu';
import { columnPng } from './swu-column-png';

/**
 * Function that creates an SVG image for a column of SWU
 * @function swu.columnsPng
 * @param {string} swuText - an array of SWU signs and punctuation with coordinates
 * @param {ColumnOptions} options - an object of column options
 * @returns {string[]} array of PNG data urls
 * @example
 * swu.columnsPng('𝠀񁲡񈩧𝠃𝤘𝤣񁲡𝣳𝣩񈩧𝤉𝣻 𝠀񃊢񃊫񋛕񆇡𝠃𝤘𝤧񃊫𝣻𝤕񃊢𝣴𝣼񆇡𝤎𝤂񋛕𝤆𝣦 񏌁𝣢𝤂',{
 *   "height": 250,
 *   "width": 150,
 * })
 * 
 * return ['data:image/png;base64,iVBORw...']
 */
const columnsPng = function (swuText, options) {
  if (typeof options !== 'object') options = {};
  let values = columns(swuText, options);
  let cols = values.columns.map( (col,i) => {
    return columnPng(col,{...values.options,...{width:values.widths[i]}});
  })
  return cols;
}

export { columnsPng }
