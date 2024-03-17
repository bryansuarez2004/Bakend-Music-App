const express = require('express');
const userRouter = require('./user.router');
const playlistRouter = require('./playlist.router');
const trackRouter = require('./track.router');
const { verifyJWT } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',userRouter)
router.use('/playlists',verifyJWT,playlistRouter)
router.use('/tracks',trackRouter)

module.exports = router;