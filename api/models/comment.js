const db = require('../services/db');

class Comment {
    static tableName = process.env.DB_CommentTableName;

    static async updateCommentId(id, text) {
        return db(this.tableName).where("id", "=", id).update({text: text});
    }

    static async deleteComment(id) {
        return db.select().from(this.tableName).where('id', '=', id).delete();
    }

    static async createComment({postId, userId, text, createdAt}) {
        const countCommentsDB = await Comment.getCountComments();
        const newID = +countCommentsDB[0].count + 1;

        return db.select().from(this.tableName).insert({
            id: newID,
            postId: +postId,
            userId: +userId,
            text: text,
            createdAt: createdAt
        });
    }

    static getCommentsByPostID(postId) {
        const userTableName = process.env.DB_UserTableName;
        return db.select(`${this.tableName}.id`, 'postId', `${this.tableName}.userId`, 'name', 'text', 'createdAt')
            .from(this.tableName)
            .join(userTableName, `${userTableName}.id`, `${this.tableName}.userId`)
            .where('postId', '=', postId);
    }

    static getNumCommentsByPostID(postId) {
        return db.count().from(this.tableName).where('postId', '=', postId);
    }

    static getCountComments() {
        return db.count().from(this.tableName);
    }
}

module.exports = Comment;
