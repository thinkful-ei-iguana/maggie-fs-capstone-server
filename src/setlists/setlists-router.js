// const path = require('path');
// const express = require('express');
// const xss = require('xss');
// const requireAuth = require('../middleware/jwt-auth');
// const SetlistsService = require('./setlists-service');

// const setlistsRouter = express.Router();
// const jsonParser = express.json();


// setlistsRouter
//   .route('/')
// // .get(requireAuth, (req, res, next) => { // ad requireAuth
// //   console.log('req is', req);
// //   const knexInstance = req.app.get('db');
// //   SetlistsService.getSetlistsByBandId(knexInstance, req.setlists.band_id)
// //     .then(setlists => {
// //       console.log('setlists is', setlists);
// //       res.json(setlists);
// //     })
// //     .catch((err) => {
// //       next(err);
// //     });
// // });

// // setlistsRouter
// //   .route('/:setlist_id')

// module.exports = setlistsRouter;