const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', function () {
  let db;

  const { testUsers } = helpers.makeStreetBeatFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/auth/login', () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    );

    it('responds 400 invalid email or password when bad email', () => {
      const userInvalidUser = { email: 'user-not', password: 'existy' };
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, { error: 'Incorrect email or password' });
    });

    it('responds 400 invalid email or password when bad password', () => {
      const userInvalidPass = { email: testUser.email, password: 'incorrect' };
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPass)
        .expect(400, { error: 'Incorrect email or password' });
    });

    const AuthService = require('../src/auth/auth-service');
    it('responds 200 and JWT auth token using secret when valid credentials', () => {
      const userValidCreds = {
        email: testUser.email,
        password: testUser.password,
      };

      let expectedToken = AuthService.createJwt(userValidCreds.email, { id: testUser.id });

      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
          id: testUser.id
        });
    });
  });

});