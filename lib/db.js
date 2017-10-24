'use strict';

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/async-benchmark';

let db, products;

exports.connect = async function connect() {
  db = await MongoClient.connect(url);
  products = db.collection('products');
}

exports.findAsync = async function findAsync(ean) {
  assert(
    typeof ean === 'number',
    `ean must be a number, got ${JSON.stringify(ean)} instead`);
  return products.find({ean: ean}).toArray();
};

exports.findCb = function findCb(ean, cb) {
  assert(
    typeof ean === 'number',
    `ean must be a number, got ${JSON.stringify(ean)} instead`);
  products.find({ean: ean}).toArray(cb);
};

exports.close = async function() {
  await db.close();
  db = undefined;
  products = undefined;
}
