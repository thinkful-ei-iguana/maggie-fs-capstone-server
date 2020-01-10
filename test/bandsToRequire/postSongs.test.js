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
  it('responds 204 and creates new song', () => {
    const newSong = {
      id: 8,
      title: 'Song8',
      artist: 'Artist8',
      duration: '3',
      band_id: 1
    };
    return supertest(app)
      .post('/api/bands/1/songs')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(newSong)
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('id');
        expect(res.body.title).to.eql(newSong.title);
        expect(res.body.artist).to.eql(newSong.artist);
        expect(res.body.duration).to.eql(newSong.duration);
        expect(res.body.band_id).to.eql(newSong.band_id);
      })
      .expect(res =>
        db
          .from('street_songs')
          .select('*')
          .where({ id: res.body.id })
          .first()
          .then(row => {
            expect(row.title).to.eql(newSong.title);
            expect(row.artist).to.eql(newSong.artist);
            expect(row.duration).to.eql(newSong.duration);
            expect(row.band_id).to.eql(newSong.band_id);
          })
      );
  });
});