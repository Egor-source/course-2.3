const UserService = require('../services/UserService');

async function getUsers (req, res) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

module.exports = { getUsers };