const db = require('../services/db');

module.exports = function ({table, column}) {
    return async function (req, res, next) {
        if (req.user) {
            if(req.user[0].role === 'moderator') {
                next();
            } else {
                const userId = req.user[0].id;
                const post = await db.select().from(table).where('id', '=', req.params.id);

                if (+userId === +post[0][column]) {
                    next();
                } else {
                    next('Access denied. You are not the author of the post');
                }
            }
        } else {
            next('Access denied');
        }
    }
};
