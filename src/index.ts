import type { HLJSApi, Language, Mode } from 'highlight.js';

function matchWords(hljs: HLJSApi, words: RegExp[]): string {
  const regex = hljs.regex;
  return regex.concat(/\b/, regex.either(...words), /\b/);
}

function comment(hljs: HLJSApi): Mode[] {
  const lineComment  = hljs.COMMENT(/--/, /$/);
  const blockComment = hljs.COMMENT(
    /~\( \^\.x\.\^\)>/,
    /<\(\^\.x\.\^ \)~/,
    { contains: ['self'], relevance: 10 },
  );
  return [lineComment, blockComment];
};

function expression(hljs: HLJSApi): Mode[] {
  const cats: Mode = {
    scope: 'keyword',
    relevance: 10,
    variants: [
      { match: /=\^\.x\.\^=/ },
      { match: /=\^oxo\^=/   },
      { match: /=\^\-x\-\^=/ },
    ],
  };

  const number: Mode = {
    scope: 'number',
    match: /\b\d+(?:\.\d+)?(?:e\d+)?\b/,
  };

  const string: Mode = {
    scope: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      { begin: /"/, end: /"/, },
      { begin: /'/, end: /'/, },
      { begin: /"""/ , end: /"""/, },
      { begin: /'''/ , end: /'''/, },
    ],
  };

  const yarnStrings: Mode = {
    scope: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      { begin: /:3"/ , end: /"/, relevance: 10 },
      { begin: /:3'/ , end: /'/, relevance: 10 },
    ],
  };

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

  const literals: RegExp[] = [
    /true/,
    /false/,
    /nothing/,
  ];

  const builtIns: RegExp[] = [
    /std/,
    /graphic/,
    /console/,
    /curry/,
  ];

  const operatorSymbols: RegExp[] = [
    /[+\-/\*\%\^\<\>\=\!\:\|]/,
    /\.\.(?:\.\?)?/,
  ];

  const expressionKeywords: RegExp[] = [
    /meow/,
    /do/,
    /home/,
    /outside/,
  ];

  const operatorKeywords: RegExp[] = [
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

  const expression: Mode[] = [
    cats,
    number,
    string,
    yarnStrings,
    cats,
    ...identifiers,
    ...comment(hljs),
    {
      scope: 'literal',
      match: matchWords(hljs, literals)
    },
    {
      scope: 'built_in',
      match: matchWords(hljs, builtIns),
    },
    {
      scope: 'keyword',
      match: matchWords(hljs, expressionKeywords),
    },
    {
      scope: 'operator',
      match: hljs.regex.either(...operatorSymbols),
    },
    {
      scope: 'operator',
      match: matchWords(hljs, operatorKeywords),
    },
  ];

  yarnStrings.contains!.push({
    scope: 'subst',
    begin: /\[/,
    end: /\]/,
    contains: expression,
  });
  return expression;
}

function statement(hljs: HLJSApi): Mode[] {
  const keywords: RegExp[] = [
    /clowder/,
    /catnap/,
    /bring/,
    /mew/,
    /assert/,
    /explode/,
    /rethrow/,
    /escape/,
    /takes/,
    /as/,
    /from/,
    /run away/,
    /cat tree/,
    /pounce when/,
    /or when/,
    /else hiss/,
    /look outside/,
    /stare while/,
    /chase after/,
    /yarnball/,
    /yarn ball/,
    /watch/,
    /pounce on/,
  ];

  return [
    ...expression(hljs),
    {
      scope: 'keyword',
      match: matchWords(hljs, keywords),
    },
  ];
}

export function mewlix(hljs: HLJSApi): Language {
  return {
    name: 'mewlix',
    contains: statement(hljs),
  }
}
