
// appends CSS styling to documentation output for SignWriting in Unicode (SWU) character font-family.
// alternatively, modify node_modules/dcumentation/src/default-theme/assets/style.css to add styling directly

const fs = require('fs');

const appendStyle = `
@font-face {
  font-family: "SuttonSignWritingOneD";
  src: 
    local('SuttonSignWritingOneD'),
    url('./SuttonSignWritingOneD.ttf') format('truetype'),
    url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingOneD.ttf') format('truetype');
}

.pre,
pre,
code,
.code {
  font-family: Source Code Pro, Menlo, Consolas, Liberation Mono, monospace, SuttonSignWritingOneD;
}
`;

fs.appendFile('docs/assets/style.css', appendStyle, function (err) {
  if (err) console.log(err);
});
