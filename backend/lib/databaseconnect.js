const Sequelize = require('sequelize');
const user = "heaterU";
const password = "heaterP";
const host = "localhost";
const port = "3306";
const database = "heater";
const db = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);
try {
    db.authenticate();
} catch (error) {
    console.log(error);
}
module.exports = db;
