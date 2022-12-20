const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define("users", {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },

    });

    return User;
};