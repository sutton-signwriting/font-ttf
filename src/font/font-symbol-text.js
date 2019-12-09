
/**
 * Function that returns a plane 15 character for a symbol line using an id
 * @function font.symbolLine
 * @param {number} id - a 16-bit number of a symbol
 * @example
 * font.symbolLine(1)
 * 
 * return '󰀁'
 */
const symbolLine = function (id){
  return String.fromCodePoint(id+0xF0000);
}

/**
 * Function that returns a plane 16 character for a symbol fill using an id
 * @function font.symbolFill
 * @param {number} id - a 16-bit number of a symbol
 * @example
 * font.symbolFill(1)
 * 
 * return '􀀁'
 */
const symbolFill = function (id){
  return String.fromCodePoint(id+0x100000);
}

/**
 * Function that creates two text elements for a symbol using an id
 * @function font.symbolText
 * @param {number} id - a 16-bit number of a symbol
 * @example
 * font.symbolText(1)
 * 
 * return `    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀁</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀁</text>`
 */
const symbolText = function(id){
  return `    <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">${symbolFill(id)}</text>
    <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">${symbolLine(id)}</text>`;
}

export { symbolLine, symbolFill, symbolText }
