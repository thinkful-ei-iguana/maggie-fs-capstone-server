const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers
} = helpers.makeStreetBeatFixtures();



context('Given there are bandmembers in the database', () => {
  it('responds with 200 and the members of the active band', () => {

    const expectedBandMembers =
      [
        {
          id: 1,
          first_name: 'test-user-1',
          last_name: 'Test user 1',
          band_name: 'First test band!'
        },
        {
          id: 2,
          first_name: 'test-user-2',
          last_name: 'Test user 2',
          band_name: 'First test band!'
        },
        {
          id: 3,
          first_name: 'test-user-3',
          last_name: 'Test user 3',
          band_name: 'First test band!'
        },
      ];

    return supertest(app)
      .get('/api/bands/1/bandmembers')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedBandMembers);
  });
});