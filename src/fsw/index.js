
/** The fsw module contains functions for handling Formal SignWriitng in ASCII (FSW) characters.
 * [FSW characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-formal-signwriting-in-ascii)
 * @module fsw
 */

import { symbolSize } from  './fsw-symbol-size';
import { symbolLine, symbolFill, symbolText } from  './fsw-symbol-text';
import { symbolSvgBody, symbolSvg } from  './fsw-symbol-svg';
import { symbolPng } from './fsw-symbol-png';
import { symbolNormalize } from './fsw-symbol-normalize';
import { signSvgBody, signSvg } from './fsw-sign-svg';
import { signPng } from './fsw-sign-png';
import { signNormalize } from './fsw-sign-normalize';
import { columnSvg } from './fsw-column-svg';
import { columnsSvg } from './fsw-columns-svg';
import { columnPng } from './fsw-column-png';
import { columnsPng } from './fsw-columns-png';

export { symbolSize, symbolLine, symbolFill, symbolText, symbolSvgBody, symbolSvg, symbolPng, symbolNormalize, signSvgBody, signSvg, signPng, signNormalize, columnSvg, columnsSvg, columnPng, columnsPng }
