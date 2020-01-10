const knex = require('knex');
const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers,
  testBands
} = helpers.makeStreetBeatFixtures();



context('Given there are bands in the database', () => {
  it('responds with 200 and all the bands', () => {

    const expectedBands = helpers.makeExpectedBands(
      testBands
    );
    return supertest(app)
      .get('/api/bands')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedBands);
  });
});