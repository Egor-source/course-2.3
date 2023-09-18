function message (args, socket) {
    socket.emit('newMessage', args);
}

module.exports = { message };