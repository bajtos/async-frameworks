'use strict';

const db = require('./db');
const promisify = require('util').promisify;

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

router.get('/products/:ean', async function(ctx, next) {
  const ean = +ctx.params.ean;
  const result = await db.findAsync(ean);
  ctx.body = result;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

exports.start = promisify(function start(cb) {
  app.listen(0, function() { cb(null, this.address().port); });
});

