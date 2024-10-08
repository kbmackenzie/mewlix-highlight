#!/bin/bash

rm -rf   './test/build'
mkdir -p './test/build'

TEST_CONFIG='./tsconfig.test.json'
TEST_SCRIPT='./test/build/compile/test/html.js'

STYLESHEET='<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css">'

# Write a log message to stdout.
log_message() {
  echo "[test.sh] $1"
}

# Write an error message to stderr.
log_error() {
  echo "[test.sh] $1" 1>&2
}

# Compile test scripts.
compile() {
  npx tsc -p "$TEST_CONFIG" && npx tsc-alias -fp "$TEST_CONFIG"
}

# Generate HTML snippet by running test script:
generate_snippet() {
  MEWLIX_INPUT="$(realpath './test/mewlix.mews')"
  node "$TEST_SCRIPT" "$MEWLIX_INPUT"
}

# Create HTML from script and write it to watched file.
create_html() {
  HTML_SNIPPET=$(generate_snippet) || return $?
  HTML_FILE='./test/build/run/index.html'

  mkdir -p "$(dirname "$HTML_FILE")"
  touch "$HTML_FILE"

  HTML_CONTENT="
  <!doctype html>
  <html>
    <head>
      $STYLESHEET
      <style>body { background-color: #121212; color: #fff; }</style>
    </head>
    <body><pre><code>$HTML_SNIPPET</code></pre></body>
  </html>
  "
  echo "$HTML_CONTENT" > "$HTML_FILE"
}

# Start development server.
start_server() {
  log_message 'Running test server...'
  SERVER_LOG='./test/build/server-log.log'
  npx http-server './test/build/run/' -o > "$SERVER_LOG" 2>&1
}

# Run all:
compile && create_html && start_server
