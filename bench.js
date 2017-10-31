'use strict';

const spawn = require('child_process').spawn;
const byline = require('byline');
const autocannon = require('autocannon');
const apps = require('./lib/index');

main().then(
  () => console.log('done'),
  err => console.error(err));

async function main() {
  const reqsPerSec = {};
  const latency = {};
  for (const framework in apps) {
    const r = await runBenchmark(framework);
    reqsPerSec[framework] = r.requests.average;
    latency[framework] = r.latency.average;
    await sleep(1);
    gc && gc();
    await sleep(1);
  }
  console.log('Requests per second', reqsPerSec);
  console.log('Latency', latency);
}

async function runBenchmark(framework) {
  console.log(`Benchmarking ${framework}`);
  const {worker, port} = await startWorker(framework);

  const c = autocannon({
    url: `http://127.0.0.1:${port}/products/4006381333931`,
    duration: 30 /*seconds*/,
    title: framework,
  });

  const results = await new Promise(resolve => c.on('done', resolve));
  worker.kill();
  return results;
};

function startWorker(framework) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [require.resolve('./lib/worker'), framework],
      {stdio: ['pipe', 'pipe', 'inherit']});

    child.once('error', reject);
    child.once('exit', (code, signal) =>
      reject(new Error(`Child exited with code ${code} signal ${signal}`)));

    const reader = byline.createStream(child.stdout);
    reader.once('data', data => resolve({worker: child, port: +data}));
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
