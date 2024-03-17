const { getAll, create, getOne, remove, update } = require('../controllers/playlist.controllers');
const express = require('express');

const playlistRouter = express.Router();

playlistRouter.route('/')
    .get(getAll)
    .post(create);

playlistRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = playlistRouter;