const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers,
} = helpers.makeStreetBeatFixtures();



context('Given there are setlists in the database', () => {
  it('responds with 200 and the selected setlist', () => {
    let setlist = {
      id: 1,
      title: 'Gig1',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 2
    };
    let expectedSetlist = [
      {
        setlist_title: setlist.title,
        date: setlist.date,
        total_duration: setlist.total_duration,
        title: 'Song1',
        artist: 'Artist1',
        duration: '3',
        song_position: 2
      },
      {
        setlist_title: setlist.title,
        date: setlist.date,
        total_duration: setlist.total_duration,
        title: 'Song2',
        artist: 'Artist2',
        duration: '5',
        song_position: 1
      },
      {
        setlist_title: setlist.title,
        date: setlist.date,
        total_duration: setlist.total_duration,
        title: 'Song3',
        artist: 'Artist3',
        duration: '4',
        song_position: 0
      },
    ].sort((song1, song2) => {
      return song1.song_position - song2.song_position;
    });

    return supertest(app)
      .get('/api/bands/1/setlists/1')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .expect(200, expectedSetlist);
  });
});