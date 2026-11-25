import manifest from './mirror-manifest';
import { symbolSize } from './fsw/fsw-symbol-size';

const pairs = new Map();
for (const [left, right] of manifest.pairs) {
  pairs.set(left, right);
  pairs.set(right, left);
}
const unmirrorable = new Set(manifest.unmirrorable);

export function mirrorKey(symbol) {
  if (unmirrorable.has(symbol)) {
    throw new RangeError(`${symbol} has no representable horizontal mirror in ISWA`);
  }

  const key = manifest.aliases[symbol] || symbol;
  const base = key.slice(0, 4);
  const { firstBase, lastBase, rotationOffset } = manifest.handRule;
  if (base >= firstBase && base <= lastBase) {
    const rotation = (parseInt(key[5], 16) + rotationOffset) % 16;
    const mirror = key.slice(0, 5) + rotation.toString(16);
    return symbolSize(key) && symbolSize(mirror) ? mirror : key;
  }
  return pairs.get(key) || key;
}
