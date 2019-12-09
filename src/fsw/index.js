
/** The fsw module contains functions for handling Formal SignWriitng in ASCII (FSW) characters.
 * [FSW characters definition](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-07.html#rfc.section.2.2.1)
 * @module fsw
 */

import { symbolSize } from  './fsw-symbol-size';
import { symbolLine, symbolFill, symbolText } from  './fsw-symbol-text';
import { symbolSvg } from  './fsw-symbol-svg';
import { symbolPng } from './fsw-symbol-png';
import { symbolNormalize } from './fsw-symbol-normalize';
import { signSvg } from './fsw-sign-svg';
import { signPng } from './fsw-sign-png';
import { signNormalize } from './fsw-sign-normalize';

export { symbolSize, symbolLine, symbolFill, symbolText, symbolSvg, symbolPng, symbolNormalize, signSvg, signPng, signNormalize }
