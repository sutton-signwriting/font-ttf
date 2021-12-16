
let sizes = {}

const zoom = 2;
const bound = 76 * zoom;
let context;

/**
 * Function that returns the size of a symbol using an id
 * @function font.symbolSize
 * @param {number} id - a 16-bit number of a symbol
 * @example
 * font.symbolSize(1)
 * 
 * return [15,30]
 */
const symbolSize = function(id){
  if (id in sizes) {
    return [...sizes[id]];
  }
  if(!context) {
    const canvaser = document.createElement("canvas");
    canvaser.width = bound;
    canvaser.height = bound;
    context = canvaser.getContext("2d"); 
  }
  context.clearRect(0, 0, bound, bound);
  context.font = (30*zoom) + "px 'SuttonSignWritingLine'";
  context.fillText(String.fromCodePoint(id+0xF0000),0,0);
  const imgData = context.getImageData(0,0,bound,bound).data;
  let w,h,i,s,size;
  wloop:
  for (w=bound-1;w>=0;w--){
    for (h=0;h<bound;h+=1){
      for (s=0;s<4;s+=1){
        i=w*4+(h*4*bound) +s;
        if (imgData[i]){
          break wloop;
        }
      }
    }
  }
  var width = w;
  hloop:
  for (h=bound-1;h>=0;h--){
    for (w=0;w<width;w+=1){
      for (s=0;s<4;s+=1){
        i=w*4+(h*4*bound) +s;
        if (imgData[i]){
          break hloop;
        }
      }
    }
  }
  var height = h+1;
  width= Math.ceil(width/zoom);
  height= Math.ceil(height/zoom);
  // Rounding error in chrome.  Manual fixes.
  if (14394 == id){
    width = 19;
  }
  if ([10468, 10480, 10496, 10512, 10500, 10532, 10548, 10862, 10878, 10894, 11058, 11074, 11476, 11488, 11492, 11504, 11508, 11520, 10516, 10910, 10926, 11042, 11082, 10942].includes(id)){
    width = 20;
  }
  if (31921 == id){
    width = 22;
  }
  if (38460 == id){
    width = 23;
  }
  if ([20164, 20212].includes(id)){
    width = 25;
  }
  if (31894 == id){
    width = 28;
  }
  if (46698 == id){
    width = 29;
  }
  if (29606 == id){
    width = 30;
  }
  if (44855 == id){
    width = 40;
  }
  if (32667 == id){
    width = 50;
  }
  if ([11088, 11474, 11490, 11506].includes(id)){
    height = 20;
  }
  if (6285 == id){
    height = 21;
  }
  if (40804 == id){
    height = 31;
  }
  if (41475 == id){
    height = 36;
  }
  // Error in chrome.  Manual fix.
  // if (width==0 && height==0) {
  if (width==0 && height==0) {

    const sizefix = {
      9: [15,30],
      10: [21,30],
      11: [30,15],
      12: [30,21],
      13: [15,30],
      14: [21,30]
    }
    if (id in sizefix){
      width = sizefix[id][0];
      height = sizefix[id][1];
    }
  }
  if (width==0 && height==0) {
    return undefined;
  }
  sizes[id]=[width,height];
  return [width,height];
}

export { symbolSize }
