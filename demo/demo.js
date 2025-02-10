const fs   = require('node:fs');
const path = require('node:path');
const proc = require('node:child_process');

const projectRoot  = path.resolve(__dirname, '..');

const tscConfig    = path.resolve(__dirname, '..', 'tsconfig.build.json');
const mewlixScript = path.resolve(__dirname, '..', 'dist', 'index.js');

const yarnBall     = path.resolve(__dirname, 'mewlix.mews');
const htmlOutput   = path.resolve(__dirname, 'index.html');

const stylesheet   = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css'
const generateHTML = (body) => `
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="${stylesheet}">
    <style>body { background-color: #121212; color: #fff; }</style>
  </head>
  <body><pre><code>${body}</code></pre></body>
</html>
`;

console.log('Compiling .ts files...');
proc.spawnSync('tsc', ['-p', tscConfig], { cwd: projectRoot });

// Highlight logic:
const hljs = require('highlight.js');
const { mewlix } = require(mewlixScript);

hljs.registerLanguage('mewlix', mewlix);

const body = hljs.highlight(
  fs.readFileSync(yarnBall).toString(),
  { language: 'mewlix' },
).value;

fs.rmSync(htmlOutput);
fs.writeFileSync(
  htmlOutput,
  generateHTML(body),
);

console.log('Running demo server...');
proc.spawnSync('npx', ['http-server', __dirname, '-o'], { cwd: __dirname });
