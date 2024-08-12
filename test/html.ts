import { mewlix } from '@/index';
import hljs from 'highlight.js';
import fs from 'fs/promises';

hljs.registerLanguage('mewlix', mewlix);

function highlightMewlix(input: string): void {
  const html = hljs.highlight(input, { language: 'mewlix' });
  console.log(html.value);
}

async function generateHTML(filepath: string): Promise<void> {
  const contents = await fs.readFile(filepath, { encoding: 'utf8' });
  highlightMewlix(contents.toString());
}

const filepath = process.argv[2];
if (!filepath) {
  throw new Error('No filepath specified!');
}
generateHTML(filepath);
