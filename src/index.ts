import type { LanguageFn, Mode } from 'highlight.js';
import { simpleKeywords, specialKeywords, operators } from '@/keyword';

const identifiers: Mode[] = [
  {
    scope: 'title.function',
    match: /\b[a-z_][a-zA-Z_0-9]+\(/,
  },
  {
    scope: 'title.class',
    match: /\b[A-Z_][a-zA-Z_0-9]+/,
  },
  {
    scope: 'variable.language',
    keywords: ['home', 'outside'],
  },
  {
    scope: 'variable.constant',
    keywords: ['std', 'console', 'graphic'],
  },
  {
    scope: 'property',
    match: /\b[a-z_][a-zA-Z_0-9]+:/,
  },
];

const prims: Mode[] = [
  {
    scope: 'number',
    match: /\b\d+(?:\.\d+)?(?:e\d+)?/,
  },
  {
    scope: 'literal',
    keywords: [
      'true',
      'false',
      'nothing',
    ],
  },
];

const strings: Mode[] = [
  {
    scope: 'string',
    contains: ['self'],
    variants: [
      { begin: /\"{1,3}/, end: /\"{1,3}/, },
      { begin: /\'{1,3}/, end: /\'{1,3}/, },
      { begin: ':3"'    , end: '"',  relevance: 10 },
      { begin: ':3\''   , end: '\'', relevance: 10 },
    ],
  }
];

export const mewlix: LanguageFn = (_) => ({
  name: 'mewlix',
  keywords: simpleKeywords,
  contains: [
    ...identifiers,
    ...prims,
    ...strings,
    ...operators,
    ...specialKeywords,
  ],
});
