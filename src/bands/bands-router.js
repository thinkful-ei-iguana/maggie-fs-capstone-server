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
  })
// .delete(requireAuth, (req, res, next) => {
//   BandsService.deleteBand(
//     req.app.get('db'),
//     req.params.band_id
//   )
//     .then(numRowsAffected => {
//       res.status(204).end();
//     })
//     .catch(next);
// })
// .patch(jsonParser, requireAuth, (req, res, next) => {
//   const { id, band_name, city, state, country, description } = req.body;
//   const bandToUpdate = { id, band_name, city, state, country, description };

//   const numberOfValues = Object.values(bandToUpdate).filter(Boolean).length;
//   if (numberOfValues === 0) {
//     return res.status(400).json({
//       error: {
//         message: 'Request body must contain either \'description\' or \'band_name\''
//       }
//     });
//   }

//   BandsService.updateBand(
//     req.app.get('db'),
//     req.params.band_id,
//     bandToUpdate
//   )
//     .then(numRowsAffected => {
//       res.status(204).end();
//     })
//     .catch(next);
// });

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
  })
// .post(jsonParser, requireAuth, (req, res, next) => {
//   const { title, date } = req.body;
//   const newSetlist = { title, date };
//   console.log('newSetlist is', newSetlist);

//   for (const [key, value] of Object.entries(newSetlist))
//     if (value === null)
//       return res.status(400).json({
//         error: { message: `Missing ${key} in request body` }
//       });

//   BandsService.insertSetlist(
//     req.app.get('db'),
//     newSetlist
//   )
//     .then(setlist => {
//       console.log('setlist is', setlist);
//       res
//         .status(201)
//         .location(path.posix.join(req.originalUrl, `/${setlist.id}`))
//         .json(setlist);
//     })
//     .catch(next);
// });

bandsRouter
  .post('/:band_id/join', jsonParser, requireAuth, (req, res, next) => {

    const newBandMember = { band_id: req.params.band_id, user_id: req.user.id };

    for (const [key, value] of Object.entries(newBandMember))
      if (value === null)
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });

    BandsService.insertBandMember(
      req.app.get('db'),
      newBandMember
    )
      .then(member => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${member.id}`))
          .json(member);
      })
      .catch(next);
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
    console.log("get setlist");
    const knexInstance = req.app.get('db');
    BandsService.getSetlistById(knexInstance, req.params.setlist_id)
      .then(setlist => {
        console.log("got setlist", setlist);
        res.json(setlist);
      })
      .catch((err) => {
        next(err);
      });
  })
// under construction
// .patch(jsonParser, requireAuth, (req, res, next) => {
//   const { song_id, band_id, setlist_id, song_position } = req.body;
//   const setlistToUpdate = { song_id, band_id, setlist_id, song_position };

//   const numberOfValues = Object.values(setlistToUpdate).filter(Boolean).length;
//   if (numberOfValues === 0) {
//     return res.status(400).json({
//       error: {
//         message: 'Request body must contain either title, artist, or duration'
//       }
//     });
//   }

//   BandsService.updateSetlist(
//     req.app.get('db'),
//     req.params.band_id,
//     setlistToUpdate
//   )
//     .then(numRowsAffected => {
//       res.status(204).end();
//     })
//     .catch(next);
// });
// /////////////////////////////////////////

bandsRouter
  .route('/:band_id/setlists/create')
  .post(jsonParser, requireAuth, (req, res, next) => {
    console.log('post create setlist');
    const newSetlist = req.body.newSetlist;
    console.log('reqbody is', req.body);
    BandsService.insertSetlist(req.app.get('db'), newSetlist)
      .then((setlist) => {
        console.log('setlist is', setlist);
        console.log('reqbody is', req.body);
        const songsToAdd = req.body.songsToAdd;
        for (let i = 0; i < songsToAdd.length; i++) {
          if (!songsToAdd[i].song_id || !songsToAdd[i].band_id) {
            return res.status(400).json({
              error: { message: `Missing ${key} in request body` }
            });
          }
        }
        console.log('random change');
        console.log('hoodeehoo');

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
        console.log('updates is', updates);
        return updates
          .then(() => {
            return setlist;
          });
      })
      .then((setlist) => {
        console.log('finished saving setlist', setlist);
        res
          .status(200)
          .json({
            setlist_id: setlist.id
          });
      })
      .catch(next);
  });


module.exports = bandsRouter;