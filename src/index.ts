import type { HLJSApi, LanguageFn, Mode } from 'highlight.js';

const comments = (hljs: HLJSApi): Mode[] => {
  const lineComment  = hljs.COMMENT(/--/, /$/);
  const blockComment = hljs.COMMENT(
    /~\( \^\.x\.\^\)>/,
    /<\(\^\.x\.\^ \)~/,
    { contains: ['self'], relevance: 10 },
  );
  return [lineComment, blockComment];
};

const keywordConstants: string[] = [
  'meow',
  'do',
  'home',
  'clowder',
  'listen',
  'catnap',
  'bring',
  'mew',
  'outside',
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
  /pounce when/,
  /or when/,
  /else hiss/,
  /look outside/,
  /stare while/,
  /chase after/,
  /catch a/,
  /yarn ball/,
  /pounce on/,
];

const operatorSymbols: RegExp[] = [
  /[+\-/\*\%\^\<\>\=\!\:\|]/,
  /\.\.(?:\.\?)?/,
];

const operatorPatterns: RegExp[] = [
  /knock over/,
  /paw at/,
  /claw at/,
  /type of/,
  /and/,
  /not/,
  /nand/,
  /nor/,
  /push/,
  /is/,
  /new/,
  /if/,
  /else(?!\s*just)/,
  /or(?!\s*if)/,
  /in/,
];

const identifiers: Mode[] = [
  {
    scope: 'title.function',
    match: /\b_*[a-zA-Z][a-zA-Z_0-9]*\b(?=\()/,
  },
  {
    scope: 'title.function',
    match: /\b_*[a-zA-Z][a-zA-Z0-9_]*\b(?=\s*<-)/,
  },
  {
    scope: 'title.class',
    match: /\b_*[A-Z][a-zA-Z_0-9]*\b/,
  },
  {
    scope: 'property',
    match: /\.\b_*[a-zA-Z][a-zA-Z_0-9]*\b/,
  },
];

const strings = (hljs: HLJSApi): Mode => ({
  scope: 'string',
  contains: [hljs.BACKSLASH_ESCAPE],
  variants: [
    { begin: /"/, end: /"/, },
    { begin: /'/, end: /'/, },
    { begin: /"""/ , end: /"""/, },
    { begin: /'''/ , end: /'''/, },
  ],
});

const number: Mode = {
  scope: 'number',
  match: /\b\d+(?:\.\d+)?(?:e\d+)?\b/,
};

const operators = (hljs: HLJSApi): Mode[] => [
  {
    scope: 'operator',
    match: hljs.regex.either(...operatorSymbols),
  },
  {
    scope: 'operator',
    match: hljs.regex.concat(
      /\b/,
      hljs.regex.either(...operatorPatterns),
      /\b/,
    ),
  },
];

const keywords = (hljs: HLJSApi): Mode[] => [
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
    scope: 'keyword',
    match: hljs.regex.concat(
      /\b/,
      hljs.regex.either(...keywordPatterns),
      /\b/,
    ),
  },
];

const yarnStrings = (contains: Mode[]): Mode => ({
  scope: 'string',
  variants: [
    { begin: /:3"/ , end: /"/, relevance: 10 },
    { begin: /:3'/ , end: /'/, relevance: 10 },
  ],
  contains: [
    {
      className: 'subst',
      begin: /\[/,
      end: /\]/,
      contains: contains,
    },
  ],
});

export const mewlix: LanguageFn = (hljs) => {
  const contains: Mode[] = [
    number,
    strings(hljs),
    ...comments(hljs),
    ...identifiers,
    ...keywords(hljs),
    ...operators(hljs),
  ];
  contains.unshift(
    yarnStrings(contains),
  );

  return {
    name: 'mewlix',
    keywords: {
      keyword: keywordConstants,
      literal: 'true false nothing',
      built_in: 'std console graphic curry',
    },
    contains: contains,
  }
};
