const BandsService = {

  deleteBand(knex, id) {
    return knex('street_bands')
      .where({ id })
      .delete();
  },

  deleteSetlist(knex, id) {
    return knex('street_setlists')
      .where({ id })
      .delete();
  },

  getAllBands(knex) {
    return knex
      .select('*')
      .from('street_bands');
  },

  getBandWithBandName(db, band_name) {
    return db('street_bands')
      .where({ band_name })
      .first();
  },

  getBandsByUserId(knex, id) {
    return knex
      .from('street_band_members')
      .where('user_id', id)
      .join('street_bands', { 'street_band_members.band_id': 'street_bands.id' })
      .select('street_bands.band_name', 'street_bands.id');
  },

  getById(knex, id) {
    return knex
      .from('street_bands')
      .select('*')
      .where('street_bands.id', id)
      .first();
  },

  getMembersByBandId(knex, id) {
    return knex
      .from('street_band_members')
      .where('street_band_members.band_id', id)
      .join('street_users', { 'street_band_members.user_id': 'street_users.id' })
      .join('street_bands', { 'street_band_members.band_id': 'street_bands.id' })
      .select('street_users.id', 'street_users.first_name', 'street_users.last_name', 'street_bands.band_name')
      .catch((err) => {
        throw err;
      });
  },

  getSetlistById(knex, id) {
    return knex
      .from('street_setlist_songs AS sss')
      .where('sss.setlist_id', id)
      .leftJoin('street_setlists', { 'sss.setlist_id': 'street_setlists.id' })
      .leftJoin('street_songs', { 'sss.song_id': 'street_songs.id' })
      .select('street_setlists.title AS setlist_title',
        'street_setlists.date',
        'street_setlists.total_duration',
        'street_songs.title',
        'street_songs.artist',
        'street_songs.duration',
        'sss.song_position'
      )
      .catch((err) => {
        throw err;
      });
  },

  getSetlistsByBandId(knex, id) {
    return knex
      .from('street_setlist_songs')
      .where('street_setlist_songs.band_id', id)
      .join('street_setlists', { 'street_setlist_songs.setlist_id': 'street_setlists.id' })
      .distinct('street_setlists.title', 'street_setlists.date', 'street_setlists.id');
  },

  getSongIdByTitle(knex, songTitle) {
    return knex
      .from('street_songs')
      .select('street_songs.id')
      .where('street_songs.title', songTitle);
  },

  getSongsByBandId(knex, id) {
    return knex
      .from('street_songs')
      .where('street_songs.band_id', id)
      .select('street_songs.title', 'street_songs.artist', 'street_songs.duration', 'street_songs.band_id', 'street_songs.id');
  },

  insertBand(knex, newBand) {
    return knex
      .insert(newBand)
      .into('street_bands')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
      .catch((err) => {
        throw err;
      });
  },

  insertBandMember(knex, newBandMember) {
    return knex
      .insert(newBandMember)
      .into('street_band_members')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  insertSetlist(knex, newSetlist) {
    return knex
      .insert(newSetlist)
      .into('street_setlists')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
      .catch((err) => {
        throw err;
      });
  },

  insertSong(knex, newSong) {
    return knex
      .insert(newSong)
      .into('street_songs')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  updateBand(knex, id, newBandFields) {
    return knex('street_bands')
      .where({ id })
      .update(newBandFields);
  },

  updateSetlist(knex, song_id, setlist_id, band_id, song_position) {
    return knex
      .insert({
        song_id: song_id,
        setlist_id: setlist_id,
        band_id: band_id,
        song_position: song_position
      })
      .into('street_setlist_songs')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = BandsService;

