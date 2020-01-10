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
  it.only('responds 204 and adds the new band', () => {
    const newBand = {
      id: 9,
      band_name: 'Nine test band!',
      city: 'City9',
      state: 'State9',
      country: 'Country9',
      description: 'Description9',
    };
    return supertest(app)
      .post('/api/bands')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(newBand)
      .expect(201)
      .expect(res => {
        expect(res.body).to.have.property('id');
        expect(res.body.band_name).to.eql(newBand.band_name);
        expect(res.body.city).to.eql(newBand.city);
        expect(res.body.state).to.eql(newBand.state);
        expect(res.body.country).to.eql(newBand.country);
        expect(res.body.description).to.eql(newBand.description);
      })
      .expect(res =>
        db
          .from('street_bands')
          .select('*')
          .where({ id: res.body.id })
          .first()
          .then(row => {
            expect(row.band_name).to.eql(newBand.band_name);
            expect(row.city).to.eql(newBand.city);
            expect(row.state).to.eql(newBand.state);
            expect(row.country).to.eql(newBand.country);
            expect(row.description).to.eql(newBand.description);
          })
      );
  });
});