const db = require('../services/db');

class Post {
    static tableName = process.env.DB_PostTableName;

    static findById(id) {
        return db.select().from(this.tableName).where('id', '=', id);
    }

    static getLimitPost(limit=5) {
        return db.select().from(this.tableName).limit(limit);
    }

    static getAllPost() {
        return db.select().from(this.tableName);
    }

    static getCountPost() {
        return db.count().from(this.tableName);
    }
}

module.exports = Post;
