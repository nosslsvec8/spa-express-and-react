const db = require('../services/db');

module.exports = function ({table, column}) {
    return async function (req, res, next) {
        if (req.user) {
            const userId = req.user[0].id;
            const post = await db.select().from(table).where(column, '=', req.params.id);

            if (+userId === +post[0].userId) {
                next();
            } else {
                next('Access denied. You are not the author of the post');
            }
        } else {
            next('Access denied');
        }
    }
};
