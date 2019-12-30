const path = require('path');
const express = require('express');
const xss = require('xss');
const SetlistsService = require('./setlists-service');

const setlistsRouter = express.Router();
const jsonParser = express.json();

const serializeSetlists = list => ({
  id: list.id,
  title: list.title,
  date: list.date
});

setlistsRouter
  .route('/')

setlistsRouter
  .route('/:setlist_id')