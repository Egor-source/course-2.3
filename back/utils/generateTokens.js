const jwt = require('jsonwebtoken');

function generateTokens (payload) {
    try {
        return {
            accessToken: jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d',
            }),
            refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: '30d',
            })
        };
    } catch (e) {
        throw e;
    }
}

module.exports = generateTokens;