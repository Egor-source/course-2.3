const jwt = require('jsonwebtoken');

async function websocketAuth (socket, next) {
    try {
        const token = socket.handshake.auth?.token.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = {
            id: user.id,
            login: user.login,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        };
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = websocketAuth;