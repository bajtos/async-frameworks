import { get, param, RestApplication, RestBindings } from '@loopback/rest';
import { inject } from '../node_modules/@loopback/core';
import { DefaultCrudRepository, Entity, juggler, model, property, RepositoryMixin, repository } from '../node_modules/@loopback/repository';

const dbConfig = {
  connector: 'mongodb',
  url: require('../lib/db').url,
};

class DbDataSource extends juggler.DataSource {
  static dataSourceName = 'db';

  constructor(
    @inject('datasources.config.db', { optional: true })
    dsConfig: object = dbConfig,
  ) {
    super(dsConfig);
  }
}

@model({
  settings: {
    mongodb: {
      collection: 'products',
    },
  }
})
class Product extends Entity {
  @property({ id: true })
  _id: string

  @property({ required: true })
  ean: number;

  @property({ required: true })
  name: string;

  getId() {
    return this._id;
  }
}

class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype._id
  > {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Product, datasource);
  }
}

class ProductController {
  constructor(
    @repository(ProductRepository)
    protected repo: ProductRepository,
  ) { }

  @get('/products/{ean}')
  findByEan(
    @param.path.number('ean')
    ean: number
  ) {
    return this.repo.find({where: {ean}});
  }
}

class BenchApp extends RepositoryMixin(RestApplication) {
  constructor() {
    super({
      rest: { port: 0 },
    });

    this.bind('datasources.config.db').to(dbConfig);
    this.dataSource(DbDataSource);
    this.repository(ProductRepository);
    this.controller(ProductController);
  }
}

const app = new BenchApp();

export async function start() {
  await app.start();
  return app.restServer.get(RestBindings.PORT);
}
