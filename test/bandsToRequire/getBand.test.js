const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers,
} = helpers.makeStreetBeatFixtures();



context('Given there are bands in the database', () => {
  it('responds with 200 and the selected band', () => {

    const expectedBand = {
      id: 1,
      band_name: 'First test band!',
      city: 'City1',
      state: 'State1',
      country: 'Country1',
      description: 'Description1',
    };

    return supertest(app)
      .get('/api/bands/1')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedBand);
  });
});