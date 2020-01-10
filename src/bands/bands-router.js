const path = require('path');
const express = require('express');
const xss = require('xss');
const BandsService = require('./bands-service');
const requireAuth = require('../middleware/jwt-auth');

const bandsRouter = express.Router();
const jsonParser = express.json();

const serializeBand = (band) => {
  return {
    ...band
  }
};

bandsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getAllBands(knexInstance)
      .then(bands => {
        if (req.query.q) {
          const filterResults = bands.filter((band) => {
            return band.band_name.toLowerCase().includes(req.query.q.toLowerCase());
          });
          res.json(filterResults.map(serializeBand));
        } else {
          res.json(bands.map(serializeBand));
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .post(jsonParser, requireAuth, (req, res, next) => {
    const { band_name, city, state, country, description } = req.body;
    const newBand = { band_name, city, state, country, description };

    for (const [key, value] of Object.entries(newBand))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });

    BandsService.insertBand(
      req.app.get('db'),
      newBand
    )
      .then(band => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${band.id}`))
          .json(serializeBand(band));
      })
      .catch(next);
  });

bandsRouter
  .route('/mybands')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getBandsByUserId(knexInstance, req.user.id)
      .then(bands => {
        res.json(bands);
      })
      .catch((err) => {
        next(err);
      });
  });

bandsRouter
  .route('/:band_id')
  .all(requireAuth, (req, res, next) => {
    BandsService.getById(
      req.app.get('db'),
      req.params.band_id
    )
      .then(band => {
        if (!band) {
          return res.status(404).json({
            error: { message: 'Band doesn\'t exist' }
          });
        }
        res.band = band;
        next();
      })
      .catch(next);
  })
  .get(requireAuth, (req, res, next) => {
    res.json(serializeBand(res.band));
  });

bandsRouter
  .route('/:band_id/setlists')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getSetlistsByBandId(knexInstance, req.params.band_id)
      .then(setlists => {
        res.json(setlists);
      })
      .catch((err) => {
        next(err);
      });
  });

bandsRouter
  .post('/:band_id/join', jsonParser, requireAuth, (req, res, next) => {
    const newBandMember = { band_id: req.params.band_id, user_id: req.user.id };

    for (const [key, value] of Object.entries(newBandMember)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
      }
    }

    const knexInstance = req.app.get('db');
    BandsService.getMembersByBandId(knexInstance, req.params.band_id)
      .then(members => {
        let foundMember = members.find((member) => {
          return member.id === newBandMember.user_id;
        })
        if (foundMember) {
          res
            .status(200)
            .location(path.posix.join(req.originalUrl, `/${foundMember.id}`))
            .json({
              id: foundMember.id,
              error: { message: `${foundMember.first_name} has already joined this band.` },
              first_name: foundMember.first_name,
              last_name: foundMember.last_name,
              band_name: foundMember.band_name
            });
        }
        else {
          BandsService.insertBandMember(
            knexInstance,
            newBandMember
          ).then(member => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${member.id}`))
              .json({
                user_id: member.id,
                band_id: member.band_id
              });
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  });


bandsRouter
  .route('/:band_id/bandmembers')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getMembersByBandId(knexInstance, req.params.band_id)
      .then(members => {
        res.json(members);
      })
      .catch((err) => {
        next(err);
      });
  })

bandsRouter
  .route('/:band_id/songs')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getSongsByBandId(knexInstance, req.params.band_id)
      .then(songs => {
        res.json(songs);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post(jsonParser, requireAuth, (req, res, next) => {
    const { band_id, title, artist, duration } = req.body;
    const newSong = { band_id, title, artist, duration };
    ; for (const [key, value] of Object.entries(newSong))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
    BandsService.insertSong(
      req.app.get('db'),
      newSong
    )
      .then(song => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${song.id}`))
          .json(song);

      })
      .catch(next);
  });

bandsRouter
  .route('/:band_id/setlists/:setlist_id')
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getSetlistById(knexInstance, req.params.setlist_id)
      .then(setlist => {
        setlist = setlist.sort((song1, song2) => { return song1.song_position - song2.song_position });
        res.json(setlist);
      })
      .catch((err) => {
        next(err);
      });
  });

bandsRouter
  .route('/:band_id/setlists/create')
  .post(jsonParser, requireAuth, (req, res, next) => {
    const newSetlist = req.body.newSetlist;
    BandsService.insertSetlist(req.app.get('db'), newSetlist)
      .then((setlist) => {
        const songsToAdd = req.body.songsToAdd;
        for (let i = 0; i < songsToAdd.length; i++) {
          if (!songsToAdd[i].song_id || !songsToAdd[i].band_id) {
            return res.status(400).json({
              error: { message: `Missing ${key} in request body` }
            });
          }
        }
        // adds each song to the db in order, waiting for the previous db write to succeed before writing the next song
        let updates = Promise.resolve();
        for (let i = 0; i < songsToAdd.length; ++i) {
          // the line below is like += for promises
          updates = updates.then(() => {
            return BandsService.updateSetlist(
              req.app.get('db'),
              songsToAdd[i].song_id,
              setlist.id,
              songsToAdd[i].band_id,
              i
            );
          });
        }
        return updates
          .then(() => {
            return setlist;
          });
      })
      .then((setlist) => {
        res
          .status(200)
          .json({
            setlist_id: setlist.id,
            title: setlist.title,
            date: setlist.date,
          });
      })
      .catch(next);
  });


module.exports = bandsRouter;