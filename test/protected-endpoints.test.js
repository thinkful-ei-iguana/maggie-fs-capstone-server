const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Protected Endpoints', function () {
  let db;

  const {
    testUsers,
    testBands,
    testSongs,
    testSetlists,
    testBandMembers,
    testSetlistSongs
  } = helpers.makeStreetBeatFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));


  beforeEach('insert', () =>
    helpers.seedTables(
      db,
      testUsers,
      testBands,
      testSongs,
      testSetlists,
      testBandMembers,
      testSetlistSongs
    )
  );

  const protectedEndpoints = [
    {
      name: 'GET /api/bands',
      path: '/api/bands',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/bands/mybands',
      path: '/api/bands/mybands',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/bands/:band_id',
      path: '/api/bands/1',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/bands/:band_id/setlists',
      path: '/api/bands/1/setlists',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/bands/:band_id/join',
      path: '/api/bands/1/join',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/bands/:band_id/bandmembers',
      path: '/api/bands/1/bandmembers',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/bands/:band_id/songs',
      path: '/api/bands/1/songs',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/bands/:band_id/songs',
      path: '/api/bands/1/songs',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/bands/:band_id/setlists/:setlist_id',
      path: '/api/bands/1/setlists/1',
      method: supertest(app).get,
    },
    {
      name: 'PATCH /api/bands/:band_id/setlists/:setlist_id',
      path: '/api/bands/1/setlists/1',
      method: supertest(app).patch,
    },
    {
      name: 'POST /api/bands/:band_id/setlists/create',
      path: '/api/bands/1/setlists/create',
      method: supertest(app).post,
    }
  ];

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it('responds with 401 \'Missing bearer token\' when no bearer token', () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: 'Missing bearer token' });
      });

      it('responds 401 Unauthorized Request when invalid JWT secret', () => {
        const validUser = testUsers[0];
        const invalidSecret = 'bad-secret';
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: 'Unauthorized Request' });
      });

      it('responds 401 \'Unauthorized request\' when invalid sub in payload', () => {
        const invalidUser = { email: 'dontexist@nothere.com', id: 1 };
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: 'Unauthorized Request' });
      });
    });
  });

});