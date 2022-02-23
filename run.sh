#!/usr/bin/env bash

set -eu

openssl genrsa -out private.pem 4096

openssl rsa -in private.pem -pubout > public.pem

[ ! -d "node_modules" ] && npm install

node index.js