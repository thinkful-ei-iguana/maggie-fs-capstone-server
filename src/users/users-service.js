const bcrypt = require('bcryptjs');
const xss = require('xss');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;

const UsersService = {

  hasUserWithUserName(db, email) {
    return db('street_users')
      .where({ email })
      .first()
      .then(user => !!user);
  },
  getAllUsers(knex) {
    return knex.select('*').from('street_users');
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('street_users')
      .returning('*')
      .then(([user]) => user);
  },
  getById(knex, id) {
    return knex
      .from('street_users')
      .select('*')
      .where('id', id)
      .first();
  },

  getMembersByBandId(knex, id) {
    return knex
      .from('street_band_members')
      .where('band_id', id)
      .join('street_users', { 'street_band_members.band_id': 'street_users.id' })
      .select('first_name', 'last_name');
  },
  deleteUser(knex, id) {
    return knex('street_users')
      .where({ id })
      .delete();
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      email: xss(user.email),
      password: xss(user.password) // is this right?
    };
  }
};

module.exports = UsersService;