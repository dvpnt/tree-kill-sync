'use strict';

var fork = require('child_process').fork,
	helpers = require('../helpers');

var total = 0,
	pids = [];

function onMessage(childPids) {
	total++;
	pids = pids.concat(childPids);
	if (total === 2) {
		process.send(pids);
	}
}

fork('test/fixtures/childX.js').on('message', onMessage);
fork('test/fixtures/childX.js').on('message', onMessage);
helpers.stayAlive();
