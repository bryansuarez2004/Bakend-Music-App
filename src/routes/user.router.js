const { getAll, create, getOne, remove, update, addFavoriteTracks, removeFavoriteTracks, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT,getAll)
    .post(create);
userRouter.route('/login')
    .post(login)    

userRouter.route('/:id/addTracks')
    .post(addFavoriteTracks)

userRouter.route('/:id/removeTracks')
    .post(removeFavoriteTracks)

userRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = userRouter;