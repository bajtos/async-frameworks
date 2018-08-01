'use strict';

const supertest = require('supertest');
const db = require('../lib/db');

const apps = require('../lib/index');

before(db.connect);
after(db.close);

Object.keys(apps).forEach(name => {
  describe(`${name} app`, () => {
    it('works', async () => {
      const port = await apps[name]();
      await verify(port);
    });
  });
});

async function verify(port) {
  return supertest(`http://127.0.0.1:${port}`)
    .get('/products/4006381333931')
    .expect(200)
    .expect([{
      _id : '59eeec2b52f8816120d53cc0',
      ean : 4006381333931,
      name : 'Pencil',
    }]);
}
