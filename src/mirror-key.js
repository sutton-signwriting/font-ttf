import manifest from './mirror-manifest';
import { symbolSize } from './fsw/fsw-symbol-size';

const rules = new Map();
for (const group of manifest.groups) {
  for (const prefix of group.prefixes) rules.set(prefix, group);
}
const unmirrorable = new Set(manifest.unmirrorable);

function rotate(rule, rotation) {
  if (rule.op === 'xor') return rotation ^ rule.mask;
  if (rule.op === 'reflectModulo') {
    return ((rule.axis - rotation) % rule.modulus + rule.modulus) % rule.modulus;
  }
  return rule.digits[rotation] ?? rotation;
}

export function mirrorKey(symbol) {
  if (unmirrorable.has(symbol)) {
    throw new RangeError(`${symbol} has no representable horizontal mirror in ISWA`);
  }

  const key = manifest.aliases[symbol] || symbol;
  const base = key.slice(0, 4);
  const { firstBase, lastBase } = manifest.handRule;
  const rule = base >= firstBase && base <= lastBase
    ? manifest.handRule
    : rules.get(key.slice(0, 5)) || rules.get(base);
  let mirror = manifest.overrides[key];
  if (mirror === undefined && rule) {
    const fill = parseInt(key[4], 16) ^ (rule.fillXor || 0);
    const rotation = rotate(rule.rotation, parseInt(key[5], 16));
    mirror = base + fill.toString(16) + rotation.toString(16);
  }
  return mirror && mirror !== key && symbolSize(symbol) && symbolSize(mirror) ? mirror : symbol;
}
