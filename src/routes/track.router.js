const { getAll, create, getOne, remove, update } = require('../controllers/tracks.controllers');
const express = require('express');

const trackRouter = express.Router();

trackRouter.route('/')
    .get(getAll)
    .post(create);

trackRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = trackRouter;