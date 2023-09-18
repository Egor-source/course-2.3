const { Server } = require('socket.io');
const events = require('./eventsList');

function initWs (httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected', socket.id);
        Object.entries(events)
            .forEach(([eventName, callback]) => {
                socket.on(eventName, (args) => {
                    callback(args, socket);
                });
            });
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected`);
            console.log(reason);
        });
    });
}

module.exports = initWs;