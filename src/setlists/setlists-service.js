// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('../config');

// const SetlistsService = {

//   getSetlistsByBandId(knex, id) {
//     return knex
//       .from('street_setlists')
//       .where('band_id', id)
//       .join('street_bands', { 'street_setlists.band_id': 'street_bands.id' })
//       .select('title');
//   },

//   insertSetlist(knex, newSetlist) {
//     return knex
//       .insert(newSetlist)
//       .into('street_setlists')
//       .returning('*')
//       .then(rows => {
//         return rows[0];
//       });
//   },

//   getSetlistById(knex, id) {
//     return knex
//       .from('street_setlists')
//       .select('*')
//       .where('id', id)
//       .first();
//   },

//   deleteBand(knex, id) {
//     return knex('street_setlists')
//       .where({ id })
//       .delete();
//   },

//   updateBand(knex, id, newSetlistFields) {
//     return knex('street_setlists')
//       .where({ id })
//       .update(newSetlistFields);
//   }

// };

// module.exports = SetlistsService;