# tree-kill-sync
[![Build Status](https://api.travis-ci.org/dvpnt/tree-kill-sync.svg)](https://travis-ci.org/dvpnt/tree-kill-sync)
[![Coverage Status](https://coveralls.io/repos/github/dvpnt/tree-kill-sync/badge.svg?branch=master)](https://coveralls.io/github/dvpnt/tree-kill-sync?branch=master)
[![NPM Version](https://img.shields.io/npm/v/tree-kill-sync.svg)](https://www.npmjs.com/package/tree-kill-sync)

Synchronous version of [tree-kill](https://github.com/pkrumins/node-tree-kill)

Supported platforms: Linux, Darwin/OSX.

## Install
```bash
$ npm i tree-kill-sync
```

## API

### `treeKillSync(pid, [signal])`
Sends signal `signal` to all children processes of the process with pid `pid`, including pid. Signal defaults to SIGTERM.


## License

[The MIT License](https://raw.githubusercontent.com/dvpnt/tree-kill-sync/master/LICENSE)
