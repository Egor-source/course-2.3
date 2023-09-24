const UserService = require('../../services/UserService');
const RoomService = require('../../services/RoomService');
const MessageService = require('../../services/MessageService');

async function getUserRooms (_, { socket }) {
    const rooms = await UserService.getUserRooms(socket.user.id);
    rooms.forEach(({ id }) => {
        socket.join(id);
    });
    socket.emit('userRooms', rooms);
}

async function createRoom (roomData, { io }) {
    const room = await RoomService.createRoom(roomData);
    const sockets = await io.fetchSockets();
    room.users.forEach((userId) => {
        const socket = sockets.find(({ user }) => user.id === userId);
        if (socket) {
            socket.join(room.id);
        }
    });
    io.to(room.id)
        .emit('newRoom', room);
}

async function loadHistory (roomId, { socket }) {
    const messages = await RoomService.loadHistory(roomId);
    socket.emit('history', messages);
}

async function message (messageData, {
    socket,
    io
}) {
    messageData.userId = socket.user.id;
    const message = await MessageService.createMessage(messageData);
    io.to(messageData.roomId)
        .emit('message', message);
}

module.exports = {
    getUserRooms,
    createRoom,
    loadHistory,
    message,
};