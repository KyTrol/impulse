#!/usr/bin/node
let resolve = require("path").resolve;
let cp = require("child_process");

const client = resolve(__dirname, "./client/");

let buildProcess = cp.spawnSync("ng", ["build"], {
	env: process.env,
	cwd: client,
	stdio: "inherit"
});

process.exit(buildProcess.status);