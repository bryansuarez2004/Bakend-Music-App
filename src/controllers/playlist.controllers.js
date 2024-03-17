const catchError = require('../utils/catchError');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const {id} = req.user
    const results = await Playlist.findAll({ where: {userId : id} ,include:[Track]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {id} = req.user
    const {name,tracks} = req.body
    const result = await Playlist.create({name,userId:id});

    await result.setTracks(tracks)

     const tracksOfPlaylists = await result.getTracks()

     return res.status(201).json(tracksOfPlaylists);
});

const getOne = catchError(async(req, res) => {
    const idUserLogeado = req.user.id
    const { id } = req.params;
    const result = await Playlist.findOne({where:{id,userId:idUserLogeado} });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const idUserLogeado = req.user.id

    const { id } = req.params;
    const result = await Playlist.destroy({where:{id,userId:idUserLogeado} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const idUserLogeado = req.user.id
    const { id } = req.params;
    const result = await Playlist.update(
        req.body,
        {where:{id,userId:idUserLogeado}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}