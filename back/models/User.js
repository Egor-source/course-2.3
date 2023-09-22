const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;