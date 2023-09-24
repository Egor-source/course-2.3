const express = require('express');
const usersApi = express.Router();
const auth = require('../middleware/auth');

const {
    getUsers,
} = require('../controllers/usersController');

usersApi.get('/', auth, getUsers);


module.exports = usersApi;