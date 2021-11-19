const { Sequelize, DataTypes } = require('sequelize');

const db = require('./databaseconnect');
const Rooms = db.define('Rooms', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timePassedToSrv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentTemp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    /////////////////////////////////
});
const Units = db.define('Units', {
    unitName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timePassedToSrv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desiredTemp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    controlRoom: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    /////////////////////////////////
});
db.sync();
module.exports.Units = Units;
module.exports.Rooms = Rooms;