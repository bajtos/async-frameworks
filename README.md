# async-frameworks
A benchmark comparing performance of async/await in different HTTP frameworks

 - **Express** v4.16
 - **Koa** v2.5 + koa-router v7.4
 - **Fastify** v1.8
 - **Hapi** v17.5
 - **LoopBack** v3.21
 - **LoopBack next**: core v0.11; repository v0.14; rest v0.19

## Results

MacBookPro Mid 2015
Processor: 2.5 GHz Intel Core i7
Memory: 16 GB 1600 MHz DDR3

### Requests per seconds

framework|rps
-|-:
hapi | 6029
fastify | 7926
koa | 7305
express | 5778
loopback | 3072
loopback-next | 2778

### Latency

_Time to handle a request in milliseconds._

framework|latency
-|-:
hapi | 1.14
fastify | 0.93
koa | 1.02
express | 1.2
loopback | 2.69
loopback-next | 3.16

Async/await is not the bottleneck!

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

