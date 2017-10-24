'use strict';

const db = require('./db');
const promisify = require('util').promisify;

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 0
});


server.route({
  method: 'GET',
  path: '/products/{ean}',
  handler: async function(req, reply) {
    const ean = +req.params.ean;
    const result = await db.findAsync(ean);
    reply(result);
  }
});

module.exports = promisify(function start(cb) {
  server.start(() => cb(null, server.listener.address().port));
});

