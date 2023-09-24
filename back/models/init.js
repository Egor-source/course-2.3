const Task = require('./Task');
const User = require('./User');
const Room = require('./Room');
const Message = require('./Message');
const db = require('../db');

User.belongsToMany(Room, { through: 'UserRoom' });
Room.belongsToMany(User, { through: 'UserRoom' });

User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

async function init () {
    await db.sync({
        alter: true,
        force: false
    });
    await Task.sync({
        alter: true,
        force: false
    });
    await Room.sync({
        alter: true,
        force: false
    });
    await Message.sync({
        alter: true,
        force: false
    });
    await User.sync({
        alter: true,
        force: false
    });
}

module.exports = {
    init,
    Task,
    User,
    Room,
    Message,
};