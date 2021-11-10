const { Sequelize, DataTypes } = require('sequelize');

const db = require('./databaseconnect');
const Rooms = db.define('Rooms', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timePassedToSrv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentTemp:{
	type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    /////////////////////////////////
});
module.exports = Rooms;