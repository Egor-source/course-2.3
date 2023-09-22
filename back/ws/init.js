const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const events = require('./eventsList');

function initWs (httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    });

    instrument(io, {
        auth: false,
        mode: 'development',
    });

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id);
        Object.entries(events)
            .forEach(([eventName, callback]) => {
                socket.on(eventName, (args) => {
                    callback(args, {
                        socket,
                        io,
                    });
                });
            });
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected`);
            console.log(reason);
        });
    });
}

module.exports = initWs;