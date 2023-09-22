const express = require('express');
const authApi = express.Router();
const auth = require('../middleware/auth');

const {
    registration,
    login,
    getAuthUser,
    refreshToken,
} = require('../controllers/authController');

authApi.post('/registration', registration);
authApi.post('/login', login);
authApi.get('/getAuthUser', auth, getAuthUser);
authApi.post('/refreshToken', refreshToken);

module.exports = authApi;