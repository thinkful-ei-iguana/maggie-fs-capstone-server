const knex = require('knex');
const app = require('../../src/app');
const helpers = require('../test-helpers');

const {
  testUsers
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
  it.only('responds 204 and user id is added to bandmembers table as having joined the indicated band', () => {
    const newBandMember = {
      id: 10,
      first_name: 'test-user-1',
      last_name: 'Test user 1',
      band_name: 'First test band!',
      user_id: 1,
      band_id: 1
    };
    return supertest(app)
      .post('/api/bands/1/join')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(newBandMember)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.property('id');
        expect(res.body.first_name).to.eql(newBandMember.first_name);
        expect(res.body.last_name).to.eql(newBandMember.last_name);
        expect(res.body.band_name).to.eql(newBandMember.band_name);
      })
      .expect(res =>
        db
          .from('street_band_members')
          .select('*')
          .where({ id: res.body.id })
          .first()
          .then(row => {
            expect(row.user_id).to.eql(newBandMember.user_id);
            expect(row.band_id).to.eql(newBandMember.band_id);
          })
      );
  });
});