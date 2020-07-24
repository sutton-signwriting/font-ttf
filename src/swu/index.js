
/** The swu module contains functions for handling SignWriting in Unicode (SWU) characters.
 * [SWU characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.1)
 * @module swu
 */

import { symbolSize } from  './swu-symbol-size';
import { symbolLine, symbolFill, symbolText } from  './swu-symbol-text';
import { symbolSvg } from  './swu-symbol-svg';
import { symbolPng } from './swu-symbol-png';
import { symbolNormalize } from './swu-symbol-normalize';
import { signSvg } from './swu-sign-svg';
import { signPng } from './swu-sign-png';
import { signNormalize } from './swu-sign-normalize';

export { symbolSize, symbolLine, symbolFill, symbolText, symbolSvg, symbolPng, symbolNormalize, signSvg, signPng, signNormalize }
