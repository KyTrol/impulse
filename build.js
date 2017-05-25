#!/usr/bin/node

const resolve = require('path').resolve;
const cp = require('child_process');

const client = resolve(__dirname, './client/');

const buildProcess = cp.spawnSync('ng', ['build'], {
  env: process.env,
  cwd: client,
  stdio: 'inherit'
});

process.exit(buildProcess.status);
