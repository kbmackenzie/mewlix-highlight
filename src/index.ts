import type { LanguageFn, Mode } from 'highlight.js';

const keywords: string[] = [
  'meow',
  'do',
  'listen',
  'catnap',
  'bring',
  'mew',
  'assert',
  'explode',
  'rethrow',
  'escape',
  'takes',
  'as',
  'from',
  'yarnball',
  'watch',
];

const keywordPatterns: RegExp[] = [
  /run away/,
  /cat tree/,
  /look outside/,
  /or if/,
  /else just/,
  /stare while/,
  /chase after/,
  /catch a/,
  /yarn ball/,
  /pounce on/,
];

const operators: string[] = [
  'and',
  'not',
  'push',
  'is',
  'new',
  'if',
  'else',
  'or',
  'in',
];

const operatorPatterns: RegExp[] = [
  /knock over/,
  /paw at/,
  /claw at/,
  /type of/,
  /and/,
  /not/,
  /push/,
  /is/,
  /new/,
  /if/,
  /else/,
  /or/,
  /in/,
];

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

const primitives: Mode[] = [
  {
    scope: 'number',
    match: /\b\d+(?:\.\d+)?(?:e\d+)?/,
  },
];

export const mewlix: LanguageFn = ({ regex }) => ({
  name: 'mewlix',
  keywords: keywords,
  literal: 'true false nothing',
  built_in: 'std console graphic curry',
  contains: [
    {
      scope: 'keyword',
      relevance: 10,
      variants: [
        { match: /=\^\.x\.\^=/ },
        { match: /=\^oxo\^=/   },
        { match: /=\^\-x\-\^=/ },
      ],
    },
    {
      scope: 'operator',
      match: regex.concat(
        /\b/,
        regex.either(...operatorPatterns),
        /\b/,
      ),
    },
    {
      scope: 'keyword',
      match: regex.concat(
        /\b/,
        regex.either(...keywordPatterns),
        /\b/,
      ),
    },
  ],
});
