const db = require('../services/db');
const bcrypt = require('bcrypt');

class User {
    static tableName = process.env.DB_UserTableName;

    static async updateUser(user) {
        return db.select().from(this.tableName).where('id', '=', user.id).update({
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
            token: user.token
        });
    }

    static async updateUserPassword(id, password) {
        return db.select().from(this.tableName).where('id', '=', id).update({
            password: bcrypt.hashSync(password, 10)
        });
    }

    static async deleteUser(email) {
        return db.select().from(this.tableName).where('email', '=', email).delete();
    }

    static async createUser(email, password, name, avatarLink) {
        let countId = await User.getCountUsers();
        let newID;

        (countId.length === 0) ? newID = 1 : newID = +countId[0].count + 1;

        return db.select().from(this.tableName).insert({
            id: newID,
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            token: '',
            avatarLink: avatarLink
        });
    }

    static async updateToken(id, token) {
        return db.select().from(this.tableName).where( 'id', '=', id).update({ token: token });
    }

    static async findByToken(token) {
        return db.select().from(this.tableName).where({ token }).first();
    }

    static async findByEmail(userEmail) {
        return db.select().from(this.tableName).where({ email: userEmail });
    }

    static async findByName(userName) {
        return db.select().from(this.tableName).where({ name: userName }).first();
    }

    static async findById(userId) {
        return db.select().from(this.tableName).where({ id: userId });
    }

    static async getCountUsers() {
        return db.count().from(this.tableName);
    }

    static async getAllUsers() {
        return db.select().from(this.tableName);
    }

    static async getAvatar(id) {
        return db.select('avatarLink').from(this.tableName).where({id: id});
    }
}

module.exports = User;
