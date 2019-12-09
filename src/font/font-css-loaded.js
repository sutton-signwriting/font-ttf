
import { symbolSize } from './font-symbol-size';
import { symbolFill } from './font-symbol-text';

/**
 * Function that executes a callback function once the Sutton SignWriiting Line and Fill fonts are ready to use
 * @function font.cssLoaded
 * @param {function} callback - a callback function to execute when fonts are ready
 * @example
 * const callback = () => {
 *   console.log("Sutton SignWriting Line and Fill fonts are ready to use")
 * }
 * 
 * font.cssLoaded( callback )
 */
const cssLoaded = function (callback){
  let lineReady = false;
  let fillReady = false;
  cssLoadedLine(() => {lineReady = true;})
  cssLoadedFill(() => {fillReady = true;})
  const cssCheck = setInterval(function(){
    if (lineReady && fillReady){
      clearInterval(cssCheck);
      callback();
    }
  },100);
}

/**
 * Function that executes a callback function once the Sutton SignWriiting Line font is ready to use
 * @function font.cssLoadedLine
 * @param {function} callback - a callback function to execute when line font is ready
 * @example
 * const callback = () => {
 *   console.log("Sutton SignWriting Line font is ready to use")
 * }
 * 
 * font.cssLoadedLine( callback )
 */
const cssLoadedLine = function (callback){
  if (!symbolSize(1)){
    const cssCheck = setInterval(function(){
      if (symbolSize(1)){
        clearInterval(cssCheck);
        callback();
      }
    },100);
  } else {
    callback();
  }
}

/**
 * Function that executes a callback function once the Sutton SignWriiting Fill font is ready to use
 * @function font.cssLoadedFill
 * @param {function} callback - a callback function to execute when fill font is ready
 * @example
 * const callback = () => {
 *   console.log("Sutton SignWriting Fill font is ready to use")
 * }
 * 
 * font.cssLoadedFill( callback )
 */
const cssLoadedFill = function (callback){
  const fillReady = function () {
    const canvaser = document.createElement("canvas");
    canvaser.width = 15;
    canvaser.height = 30;
    const context = canvaser.getContext("2d");
    context.font = "30px 'SuttonSignWritingFill'";
    context.fillText(symbolFill(1),0,0);
    const imgData = context.getImageData(0,0,15,30).data;
    return !imgData.every(item => item ===0);
  }
  if (!fillReady()){
    const cssCheck = setInterval(function(){
      if (fillReady()){
        clearInterval(cssCheck);
        callback();
      }
    },100);
  } else {
    callback();
  }
}

export { cssLoaded, cssLoadedLine, cssLoadedFill }
