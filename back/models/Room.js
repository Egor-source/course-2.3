const { DataTypes } = require('sequelize');
const db = require('../db');

const Room = db.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'rooms',
    timestamps: true,
});

module.exports = Room;