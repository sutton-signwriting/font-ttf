
import * as font from './font';
import * as fsw from './fsw';
import * as swu from './swu';

export { font, fsw, swu }

/**
 * @typedef {object} ColumnOptions
 * @property {number} height - the height of the columns
 * @property {number} width - the widths of the columns
 * @property {number} offset - the lane offset for left and right lanes
 * @property {number} pad - amount of padding before and after signs as well as at top, left, and right of columns
 * @property {number} margin - amount of space at bottom of column that is not available
 * @property {boolean} dynamic - enables variable width columns
 * @property {string} background - background color for columns
 * @property {object} style - an object of style options
 * @property {object} punctuation - an object of punctuation options
 * @property {boolean} punctuation.spacing - enables special spacing for punctuation with no space above and custom space below
 * @property {number} punctuation.pad - the amount of spacing after a punctuation if punctuation spacing is enabled
 * @property {boolean} punctuation.pull - prevents line breaks before punctuation by reducing spacing between signs in a column
 */
