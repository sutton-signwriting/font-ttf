
/**
 * Function that appends font-face CSS for the Sutton SignWriting fonts for system installed fonts, relative directory fonts, or content delivery network
 * @function font.cssAppend
 * @param {string} dir - an optional relative directory for font location
 * @example
 * font.cssAppend('./font/')
 */
const cssAppend = function(dir='') {
  const id = "SgnwFontCss";
  if (!document.getElementById(id)){
    const style = document.createElement('style');
    style.setAttribute("id","SgnwFontCss")
    style.appendChild(document.createTextNode(`
  @font-face {
    font-family: "SuttonSignWritingLine";
    src: 
      local('SuttonSignWritingLine'),
      ${dir?`url('${dir}SuttonSignWritingLine.ttf') format('truetype'),`:""}
      url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingLine.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingFill";
    src: 
      local('SuttonSignWritingFill'),
      ${dir?`url('${dir}SuttonSignWritingFill.ttf') format('truetype'),`:""}
      url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingFill.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingOneD";
    src: 
      local('SuttonSignWritingOneD'),
      ${dir?`url('${dir}SuttonSignWritingOneD.ttf') format('truetype'),`:""}
      url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingOneD.ttf') format('truetype');
  }
    `));
    document.head.appendChild(style);
  }
}

export { cssAppend }
