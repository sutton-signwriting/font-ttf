
import { parse as parseStyle} from '@sutton-signwriting/core/style/style.mjs'; 
import { parse, colorize } from '@sutton-signwriting/core/swu/swu.mjs';
import { symbolSize } from './swu-symbol-size';
import { symbolText } from './swu-symbol-text';

/**
 * Function that creates an SVG image from an SWU sign with an optional style string
 * @function swu.signSvg
 * @param {string} swuSign - an SWU sign with optional style string
 * @example
 * swu.signSvg('𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2')
 * 
 * return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="138" height="178" viewBox="466 456 69 89">
 *   <text font-size="0">𝠀񀀒񀀚񋚥񋛩𝠃𝤟𝤩񋛩𝣵𝤐񀀒𝤇𝣤񋚥𝤐𝤆񀀚𝣮𝣭-P10G_green_D_yellow,ff0ff0_Z2</text>
 *   <rect x="466" y="456" width="69" height="89" style="fill:green;" />
 *   <g transform="translate(483,510)">
 *     <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋛩</text>
 *     <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻛩</text>
 *   </g>
 *   <g transform="translate(501,466)">
 *     <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀒</text>
 *     <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀒</text>
 *   </g>
 *   <g transform="translate(510,500)">
 *     <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􋚥</text>
 *     <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󻚥</text>
 *   </g>
 *   <g transform="translate(476,475)">
 *     <text class="sym-fill" fill="#ff0ff0" style="pointer-events:none;font-family:\'SuttonSignWritingFill\';font-size:30px;">􀀚</text>
 *     <text class="sym-line" fill="yellow" style="pointer-events:none;font-family:\'SuttonSignWritingLine\';font-size:30px;">󰀚</text>
 *   </g>
 * </svg>`
 */
const signSvg = (swuSign) => {
  let parsed = parse.sign(swuSign);
  const blank = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
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

    if (styling.zoomsym) {
      styling.zoomsym.forEach(sym => {
        if (parsed.spatials[sym.index - 1]){
          parsed.spatials[sym.index - 1].zoom = sym.zoom;
          if (sym.offset) {
            parsed.spatials[sym.index - 1].coord[0] += sym.offset[0];
            parsed.spatials[sym.index - 1].coord[1] += sym.offset[1];
          }
          let size = symbolSize(parsed.spatials[sym.index - 1].symbol)
          x2 = Math.max(x2, (parsed.spatials[sym.index - 1].coord[0] + (size[0] * sym.zoom)));
          y2 = Math.max(y2, (parsed.spatials[sym.index - 1].coord[1] + (size[1] * sym.zoom)));
        }
      })
    }

    let classes = '';
    if (styling.classes) {
      classes = ` class="${styling.classes}"`
    }
    let id = '';
    if (styling.id) {
      id = ` id="${styling.id}"`
    }

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

    let sizing = '';
    if (styling.zoom != 'x') {
      sizing = ` width="${(x2 - x1) * (styling.zoom ? styling.zoom : 1)}" height="${(y2 - y1) * (styling.zoom ? styling.zoom : 1)}"`;
    }

    let svg = `<svg${classes}${id} version="1.1" xmlns="http://www.w3.org/2000/svg"${sizing} viewBox="${x1} ${y1} ${(x2 - x1)} ${(y2 - y1)}">
  <text font-size="0">${swuSign}</text>${background}`

    const line = styling.detail && styling.detail[0];
    const fill = styling.detail && styling.detail[1];

    svg += '\n' + parsed.spatials.map(spatial => {
      let svg = symbolText(spatial.symbol, spatial.coord);

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

      if (spatial.zoom) {
        svg = `<g transform="scale(${spatial.zoom})">${svg}</g>`;
      }

      return `  <g transform="translate(${spatial.coord[0]},${spatial.coord[1]})">
${svg}
  </g>`;

    }).join('\n');

    svg += '\n</svg>';

    return svg;
  }
  return blank;
}

export { signSvg }
