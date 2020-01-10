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

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

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
    console.log('GET /api/bands');
    require('./bandsToRequire/getBands.test');
  });

  describe('POST /api/bands', () => {
    console.log('POST /api/bands');
    require('./bandsToRequire/postBands.test');
  });

  describe('GET /api/bands/mybands', () => {
    console.log('/GET api/bands/mybands');
    require('./bandsToRequire/getMyBands.test');
  });

  describe('GET /api/bands/:band_id', () => {
    console.log('GET /api/bands/:band_id');
    require('./bandsToRequire/getBand.test');
  });

  describe('GET /api/bands/:band_id/setlists', () => {
    console.log('GET /api/bands/:band_id/setlists');
    require('./bandsToRequire/getSetlists.test');
  });

  describe('POST /api/bands/:band_id/join', () => {
    console.log('POST /api/bands/:band_id/join');
    require('./bandsToRequire/postJoinBand.test');
  });

  describe('GET /api/bands/:band_id/bandmembers', () => {
    console.log('GET /api/bands/:band_id/bandmembers');
    require('./bandsToRequire/getBandMembers.test');
  });

  describe('GET /api/bands/:band_id/songs', () => {
    console.log('GET /api/bands/:band_id/songs');
    require('./bandsToRequire/getSongs.test');
  });

  describe('POST /api/bands/:band_id/songs', () => {
    console.log('POST /api/bands/:band_id/songs');
    require('./bandsToRequire/postSongs.test');
  });

  describe('GET /api/bands/:band_id/setlists/:setlist_id', () => {
    console.log('GET /api/bands/:band_id/setlists/:setlist_id');
    require('./bandsToRequire/getSetlist.test');
  });

  describe('PATCH /api/bands/:band_id/setlists/:setlist_id', () => {
    console.log('PATCH /api/bands/:band_id/setlists/:setlist_id');
  });

  describe('POST /api/bands/:band_id/setlists/create', () => {
    console.log('POST /api/bands/:band_id/setlists/create');
    require('./bandsToRequire/postSetlist.test');
  });


}); // end

// GET api/bands/
// POST api/bands/
// GET api/bands/mybands
// GET api/bands/:band_id
// GET api/bands/:band_id/setlists
// POST api/bands/:band_id/join
// GET api/bands/:band_id/bandmembers
// GET api/bands/:band_id/songs
// POST api/bands/:band_id/songs
// GET api/bands/:band_id/setlists/:setlist_id
// PATCH api/bands/:band_id/setlists/:setlist_id
// POST api/bands/:band_id/setlists/create
