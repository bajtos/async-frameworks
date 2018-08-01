'use strict';

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/async-benchmark';

let client, products;

exports.url = url;

exports.connect = async function connect() {
  client = await MongoClient.connect(url, {useNewUrlParser: true});
  products = client.db().collection('products');
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
  await client.close();
  client = undefined;
  products = undefined;
}
