'use strict';

const framework = process.argv[2];
const start = require(`./${framework}`);
const db = require('./db');

db.connect()
  .then(() => db.findAsync(1))
  .then(() => start())
  .then(port => console.log(port))
  .catch(err => { console.error(err); process.exit(1); });
