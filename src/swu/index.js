
/** The swu module contains functions for handling SignWriting in Unicode (SWU) characters.
 * [SWU characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html#name-signwriting-in-unicode-swu)
 * @module swu
 */

import { symbolSize } from  './swu-symbol-size';
import { symbolLine, symbolFill, symbolText } from  './swu-symbol-text';
import { symbolSvgBody, symbolSvg } from  './swu-symbol-svg';
import { symbolPng } from './swu-symbol-png';
import { symbolNormalize } from './swu-symbol-normalize';
import { signSvgBody, signSvg } from './swu-sign-svg';
import { signPng } from './swu-sign-png';
import { signNormalize } from './swu-sign-normalize';
import { columnSvg } from './swu-column-svg';
import { columnsSvg } from './swu-columns-svg';
import { columnPng } from './swu-column-png';
import { columnsPng } from './swu-columns-png';

export { symbolSize, symbolLine, symbolFill, symbolText, symbolSvgBody, symbolSvg, symbolPng, symbolNormalize, signSvgBody, signSvg, signPng, signNormalize, columnSvg, columnsSvg, columnPng, columnsPng }
