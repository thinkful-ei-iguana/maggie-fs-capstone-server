const path = require('path');
const express = require('express');
const xss = require('xss');
const BandsService = require('./bands-service');

const bandsRouter = express.Router();
const jsonParser = express.json();

const serializeBand = band => ({
  id: band.id,
  band_name: band.band_name,
  city: band.city,
  state: band.state,
  country: band.country,
  description: band.description
});

bandsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    BandsService.getAllBands(knexInstance)
      .then(bands => {
        res.json(bands.map(serializeBand));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { id, band_name, city, state, country, description } = req.body;
    const newBand = { id, band_name, city, state, country, description };

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
  })

bandsRouter
  .route('/:band_id')
  .all((req, res, next) => {
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
  .get((req, res, next) => {
    res.json(serializeBand(res.band));
  })
  .delete((req, res, next) => {
    BandsService.deleteBand(
      req.app.get('db'),
      req.params.band_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { id, band_name, city, state, country, description } = req.body;
    const bandToUpdate = { id, band_name, city, state, country, description };

    const numberOfValues = Object.values(bandToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: 'Request body must contain either \'description\' or \'band_name\''
        }
      });
    }

    BandsService.updateBand(
      req.app.get('db'),
      req.params.band_id,
      bandToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });



module.exports = bandsRouter;