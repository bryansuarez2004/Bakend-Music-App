const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Track = sequelize.define('track', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Track;