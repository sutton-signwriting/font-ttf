
/**
 * Function that appends font-face CSS for the Sutton SignWriting fonts for system installed fonts, relative directory fonts, or content delivery network
 * @function font.cssAppend
 * @param {string} dir - an optional relative directory for font location
 * @example
 * font.cssAppend('./font/')
 */
const cssAppend = function(dir='') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(`
  @font-face {
    font-family: "SuttonSignWritingLine";
    src: 
      local('SuttonSignWritingLine'),
      ${dir?`url('${dir}SuttonSignWritingLine.ttf') format('truetype'),`:""}
      url('https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingLine.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingFill";
    src: 
      local('SuttonSignWritingFill'),
      ${dir?`url('${dir}SuttonSignWritingFill.ttf') format('truetype'),`:""}
      url('https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingFill.ttf') format('truetype');
  }
  @font-face {
    font-family: "SuttonSignWritingOneD";
    src: 
      local('SuttonSignWritingOneD'),
      ${dir?`url('${dir}SuttonSignWritingOneD.ttf') format('truetype'),`:""}
      url('https://cdn.rawgit.com/Slevinski/SuttonSignWriting/master/assets/SuttonSignWritingOneD.ttf') format('truetype');
  }
  `));
  document.head.appendChild(style);
}

export { cssAppend }
