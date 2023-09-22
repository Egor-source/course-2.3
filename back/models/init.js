const Task = require('./Task');
const User = require('./User');

async function init () {
    await Task.sync({
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
};