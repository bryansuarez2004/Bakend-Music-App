const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Playlist = sequelize.define('playlist', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Playlist;