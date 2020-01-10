const knex = require('knex');
const app = require('../../src/app');
const helpers = require('../test-helpers');

const { assert } = require('chai');

const {
  testUsers,
} = helpers.makeStreetBeatFixtures();

let db;
before('make knex instance', () => {
  db = knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
  app.set('db', db);
});


context('Given there are bands in the database', () => {
  it('responds with 200 and all bands that the user is in', () => {

    const expectedBands = [
      {
        band_name: 'First test band!',
        id: 1
      },
      {
        band_name: 'Second test band!',
        id: 2
      },
      {
        band_name: 'Fourth test band!',
        id: 4
      },
    ];

    let prom = supertest(app)
      .get('/api/bands/mybands')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]));

    return prom
      .send()
      .then((response) => {
        assert.equal(200, response.statusCode);
        assert.deepEqual(response.body, expectedBands);
      });
  });
});