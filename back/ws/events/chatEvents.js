function message (message, {
    io,
    socket,
}) {
    io.to(socket.roomId)
        .emit('newMessage', message);
}

function connectToRoom (roomId, { socket }) {
    socket.join(roomId);
    socket.roomId = roomId;
}

module.exports = {
    message,
    connectToRoom,
};