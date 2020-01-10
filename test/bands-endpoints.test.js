const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Bands Endpoints', function () {
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

  after('disconnect from db', () => {
    return db.destroy();
  });

  before('cleanup', () => {
    return helpers.cleanTables(db);
  });

  afterEach('cleanup', () => {
    return helpers.cleanTables(db);
  });

  beforeEach('insert', () => {
    return helpers.seedTables(
      db,
      testUsers,
      testBands,
      testSongs,
      testSetlists,
      testBandMembers,
      testSetlistSongs
    );
  }
  );

  describe('GET /api/bands', () => {
    require('./bandsToRequire/getBands.test');
  });

  describe('POST /api/bands', () => {
    require('./bandsToRequire/postBands.test');
  });

  describe('GET /api/bands/mybands', () => {
    require('./bandsToRequire/getMyBands.test');
  });

  describe('GET /api/bands/:band_id', () => {
    require('./bandsToRequire/getBand.test');
  });

  describe('GET /api/bands/:band_id/setlists', () => {
    require('./bandsToRequire/getSetlists.test');
  });

  describe('POST /api/bands/:band_id/join', () => {
    require('./bandsToRequire/postJoinBand.test');
  });

  describe('GET /api/bands/:band_id/bandmembers', () => {
    require('./bandsToRequire/getBandMembers.test');
  });

  describe('GET /api/bands/:band_id/songs', () => {
    require('./bandsToRequire/getSongs.test');
  });

  describe('POST /api/bands/:band_id/songs', () => {
    require('./bandsToRequire/postSongs.test');
  });

  describe('GET /api/bands/:band_id/setlists/:setlist_id', () => {
    require('./bandsToRequire/getSetlist.test');
  });

  describe('POST /api/bands/:band_id/setlists/create', () => {
    require('./bandsToRequire/postSetlist.test');
  });
});