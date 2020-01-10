const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers,
} = helpers.makeStreetBeatFixtures();



context('Given there are songs in the database', () => {
  it('responds with 200 and all the songs', () => {

    const expectedSongs =
      [
        {
          id: 1,
          title: 'Song1',
          artist: 'Artist1',
          duration: '3',
          band_id: 1
        },
        {
          id: 2,
          title: 'Song2',
          artist: 'Artist2',
          duration: '5',
          band_id: 1
        },
        {
          id: 3,
          title: 'Song3',
          artist: 'Artist3',
          duration: '4',
          band_id: 1
        }
      ];

    return supertest(app)
      .get('/api/bands/1/songs')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedSongs);
  });
});