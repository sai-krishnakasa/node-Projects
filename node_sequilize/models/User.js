const { DataTypes, sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validator: {
                notEmpty: true
            }
        }
    });
    return User;
}