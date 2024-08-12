import type { Mode } from 'highlight.js';

export function wordSequenceToMode(seq: string[], scope: string): Mode {
  const re = '\\b' + seq.join('\\s*');
  return {
    scope: scope,
    match: new RegExp(re),
  };
}
