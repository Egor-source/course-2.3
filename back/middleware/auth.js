const jwt = require('jsonwebtoken');

async function auth (req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: user.id,
            login: user.login,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
        next();
    } catch (e) {
        res.status(401)
            .json({
                error: e,
            });
    }
}

module.exports = auth;