const UserService = require('../services/UserService');
const crypto = require('crypto');
const generateTokens = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');

async function registration (req, res) {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201)
            .json({
                ...user,
                ...generateTokens(user),
            });
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function login (req, res) {
    const {
        login,
        password
    } = req.body;
    try {
        const user = await UserService.getUserByCondition({
            login,
        });

        if (!user) {
            res.status(401)
                .end();
            return;
        }

        const passwordHash = crypto.createHash('sha256')
            .update(password)
            .digest('hex');

        if (user.password !== passwordHash) {
            res.status(401)
                .end();
            return;
        }

        delete user.password;
        res.json({
            ...user,
            ...generateTokens(user),
        });

    } catch (e) {
        console.log(e);
        res.status(400)
            .json(e);
    }
}

async function getAuthUser (req, res) {
    try {
        res.json(req.user);
    } catch (e) {
        res.status(400)
            .json(e);
    }
}

async function refreshToken (req, res) {
    try {
        const user = jwt.verify(req.body?.token, process.env.JWT_REFRESH_SECRET);
        if (user) {
            const userData = {
                id: user.id,
                login: user.login,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            res.json({
                ...userData,
                ...generateTokens(userData),
            });
        }
    } catch (e) {
        res.status(400)
            .json(e);
    }

}

module.exports = {
    registration,
    login,
    getAuthUser,
    refreshToken,
};