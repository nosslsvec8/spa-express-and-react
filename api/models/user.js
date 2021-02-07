const db = require('../services/db');
const bcrypt = require('bcrypt');

class User {
    static tableName = process.env.DB_UserTableName;

    static async updateUser(user) {
        return db.select().from(this.tableName).where('id', '=', user.id).update({ email: user.email, password: user.password, token: user.token });
    }

    static async deleteUser(email) {
        return db.select().from(this.tableName).where('email', '=', email).delete();
    }

    static async createUser(email, password, name) {
        let lastId = await User.getLastID();
        let newID;

        // checking if users are in the database
        (lastId.length === 0) ? newID = 1 : newID = lastId[lastId.length - 1].id + 1;

        return db.select().from(this.tableName).insert({
            id: newID,
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            token: ''
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

    static async findById(userID) {
        return db.select().from(this.tableName).where({ id: userID });
    }

    static async getLastID() {
        return db.select('id').from(this.tableName);
    }

    static async getAllUsers() {
        return db.select().from(this.tableName);
    }
}

module.exports = User;
