
import { parse as parseStyle} from '@sutton-signwriting/core/style/style'; 
import { parse, colorize } from '@sutton-signwriting/core/fsw/fsw';
import { symbolText } from './fsw-symbol-text';

/**
 * Function that creates an SVG image from an FSW sign with an optional style string
 * @function fsw.signSvgBody
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} body of SVG for sign
 * @example
 * fsw.signSvgBody('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 * 
 * return `<text font-size="0">M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>
 *   <g transform="translate(483,510)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􋛩</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󻛩</text>
 *   </g>
 *   <g transform="translate(501,466)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀒</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀒</text>
 *   </g>
 *   <g transform="translate(510,500)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􋚥</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󻚥</text>
 *   </g>
 *   <g transform="translate(476,475)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀚</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀚</text>
 *   </g>`
 */
const signSvgBody = (fswSign) => {
  let parsed = parse.sign(fswSign);
  const blank = '';
  if (parsed.spatials) {
    let styling = parseStyle(parsed.style);

    if (styling.detailsym) {
      styling.detailsym.forEach(sym => {
        if (parsed.spatials[sym.index - 1]){
          parsed.spatials[sym.index - 1].detail = sym.detail;
        }
      })
    }

    let x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
    let y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
    let x2 = parsed.max[0];
    let y2 = parsed.max[1];

    let background = '';
    if (styling.padding) {
      x1 -= styling.padding;
      y1 -= styling.padding;
      x2 += styling.padding;
      y2 += styling.padding;
    }
    if (styling.background) {
      background = `\n  <rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" style="fill:${styling.background};" />`
    }

    let svg = `  <text font-size="0">${fswSign}</text>${background}`

    const line = styling.detail && styling.detail[0];
    const fill = styling.detail && styling.detail[1];

    svg += '\n' + parsed.spatials.map(spatial => {
      let svg = symbolText(spatial.symbol);

      let symLine = line;
      if (spatial.detail) {
        symLine = spatial.detail[0];
      } else if (styling.colorize) {
        symLine = colorize(spatial.symbol);
      }
      if (symLine) {
        svg = svg.replace(/class="sym-line" fill="black"/, `class="sym-line" fill="${symLine}"`);
      }

      let symFill = fill;
      if (spatial.detail && spatial.detail[1]) {
        symFill = spatial.detail[1];
      }
      if (symFill) {
        svg = svg.replace(/class="sym-fill" fill="white"/, `class="sym-fill" fill="${symFill}"`);
      }

      return `  <g transform="translate(${spatial.coord[0]},${spatial.coord[1]})">
${svg}
  </g>`;

    }).join('\n');

    return svg;
  }
  return blank;
}

/**
 * Function that creates an SVG image from an FSW sign with an optional style string
 * @function fsw.signSvg
 * @param {string} fswSign - an FSW sign with optional style string
 * @returns {string} SVG for sign
 * @example
 * fsw.signSvg('M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475')
 * 
 * return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="49" height="69" viewBox="476 466 49 69">
 *   <text font-size="0">M525x535S2e748483x510S10011501x466S2e704510x500S10019476x475</text>
 *   <g transform="translate(483,510)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􋛩</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󻛩</text>
 *   </g>
 *   <g transform="translate(501,466)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀒</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀒</text>
 *   </g>
 *   <g transform="translate(510,500)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􋚥</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󻚥</text>
 *   </g>
 *   <g transform="translate(476,475)">
 *     <text class="sym-fill" fill="white" style="pointer-events:none;font-family:'SuttonSignWritingFill';font-size:30px;">􀀚</text>
 *     <text class="sym-line" fill="black" style="pointer-events:none;font-family:'SuttonSignWritingLine';font-size:30px;">󰀚</text>
 *   </g>
 * </svg>`
 */
 const signSvg = (fswSign) => {
  let parsed = parse.sign(fswSign);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
  if (parsed.spatials) {
    let styling = parseStyle(parsed.style);

    let x1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[0]));
    let y1 = Math.min(...parsed.spatials.map(spatial => spatial.coord[1]));
    let x2 = parsed.max[0];
    let y2 = parsed.max[1];

    let classes = '';
    if (styling.classes) {
      classes = ` class="${styling.classes}"`
    }
    let id = '';
    if (styling.id) {
      id = ` id="${styling.id}"`
    }

    if (styling.padding) {
      x1 -= styling.padding;
      y1 -= styling.padding;
      x2 += styling.padding;
      y2 += styling.padding;
    }

    let sizing = '';
    if (styling.zoom != 'x') {
      sizing = ` width="${(x2 - x1) * (styling.zoom ? styling.zoom : 1)}" height="${(y2 - y1) * (styling.zoom ? styling.zoom : 1)}"`;
    }

    let svg = `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
`

    svg += signSvgBody(fswSign);

    svg += '\n</svg>';

    return svg;
  }
  return blank;
}

export { signSvgBody, signSvg }
