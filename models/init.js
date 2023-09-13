const Task = require('./Task');

async function init () {
    await Task.sync({
        alter: true,
        force: false
    });
}

module.exports = {
    init,
    Task,
};