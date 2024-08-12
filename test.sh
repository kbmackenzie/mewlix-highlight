#!/bin/bash

rm -rf   './test/build'
mkdir -p './test/build'

TEST_CONFIG='./tsconfig.test.json'
TEST_SCRIPT='./test/build/compile/test/html.js'

STYLESHEET='<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/default.min.css">'

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

# Create HTML from script and write it to watched file.
create_html() {
  HTML_SNIPPET=$(node "$TEST_SCRIPT") || return $?
  HTML_FILE='./test/build/run/index.html'

  mkdir -p "$(dirname "$HTML_FILE")"
  touch "$HTML_FILE"

  HTML_CONTENT="
  <html>
    <head>$STYLESHEET</head>
    <body>$HTML_SNIPPET</body>
  </html>
  "
  echo "$HTML_CONTENT" > "$HTML_FILE"
}

# Start development server.
start_server() {
  SERVER_LOG='./test/build/server-log.log'
  npx http-server './test/build/run/' > "$SERVER_LOG" 2>&1
}

# Run all:
compile && create_html && start_server
