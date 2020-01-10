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
      date: '2029-01-22T00:00:00.000Z'
    };
    return supertest(app)
      .post('/api/bands/1/setlists/create')
      .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
      .send(newSetlist)
      .expect(200)
      .expect(res => {
        console.log('res body is', res.body);
        expect(res.body).to.have.property('id');
        expect(res.body.title).to.eql(newSetlist.title);
        expect(res.body.date).to.eql(newSetlist.date);
      })
      .expect(res =>
        db
          .from('street_setlists')
          .select('*')
          .where({ id: res.body.id })
          .first()
          .then(row => {
            console.log('row is', row);
            expect(row.title).to.eql(newSetlist.title);
            expect(row.date).to.eql(newSetlist.date);
          })
      );
  });
});