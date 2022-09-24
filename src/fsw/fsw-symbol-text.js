
import { convert } from '@sutton-signwriting/core'; 
import { symbolLine as symLine, symbolFill as symFill, symbolText as symText } from '../font/font-symbol-text';

/**
 * Function that returns a plane 15 character for a symbol line using an FSW symbol key
 * @function fsw.symbolLine
 * @param {string} fsw - an FSW symbol key
 * @returns {string} character for symbol line
 * @example
 * fsw.symbolLine('S10000')
 * 
 * return '󰀁'
 */
const symbolLine = function(fsw){
  return symLine(convert.key2id(fsw));
}

/**
 * Function that returns a plane 16 character for a symbol fill using an FSW symbol key
 * @function fsw.symbolFill
 * @param {string} fsw - an FSW symbol key
 * @returns {string} character for symbol fill
 * @example
 * font.symbolFill('S10000')
 * 
 * return '􀀁'
 */
const symbolFill = function(fsw){
  return symFill(convert.key2id(fsw));
}

/**
 * Function that creates two text elements for a symbol using an FSW symbol key
 * @function fsw.symbolText
 * @param {string} fsw - an FSW symbol key
 * @returns {string} svg segment for line and fill
 * @example
 * fsw.symbolText('S10000')
 * 
 * return `    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>`
 */
const symbolText = function(fsw){
  return symText(convert.key2id(fsw));
}


export { symbolLine, symbolFill, symbolText }
