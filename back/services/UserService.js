const {
    User,
    Room
} = require('../models/init');
const crypto = require('crypto');

class UserService {
    static async createUser (userData) {
        try {
            const { dataValues } = await User.create({
                login: userData.login,
                password: crypto.createHash('sha256')
                    .update(userData.password)
                    .digest('hex'),
            });
            delete dataValues.password;
            return dataValues;
        } catch (e) {
            throw e;
        }
    }

    static async getUserByCondition (where) {
        try {
            const user = await User.findOne({
                where
            });
            return user?.dataValues;
        } catch (e) {
            throw e;
        }

    }

    static async getAllUsers () {
        try {
            const users = await User.findAll();
            return users.map(({ dataValues }) => ({
                id: dataValues.id,
                login: dataValues.login,
                createdAt: dataValues.createdAt,
                updatedAt: dataValues.updatedAt,
            }));
        } catch (e) {
            throw e;
        }
    }

    static async getUserRooms (userId) {
        try {
            const user = await User.findByPk(userId, {
                include: {
                    model: Room,
                    include: User,
                },
            });
            return user.Rooms.map((room) => ({
                id: room.dataValues.id,
                name: room.dataValues.name,
                users: room.Users.map(({ dataValues }) => dataValues.id),
                createdAt: room.dataValues.createdAt,
                updatedAt: room.dataValues.updatedAt,
            }));
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserService;