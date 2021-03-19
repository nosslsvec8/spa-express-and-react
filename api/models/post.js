const db = require('../services/db');

class Post {
    static tableName = process.env.DB_PostTableName;

    static findById(id) {
        return db.select().from(this.tableName).where('id', '=', id);
    }

    static getAllPost() {
        return db.select().from(this.tableName);
    }
}

module.exports = Post;
