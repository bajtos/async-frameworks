# async-frameworks
A benchmark comparing performance of async/await in different HTTP frameworks

 - Express@4.16
 - Koa@2.3 + koa-router@7.2
 - Fastify@0.30
 - Hapi@17.0-rc

## Usage

Install and start MongoDB on your local machine.
Create `Products` collection in `async-benchmark` db,
create few sample records:

```
$ mongo
> use async-benchmark
switched to db async-benchmark
> db.products.insert({ean: 9780471117094, name: 'Pen'})
WriteResult({ "nInserted" : 1 })
> db.products.insert({ean: 4006381333931, name: 'Pencil'})
WriteResult({ "nInserted" : 1 })
> db.products.createIndex({ean: 1})
```

Install all dependencies.

```
$ npm install
```

Run the tests to verify the sample servers
are working correctly.

```
$ npm test
```

Run the benchmark.

```
$ npm start
```

## Results

MacBookPro Mid 2015
Processor: 2.5 GHz Intel Core i7
Memory: 16 GB 1600 MHz DDR3

Average requests per seconds:
- hapi: 6188.9
- fastify: 7800
- koa: 7334.1
- express: 6147.77

Async/await is not the bottleneck!
