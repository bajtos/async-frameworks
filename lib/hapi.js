'use strict';

const db = require('./db');
const promisify = require('util').promisify;

const Hapi = require('hapi');
const server = new Hapi.Server({port: 0});

server.route({
  method: 'GET',
  path: '/products/{ean}',
  handler: async function(req) {
    const ean = +req.params.ean;
    const result = await db.findAsync(ean);
    return result;
  }
});

module.exports = async function start() {
  await server.start();
  return server.info.port;
};

