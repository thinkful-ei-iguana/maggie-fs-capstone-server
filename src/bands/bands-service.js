const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const BandsService = {
  getBandWithBandName(db, band_name) {
    return db('street_bands')
      .where({ band_name })
      .first();
  },

  getAllBands(knex) {
    return knex.select('*').from('street_bands');
  },

  insertBand(knex, newBand) {
    return knex
      .insert(newBand)
      .into('street_bands')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('street_bands')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteBand(knex, id) {
    return knex('street_bands')
      .where({ id })
      .delete();
  },

  updateBand(knex, id, newBandFields) {
    return knex('street_bands')
      .where({ id })
      .update(newBandFields);
  }
};

module.exports = BandsService;

