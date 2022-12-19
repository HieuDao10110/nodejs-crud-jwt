// connect to mysql
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize('nodecrud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//call a promise-based authenticate() method to instantiate a database connection to the application.
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;