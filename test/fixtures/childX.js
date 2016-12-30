'use strict';

var fork = require('child_process').fork,
	helpers = require('../helpers');

var pids = [];
pids.push(fork('test/fixtures/childY.js').pid);
pids.push(fork('test/fixtures/childY.js').pid);
pids.push(fork('test/fixtures/childY.js').pid);
process.send(pids);
helpers.stayAlive();
