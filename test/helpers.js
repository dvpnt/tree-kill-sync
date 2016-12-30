'use strict';

var fork = require('child_process').fork,
	expect = require('expect.js');

exports.stayAlive = function() {
	setInterval(function() {}, 10000);
};

exports.spawnTree = function(callback) {
	var root = fork('test/fixtures/root.js');
	root.on('message', function(pids) {
		callback(null, root, pids);
	});
};

exports.checkPid = function(pid) {
	try {
		process.kill(pid);
	} catch (err) {
		return expect(err.code).to.eql('ESRCH');
	}

	expect().fail('expect ' + pid + ' to be dead');
};

exports.waitForDead = function(pid, callback) {
	var id = setInterval(function() {
		try {
			process.kill(pid, 'SIGCHLD');
		} catch (err) {
			if (err.code === 'ESRCH') {
				clearInterval(id);
				callback();
			}
		}
	}, 50);
};
