'use strict';

const db = require('./db');
const promisify = require('util').promisify;

const app = require('express')();
app.get('/products/:ean', (req, res, next) => {
  const ean = +req.params.ean;
  db.findCb(ean, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

exports.start = promisify(function start(cb) {
  app.listen(0, function() { cb(null, this.address().port); });
});

