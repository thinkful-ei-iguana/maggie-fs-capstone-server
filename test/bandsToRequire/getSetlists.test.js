const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers,
} = helpers.makeStreetBeatFixtures();



context('Given there are setlists in the database', () => {
  it('responds with 200 and all the setlists', () => {

    const expectedSetlists = [
      {
        id: 1,
        title: 'Gig1',
        date: '2029-01-22T00:00:00.000Z'
      },
      {
        id: 2,
        title: 'Gig2',
        date: '2029-01-22T00:00:00.000Z'
      }
    ];
    return supertest(app)
      .get('/api/bands/1/setlists')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedSetlists);
  });
});