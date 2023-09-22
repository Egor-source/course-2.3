const { User } = require('../models/init');
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
        const user = await User.findOne({
            where
        });
        return user?.dataValues;
    }

    static async getAllUsers () {
        const users = await User.findAll();
        return users;
    }
}

module.exports = UserService;