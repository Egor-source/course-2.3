const {
    Room,
    Message,
    User,
} = require('../models/init');


class RoomService {
    static async createRoom (roomData) {
        try {
            const room = await Room.create({
                name: roomData.name,
            });
            await room.addUsers(roomData.users);
            const users = await room.getUsers();
            room.dataValues.users = users.map(({ dataValues }) => dataValues.id);
            return room.dataValues;
        } catch (e) {
            throw e;
        }
    }

    static async loadHistory (roomId) {
        try {
            const messages = await Message.findAll({
                where: {
                    RoomId: roomId,
                },
                include: User,
            });
            return messages.map((message) => ({
                id: message.dataValues.id,
                text: message.dataValues.text,
                createdAt: message.dataValues.createdAt,
                updatedAt: message.dataValues.updatedAt,
                author: {
                    id: message.dataValues.User.dataValues.id,
                    login: message.dataValues.User.dataValues.login,
                }
            }));
        } catch (e) {
            throw e;
        }
    }
}


module.exports = RoomService;