const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: 'test-user-1',
      last_name: 'Test user 1',
      email: 'test1@test.com',
      password: 'password1',
    },
    {
      id: 2,
      first_name: 'test-user-2',
      last_name: 'Test user 2',
      email: 'test2@test.com',
      password: 'password2',
    },
    {
      id: 3,
      first_name: 'test-user-3',
      last_name: 'Test user 3',
      email: 'test3@test.com',
      password: 'password3',
    },
    {
      id: 4,
      first_name: 'test-user-4',
      last_name: 'Test user 4',
      email: 'test4@test.com',
      password: 'password4',
    },
  ]
}

function makeBandsArray() {
  return [
    {
      id: 1,
      band_name: 'First test band!',
      city: 'City1',
      state: 'State1',
      country: 'Country1',
      description: 'Description1',
    },
    {
      id: 2,
      band_name: 'Second test band!',
      city: 'City2',
      state: 'State2',
      country: 'Country2',
      description: 'Description2',
    },
    {
      id: 3,
      band_name: 'Third test band!',
      city: 'City3',
      state: 'State3',
      country: 'Country3',
      description: 'Description3',
    },
    {
      id: 4,
      band_name: 'Fourth test band!',
      city: 'City4',
      state: 'State4',
      country: 'Country4',
      description: 'Description4',
    },
  ]
}

function makeSongsArray() {
  return [
    {
      id: 1,
      title: 'Song1',
      artist: 'Artist1',
      duration: '3',
      band_id: 1
    },
    {
      id: 2,
      title: 'Song2',
      artist: 'Artist2',
      duration: '5',
      band_id: 1
    },
    {
      id: 3,
      title: 'Song3',
      artist: 'Artist3',
      duration: '4',
      band_id: 1
    },
    {
      id: 4,
      title: 'Song4',
      artist: 'Artist4',
      duration: '5',
      band_id: 2
    },
    {
      id: 5,
      title: 'Song5',
      artist: 'Artist5',
      duration: '3',
      band_id: 2
    },
    {
      id: 6,
      title: 'Song6',
      artist: 'Artist6',
      duration: '3',
      band_id: 3
    },
    {
      id: 7,
      title: 'Song7',
      artist: 'Artist7',
      duration: '4',
      band_id: 3
    },
  ];
}

function makeSetlistsArray() {
  return [
    {
      id: 1,
      title: 'Gig1',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 2
    },
    {
      id: 2,
      title: 'Gig2',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 4
    },
    {
      id: 3,
      title: 'Gig3',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 3
    },
    {
      id: 4,
      title: 'Gig4',
      date: '2029-01-22T00:00:00.000Z',
      total_duration: 26
    }
  ];
}

function makeBandMembersArray(user_id, band_id) {
  return [
    {
      id: 1,
      user_id: 1,
      band_id: 1
    },
    {
      id: 2,
      user_id: 2,
      band_id: 1
    },
    {
      id: 3,
      user_id: 3,
      band_id: 1
    },
    {
      id: 4,
      user_id: 4,
      band_id: 2
    },
    {
      id: 5,
      user_id: 1,
      band_id: 2
    },
    {
      id: 6,
      user_id: 2,
      band_id: 3
    },
    {
      id: 7,
      user_id: 1,
      band_id: 4
    },
    {
      id: 8,
      user_id: 2,
      band_id: 4
    },
    {
      id: 9,
      user_id: 4,
      band_id: 4
    }
  ];
}

function makeSetlistSongsArray(song_id, song_position, setlist_id, band_id) {
  return [
    {
      id: 1,
      song_id: 6,
      song_position: 0,
      setlist_id: 4,
      band_id: 3
    },
    {
      id: 2,
      song_id: 7,
      song_position: 1,
      setlist_id: 4,
      band_id: 3
    },
    {
      id: 3,
      song_id: 4,
      song_position: 2,
      setlist_id: 2,
      band_id: 2
    },
    {
      id: 4,
      song_id: 5,
      song_position: 0,
      setlist_id: 2,
      band_id: 2
    },
    {
      id: 5,
      song_id: 3,
      song_position: 0,
      setlist_id: 1,
      band_id: 1
    },
    {
      id: 6,
      song_id: 2,
      song_position: 1,
      setlist_id: 1,
      band_id: 1
    },
    {
      id: 7,
      song_id: 1,
      song_position: 2,
      setlist_id: 1,
      band_id: 1
    },
    {
      id: 8,
      song_id: 2,
      song_position: 0,
      setlist_id: 2,
      band_id: 1
    },
    {
      id: 9,
      song_id: 1,
      song_position: 1,
      setlist_id: 2,
      band_id: 1
    },
  ];
}

function makeExpectedBands(bands) {
  const listOfBands = bands.map((band) => {
    return {
      id: band.id,
      band_name: band.band_name,
      city: band.city,
      state: band.state,
      country: band.country,
      description: band.description
    }
  })
  return listOfBands;
}

function makeExpectedBand(bands, band_id) {
  const band = [];
  band.push(bands.find(band => band.id === band_id))
  const bandSerialized = band.map((bandproperty) => {
    return {
      id: bandproperty.id,
      band_name: bandproperty.band_name,
      city: bandproperty.city,
      state: bandproperty.state,
      country: bandproperty.country,
      description: bandproperty.description
    }
  })
  return bandSerialized;
}

function makeStreetBeatFixtures() {
  const testUsers = makeUsersArray()
  const testBands = makeBandsArray()
  const testSongs = makeSongsArray()
  const testSetlists = makeSetlistsArray()
  const testSetlistSongs = makeSetlistSongsArray()
  const testBandMembers = makeBandMembersArray()
  return { testUsers, testBands, testSongs, testSetlists, testSetlistSongs, testBandMembers }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      street_band_members,
      street_setlist_songs,
      street_users,
      street_setlists,
      street_songs,
      street_bands
      RESTART IDENTITY;`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('street_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('street_users_id_seq', ?)`,
        [users[users.length - 1].id]
      )
    )
}

function seedTables(db, users, bands, songs, setlists, band_members, setlist_songs) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('street_bands').insert(bands)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('street_bands_id_seq', ?)`,
      [bands[bands.length - 1].id]
    )
    if (setlists.length) {
      await trx.into('street_setlists').insert(setlists)
      await trx.raw(
        `SELECT setval('street_setlists_id_seq', ?)`,
        [setlists[setlists.length - 1].id],
      )
    }
    if (songs.length) {
      await trx.into('street_songs').insert(songs)
      await trx.raw(
        `SELECT setval('street_songs_id_seq', ?)`,
        [songs[songs.length - 1].id],
      )
    }
    if (band_members.length) {
      await trx.into('street_band_members').insert(band_members)
      await trx.raw(
        `SELECT setval('street_band_members_id_seq', ?)`,
        [band_members[band_members.length - 1].id],
      )
    }
    if (setlist_songs.length) {
      await trx.into('street_setlist_songs').insert(setlist_songs)
      await trx.raw(
        `SELECT setval('street_setlist_songs_id_seq', ?)`,
        [setlist_songs[setlist_songs.length - 1].id],
      )
    }
  })

}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.email,
    algorithm: 'HS256'
  });
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeBandsArray,
  makeSongsArray,
  makeSetlistsArray,
  makeSetlistSongsArray,
  makeBandMembersArray,
  makeExpectedBands,
  makeExpectedBand,

  makeStreetBeatFixtures,
  cleanTables,
  seedTables,
  seedUsers,
  makeAuthHeader
}