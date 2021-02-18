const db = require('../services/db');

const allPermissionsArr = {
    admin: ['listAnyPost', 'createPosts', 'updateAnyPost', 'deleteAnyPost', 'listAnyUser', 'updateAnyUser', 'deleteAnyUser'],
    moderatorForPosts: ['listAnyPost', 'createPosts', 'updateAnyPost', 'deleteAnyPost', 'listAnyUser', 'updateOwnUser', 'deleteOwnUser'],
    author: ['listAnyPost', 'createPosts', 'updateOwnPost', 'deleteOwnPost', 'listAnyUser', 'updateOwnUser', 'deleteOwnUser'],
    user: ['listAnyPost', 'createPosts', 'listAnyUser']
};

function isCheckPermission(userPermissionsArr, findPermission) {
    for(let j = 0; j < userPermissionsArr.length; j++) {
        if (userPermissionsArr[j] === findPermission) {
            return true;
        }
    }
}

module.exports = function (checkPermissionsArr) {
    return async function (req, res, next) {
        if (req.user) {
            const currentUser = req.user[0];
            let userPermissionsArr = allPermissionsArr[currentUser.role] || [];

            for (let i = 0; i < checkPermissionsArr.length; i++) {
                if(isCheckPermission(userPermissionsArr, checkPermissionsArr[i].permission)){
                    return next();
                }

                const userId = currentUser.id;

                if (
                    typeof checkPermissionsArr[i].table !== 'undefined' &&
                    typeof checkPermissionsArr[i].column !== 'undefined'
                ) {
                    let databaseQueryResult = await db.select().from(checkPermissionsArr[i].table).where('id', '=', req.params.id);

                    if(
                        checkPermissionsArr[i].checkAuthor === true &&
                        +userId === +databaseQueryResult[0][checkPermissionsArr[i].column]
                    ) {
                        userPermissionsArr = allPermissionsArr["author"];

                        if(isCheckPermission(userPermissionsArr, checkPermissionsArr[i].permission)){
                            return next();
                        }
                    } else {
                        next('Access denied. You are not the author of the post');
                    }
                }
            }
        } else {
            next('Access denied');
        }
    }
};
