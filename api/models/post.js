const db = require('../services/db');

class Post {
    static tableName = process.env.DB_PostTableName;

    static async createPost(text, title, pictureLink) {
        let lastId = await Post.getLastID();
        let newID;

        // checking if users are in the database
        (lastId.length === 0) ? newID = 1 : newID = lastId[lastId.length - 1].id + 1;

        return db.select().from(this.tableName).insert({
            id: newID,
            userId: newID,
            title: title,
            text: text,
            pictureLink: pictureLink
        });
    }

    static async updatePostId(id, newPost) {
        return db(Post.tableName).where("id", "=", id)
            .update({
                title: newPost.title,
                text: newPost.text,
                userId: newPost.userId,
            });
    }

    static async deletePost(id) {
        return db.select().from(this.tableName).where('id', '=', id).delete();
    }

    static async getLastID() {
        return db.select('id').from(this.tableName);
    }

    static findById(id) {
        return db.select().from(this.tableName).where('id', '=', id);
    }

    static getLimitPost(limit = 5) {
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
