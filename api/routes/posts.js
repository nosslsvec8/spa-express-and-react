const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/post');
const checkAuthor = require('../middleware/checkAuthor');
const checkAuth = passport.authenticate('jwt', {session: false});

router.get("(/post|/posts)", async (req, res) => {
    res.send(await Post.getAllPost());
});
router.get("(/post/:id|/posts/:id)", async (req, res) => {
    res.send(await Post.findById(req.params.id));
});
router.post('/posts', [checkAuth, (req, res) => {
    res.send('Create post');
}]);
router.put("(/post/:id|/posts/:id)", [checkAuth, checkAuthor({table: Post.tableName, column: 'userId'}), async (req, res) => {
    res.send(`Update ${req.params.id} post`);
}]);
router.delete("(/post/:id|/posts/:id)", [checkAuth, checkAuthor({table: Post.tableName, column: 'userId'}), async (req, res) => {
    res.send(`Update ${req.params.id} post`);
}]);

module.exports = router;
