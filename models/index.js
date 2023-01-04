const dbConfig = require("../config/sequelizeConfig.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.privilege = require("./privilege.js")(sequelize, Sequelize);

db.role.belongsToMany(db.privilege, { through: 'RolePrivilege' });
db.privilege.belongsToMany(db.role, { through: 'RolePrivilege' });

db.role.hasMany(db.users);
db.users.belongsTo(db.role);

db.env = dbConfig;

module.exports = db;