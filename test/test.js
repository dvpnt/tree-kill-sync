'use strict';

var expect = require('expect.js'),
	helpers = require('./helpers'),
	treeKillSync = require('../');

describe('tree-kill-sync', function() {
	it('should kill tree', function(done) {
		helpers.spawnTree(function(err, root, childPids) {
			var total = 0;
			treeKillSync(root.pid);
			[root.pid].concat(childPids).forEach(function(pid) {
				helpers.waitForDead(pid, function() {
					total++;
					if (total === childPids.length + 1) {
						done();
					}
				});
			});
		});
	});

	it('should be ok with already dead pid', function(done) {
		helpers.spawnTree(function(err, root, childPids) {
			root.on('exit', function() {
				treeKillSync(root.pid);
				done();
			});
			process.kill(childPids[0]);
			helpers.waitForDead(childPids[0], function() {
				treeKillSync(root.pid);
			});
		});
	});

	it('should rethrow process.kill error', function(done) {
		helpers.spawnTree(function(err, root) {
			expect(function() {
				treeKillSync(root.pid, 'SIGBLAH');
			}).to.throwError(/Unknown signal: SIGBLAH/);

			treeKillSync(root.pid);
			done();
		});
	});
});
