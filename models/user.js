const {DataTypes} = require("sequelize");
module.exports = function(sequelize, Sequelize) {
    const Users = sequelize.define('user', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        }
    },{
        timestamps: false
    });
    return Users;
}