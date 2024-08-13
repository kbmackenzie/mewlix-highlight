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

const keywords: string[] = [
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
  /look outside/,
  /or if/,
  /else just/,
  /stare while/,
  /chase after/,
  /catch a/,
  /yarn ball/,
  /pounce on/,
];

const operators: RegExp[] = [
  /[+\-/\*\%\<\>\=\!\:\|]/,
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
    { begin: /:3"/ , end: /"/, relevance: 10 },
    { begin: /:3'/ , end: /'/, relevance: 10 },
    { begin: /"""/ , end: /"""/, },
    { begin: /'''/ , end: /'''/, },
  ],
});

const number: Mode = {
  scope: 'number',
  match: /\b\d+(?:\.\d+)?(?:e\d+)?\b/,
};

export const mewlix: LanguageFn = (hljs) => ({
  name: 'mewlix',
  keywords: {
    keyword: keywords,
    literal: 'true false nothing',
    built_in: 'std console graphic curry',
  },
  contains: [
    number,
    strings(hljs),
    ...comments(hljs),
    ...identifiers,
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
    {
      scope: 'operator',
      match: hljs.regex.either(...operators),
    },
    {
      scope: 'operator',
      match: hljs.regex.concat(
        /\b/,
        hljs.regex.either(...operatorPatterns),
        /\b/,
      ),
    },
  ],
});
