'use strict';

var fork = require('child_process').fork;

exports.stayAlive = function() {
	setInterval(function() {}, 10000);
};

exports.spawnTree = function(callback) {
	var root = fork('test/fixtures/root.js');
	root.on('message', function(pids) {
		callback(null, root, pids);
	});
};

exports.waitForDead = function(pid, callback) {
	var id = setInterval(function() {
		try {
			process.kill(pid, 0);
		} catch (err) {
			if (err.code === 'ESRCH') {
				clearInterval(id);
				callback();
			}
		}
	}, 50);
};
