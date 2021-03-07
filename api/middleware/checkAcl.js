const db = require('../services/db');

const allPermissionsArr = {
    admin: ['listAnyPost', 'createPosts', 'updateAnyPost', 'deleteAnyPost', 'listAnyUser', 'createAnyUser', 'updateAnyUser', 'deleteAnyUser'],
    moderatorForPosts: ['listAnyPost', 'createPosts', 'updateAnyPost', 'deleteAnyPost', 'listAnyUser', 'updateOwnUser', 'deleteOwnUser'],
    user: ['listAnyPost', 'createPosts', 'updateOwnPost', 'deleteOwnPost', 'listAnyUser', 'updateOwnUser', 'deleteOwnUser']
};

module.exports = function (checkPermissionsArr) {
    return async function (req, res, next) {
        if (req.user) {
            const currentUser = req.user[0];
            let userPermissionsArr = allPermissionsArr[currentUser.role] || [];

            for (const rule of checkPermissionsArr) {
                if (userPermissionsArr.includes(rule.permission)) {
                    if (rule.checkAuthor) {
                        let databaseQueryResult = await db.select().from(rule.table).where('id', '=', req.params.id);
                        if (+databaseQueryResult[0][rule.column] === currentUser.id) {
                            return next();
                        }
                    } else {
                        return next();
                    }
                }
            }
            next('Access denied. You are not the author of the post!');
        } else {
            next('Access denied');
        }
    }
};
