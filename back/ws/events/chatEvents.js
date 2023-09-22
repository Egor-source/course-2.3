function message (message, {
    io,
    socket,
}) {
    io.to(socket.roomId)
        .emit('newMessage', message);
}

function connectToRoom (roomId, { socket }) {
    if (socket.roomId) {
        socket.leave(socket.roomId);
    }
    socket.join(roomId);
    socket.roomId = roomId;
}

module.exports = {
    message,
    connectToRoom,
};