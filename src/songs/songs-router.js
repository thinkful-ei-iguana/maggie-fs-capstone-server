const path = require('path');
const express = require('express');
const xss = require('xss');
const SongsService = require('./songs-service');

const songsRouter = express.Router();
const jsonParser = express.json();

const serializeSongs = song => ({
  id: song.id,
  title: song.title,
  artist: song.artist,
  duration: song.duration
});

songsRouter
  .route('/')

songsRouter
  .route('/:song_id')