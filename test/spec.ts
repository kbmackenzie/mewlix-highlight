import hljs from 'highlight.js';
import { mewlix } from '@/index';
hljs.registerLanguage('mewlix', mewlix);

/* Utility type for recursively generating <span> tags. */
type Span = {
  scope: string;
  children: (Span | string)[];
};

function render(span: Span | string): string {
  if (typeof span === 'string') return span;
  const children = renderAll(span.children);
  return `<span class="hljs-${span.scope}">${children}</span>`;
}

function renderAll(span: (Span | string)[]): string {
  return span.map(render).join('');
}

/* Span utilities: */
const span = {
  number(x: number): Span {
    return { scope: 'number', children: [String(x)] };
  },
  string(x: string, single?: boolean): Span {
    const quote = (single) ? '&apos;' : '&quot;';
    return { scope: 'string', children: [quote, x, quote] };
  },
  literal(x: boolean | string): Span {
    return { scope: 'string', children: [String(x)] };
  },
  operator(x: string): Span {
    return { scope: 'operator', children: [x] };
  },
};

/* Test input: */
type TestInput = {
  input: string;
  expected: (Span | string)[];
};

describe('mewlix syntax highlighting', () => {
  const expressions: TestInput[] = [
    {
      input: '2 + 2',
      expected: [span.number(2), ' ', span.operator('+'), ' ', span.number(2)],
    },
    {
      input: '"a" .. "b"',
      expected: [span.string('a'), ' ', span.operator('..'), ' ', span.string('b')],
    },
    {
      input: 'a push b',
      expected: ['a ', span.operator('push'), ' b'],
    },
    {
      input: 'knock over [4, 3, 1]',
      expected: [
        span.operator('knock over'),
        ' [',
        span.number(4),
        ', ',
        span.number(3),
        ', ',
        span.number(1),
        ']',
      ]
    },
    {
      input: ':3"2 + 2 is [2 + 2]"',
      expected: [{
        scope: 'string',
        children: [
          ':3&quot;',
          '2 + 2 is ',
          {
            scope: 'subst',
            children: ['[', span.number(2), ' ', span.operator('+'), ' ', span.number(2), ']'],
          },
          '&quot;',
        ],
      }],
    },
  ];

  test.each(expressions)('expression: %p', ({ input, expected }) => {
    const output = hljs.highlight(input, { language: 'mewlix' }).value;
    const expectation = renderAll(expected);
    expect(output).toBe(expectation);
  });
});
