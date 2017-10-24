'use strict';

const db = require('./db');
const promisify = require('util').promisify;

const app = require('fastify')({ logger: { level: 'error' }});

app.route({
  method: 'GET',
  path: '/products/:ean',
  handler: async function(req, res) {
    const ean = +req.params.ean;
    const result = await db.findAsync(ean);
    res.send(result);
  }
});

module.exports = promisify(function start(cb) {
  app.listen(0, function() { cb(null, app.server.address().port); });
});

