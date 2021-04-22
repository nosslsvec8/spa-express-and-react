const router = require('express').Router();
const Comment = require('../models/comment');
const checkAcl = require('../middleware/checkAcl');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});
const validator = require('../middleware/validator');

router.get("/comment/countComments/:id", async (req, res) => {
    res.send(await Comment.getNumCommentsByPostID(req.params.id));
});
router.get("/comment/postId/:id", checkAuth, async (req, res) => {
    res.send(await Comment.getCommentsByPostID(req.params.id));
});
router.post('/comment/create', [validator({
        text: ['required', 'min:5'],
        postId: ['required', 'min:1'],
        userId: ['required', 'min:1'],
        createdAt: ['required', 'min:10'],
    }), checkAuth, async (req, res) => {
        const {text, postId, userId, createdAt} = req.body;

        try {
            await Comment.createComment({
                text: text,
                postId: postId,
                userId: userId,
                createdAt: createdAt
            });
            res.status(201).send('Comment successfully created');
        } catch (error) {
            res.status(400).send(`Created error - ${error}`);
        }
    }]
);
router.put("/comment/:id", [checkAuth, validator({
    text: ['required', 'min:10'],
    id: ['required', 'min:10'],
    userId: ['required', 'min:1']
}), checkAcl([
    {permission: "updateAnyComment"},
    {permission: "updateOwnComment", checkAuthor: true, table: Comment.tableName, column: 'userId'}
]), async (req, res) => {
    try {
        await Comment.updateCommentId(req.body.id, req.body.text);
        res.status(200).send('Comment successfully changed');
    } catch (error) {
        res.status(400).send(`Update error - ${error}`);
    }
}]);
router.delete("/comment/:id", [checkAuth, validator({
    userId: ['required', 'min:1']
}), checkAcl([
    {permission: "deleteAnyComment"},
    {permission: "deleteOwnComment", checkAuthor: true, table: Comment.tableName, column: 'userId'}
]), async (req, res) => {
    try {
        await Comment.deleteComment(req.params.id);
        res.status(200).send('Comment successfully deleted');
    } catch (error) {
        res.status(400).send(`Deleted error - ${error}`);
    }
}]);

module.exports = router;
