const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const BandMembersService = {
  getBandMemberWithBandId(db, band_id) {
    return db('street_band_members')
      .where({ band_id })
      .first();
  },

  getAllBandMembers(knex) {
    return knex.select('*').from('street_band_members');
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

  getById(knex, id) {
    return knex
      .from('street_band_members')
      .select('*')
      .where('id', id)
      .first();
  },


  deleteBandMember(knex, id) {
    return knex('street_band_members')
      .where({ id })
      .delete();
  }

  // updateBandMember(knex, id, newBandMemberFields) {
  //   return knex('street_band_members')
  //     .where({ id })
  //     .update(newBandMemberFields);
  // }
};

module.exports = BandMembersService;

