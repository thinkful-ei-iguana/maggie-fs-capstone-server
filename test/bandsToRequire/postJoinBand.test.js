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
  it('responds 204 and user id is added to band members table as having joined the indicated band', () => {
    const newBandMember = {
      id: 10,
      user_id: 1,
      band_id: 1
    };
    return supertest(app)
      .post('/api/bands/1/join')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(newBandMember)
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('id');
        expect(res.body.user_id).to.eql(newBandMember.user_id);
        expect(res.body.band_id).to.eql(newBandMember.band_id);
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