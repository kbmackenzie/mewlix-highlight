import { mewlix } from '@/index';
import hljs from 'highlight.js';

hljs.registerLanguage('mewlix', mewlix);

function highlightMewlix(input: string): void {
  const html = hljs.highlight(input, { language: 'mewlix' });
  console.log(html.value);
}

[
  'mew x = std.purr(":3")'
].forEach(highlightMewlix);
