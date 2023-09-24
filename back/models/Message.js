const { DataTypes } = require('sequelize');
const db = require('../db');

const Message = db.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'messages',
    timestamps: true,
});

module.exports = Message;