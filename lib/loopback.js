'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;

const app = loopback();
app.use(loopback.rest());

module.exports = promisify(function start(cb) {
  app.listen(0, function() { cb(null, this.address().port); });
});

/** Setup Product model and MongoDB connection **/

const Product = app.registry.createModel({
  name: 'Product',
  properties: {
    _id: {type: String, id: true},
    ean: {type: Number, required: true},
    name: {type: String, required: true},
  },
  mongodb: {
    collection: 'products',
  },
});

app.dataSource('db', {
  connector: 'mongodb',
  useNewUrlParser: true,
  url: require('./db').url,
});

app.model(Product, {dataSource: 'db'});

/** Setup REST API **/

Product.findByEan = function(ean) {
  return this.find({where: {ean}});
};

Product.remoteMethod('findByEan', {
  accepts: {arg: 'ean', type: 'number', required: true},
  returns: {arg: 'result', type: Product, root: true},
  http: {verb: 'get', path: '/:ean'}
});

Product.disableRemoteMethodByName('findById');
