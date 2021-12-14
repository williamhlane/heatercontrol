const { Sequelize, DataTypes } = require('sequelize');

const db = require('./databaseconnect');
const Locations = db.define('Locations', {
    locName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
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
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    desiredTemp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    controlRoomId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    controlRoom: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    /////////////////////////////////
});
const Rooms = db.define('Rooms', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timePassedToSrv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currentTemp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    /////////////////////////////////
});

db.sync();
module.exports.Units = Units;
module.exports.Rooms = Rooms;
module.exports.Locations = Locations;