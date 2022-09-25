
import { swu2id } from '@sutton-signwriting/core/convert/convert'; 
import { symbolLine as symLine, symbolFill as symFill, symbolText as symText } from '../font/font-symbol-text';

/**
 * Function that returns a plane 15 character for a symbol line using an SWU symbol character
 * @function swu.symbolLine
 * @param {string} swu - an SWU symbol character
 * @returns {string} character for symbol line
 * @example
 * swu.symbolLine('񀀁')
 * 
 * return '󰀁'
 */
const symbolLine = function(swu){
  return symLine(swu2id(swu));
}

/**
 * Function that returns a plane 165 character for a symbol fill using an SWU symbol character
 * @function swu.symbolFill
 * @param {string} swu - an SWU symbol character
 * @returns {string} character for symbol fill
 * @example
 * swu.symbolFill('񀀁')
 * 
 * return '􀀁'
 */
const symbolFill = function(swu){
  return symFill(swu2id(swu));
}

/**
 * Function that creates two text elements for a symbol using an SWU symbol character
 * @function swu.symbolText
 * @param {string} swu - an SWU symbol character
 * @returns {string} svg segment for line and fill
 * @example
 * swu.symbolText('񀀁')
 * 
 * return `    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>`
 */
const symbolText = function(swu){
  return symText(swu2id(swu));
}
export { symbolLine, symbolFill, symbolText }
