const { Message } = require('../models/init');

class MessageService {
    static async createMessage (messageData) {
        const message = await Message.create({
            text: messageData.text,
            RoomId: messageData.roomId,
            UserId: messageData.userId,
        });
        const user = await message.getUser();
        return {
            id: message.dataValues.id,
            text: message.dataValues.text,
            createdAt: message.dataValues.createdAt,
            updatedAt: message.dataValues.updatedAt,
            author: {
                id: user.dataValues.id,
                login: user.dataValues.login,
            }
        };

    }
}

module.exports = MessageService;