'use strict';

var execSync = require('child_process').execSync;

module.exports = function treeKill(pid, signal) {
	var childs = getAllChilds(pid);

	childs.forEach(function(pid) {
		killPid(pid, signal);
	});

	killPid(pid, signal);
};

function getAllPids() {
	var rows = execSync('ps -A -o pid,ppid')
		.toString()
		.trim()
		.split('\n')
		.slice(1);

	return rows.map(function(row) {
		var parts = row.match(/\s*(\d+)\s*(\d+)/);
		return {
			pid: Number(parts[1]),
			ppid: Number(parts[2])
		};
	});
}

function getAllChilds(pid) {
	var all = getAllPids(),
		ppidHash = {},
		result = [];

	all.forEach(function(item) {
		ppidHash[item.ppid] = ppidHash[item.ppid] || [];
		ppidHash[item.ppid].push(item.pid);
	});

	var find = function(pid) {
		ppidHash[pid] = ppidHash[pid] || [];
		ppidHash[pid].forEach(function(childPid) {
			result.push(childPid);
			find(childPid);
		});
	};

	find(pid);

	return result;
}

function killPid(pid, signal) {
	try {
		process.kill(pid, signal);
	} catch (err) {
		if (err.code !== 'ESRCH') {
			throw err;
		}
	}
}
