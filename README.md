Mewlix syntax highlighter definition for [Highlight.js](https://www.npmjs.com/package/highlight.js). 🐈

Mewlix is a cat-themed esoteric programming language! [Learn more here](https://kbmackenzie.xyz/projects/mewlix)!

## Installation

```bash
npm install mewlix
```

## Usage

```typescript
import hljs from 'highlight.js';
import { mewlix } from 'mewlix';

hljs.registerLanguage('mewlix', mewlix);
```
