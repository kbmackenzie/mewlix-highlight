import { wordSequenceToMode } from '@/generate';
import type { Mode } from 'highlight.js';

export const simpleKeywords: string[] = [
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

export const specialKeywords: Mode[] = [
  {
    scope: 'keyword',
    match: /=\^\.x\.\^=/i,
    relevance: 10,
  },
  {
    scope: 'keyword',
    match: /=\^oxo\^=/i,
    relevance: 10,
  },
  {
    scope: 'keyword',
    match: /=\^\-x\-\^=/i,
    relevance: 10,
  },
  ...[
    ['run'   , 'away'   ],
    ['cat'   , 'tree'   ],
    ['look'  , 'outside'],
    ['or'    , 'if'     ],
    ['else'  , 'just'   ],
    ['stare' , 'while'  ],
    ['chase' , 'after'  ],
    ['catch' , 'a'      ],
    ['yarn'  , 'ball'   ],
    ['pounce', 'on'     ],
  ].map(words => wordSequenceToMode(words, 'keyword')),
];

export const operators: Mode[] = [
  {
    scope: 'operator',
    match: /[+\-\*/^=<>%]/,
  },
  {
    scope: 'operator',
    match: ':>',
  },
  {
    scope: 'operator',
    match: '|>',
  },
  {
    scope: 'operator',
    match: '..',
  },
  {
    scope: 'operator',
    match: '...?',
  },
  ...[
    ['knock', 'over'],
    ['paw'  , 'at'  ],
    ['claw' , 'at'  ],
    ['type' , 'of'  ],
  ].map(words => wordSequenceToMode(words, 'operator')),
  ...[
    'and',
    'not',
    'push',
    'is',
    'new',
    'if',
    'else',
    'or',
    'in'
  ].map(operator => {
    return {
      scope: 'operator',
      match: '\\b' + operator,
    };
  }),
];
