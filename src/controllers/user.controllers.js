const catchError = require('../utils/catchError');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({include:[Playlist,Track]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    const body = {...req.body, password: hashedPassword}

    const result = await User.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    delete req.body.password
    delete req.body.email

    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const addFavoriteTracks = catchError(async(req,res)=>{

   const {id}=req.params

   const user = await User.findByPk(id)

   await user.addTracks(req.body)
   
   const tracks = await user.getTracks()

   return res.json(tracks)

})

const removeFavoriteTracks = catchError(async(req,res)=>{
    const {id}=req.params

    const user = await User.findByPk(id)
 
    await user.removeTracks(req.body)
    
    const tracks = await user.getTracks()
 
    return res.json(tracks)
})


const login = catchError(async(req,res)=>{
     const {email,password} = req.body

     const user = await User.findOne({where:{email}})
     if (!user) return res.status(401).json({error: "invalid credentials"})

     const isValid = await bcrypt.compare(password,user.password)
     if (!isValid) return res.status(401).json({error: "invalid credentials"})


     const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
     )

     console.log(user);
    
   const body  = {...user.dataValues,token}
  delete body.password
     return res.json(body)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    addFavoriteTracks,
    removeFavoriteTracks,
    login
}