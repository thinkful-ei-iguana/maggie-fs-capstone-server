const knex = require('knex');
const app = require('../../src/app');
const helpers = require('../test-helpers');

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

context('Happy path', () => {
  it('responds 204 and creates new setlist', () => {
    const newSetlist = {
      id: 5,
      title: 'Gig5',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 123
    };
    const songsToAdd = [
      {
        song_id: 1,
        title: 'Song1',
        artist: 'Artist1',
        duration: '3',
        band_id: 1
      },
      {
        song_id: 2,
        title: 'Song2',
        artist: 'Artist2',
        duration: '5',
        band_id: 1
      },
      {
        song_id: 3,
        title: 'Song3',
        artist: 'Artist3',
        duration: '4',
        band_id: 1
      },
    ];
    return supertest(app)
      .post('/api/bands/1/setlists/create')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(
        {
          newSetlist: newSetlist,
          songsToAdd: songsToAdd
        })
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.property('setlist_id');
        expect(res.body.title).to.eql(newSetlist.title);
        expect(res.body.date).to.eql(newSetlist.date);
      })
      .expect(res => {
        return db
          .from('street_setlists')
          .select('*')
          .where({ id: res.body.setlist_id })
          .first()
          .then(row => {
            expect(row.title).to.eql(newSetlist.title);
            expect(row.date).to.eql(new Date(newSetlist.date));
          });
      });
  });
});