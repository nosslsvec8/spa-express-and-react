const express = require('express');
const router = express.Router();
const db = require('../services/db');
const passport = require('passport');
const checkAuthorPost = require('../middleware/checkAuthorPost');
const checkAuth = passport.authenticate('jwt', {session: false});
const tableName = process.env.DB_PostTableName;

router.get('/posts || /post', async (req, res) => {
    res.send(await db.select().from(tableName));
});
router.get("/posts/:id || /post/:id", async (req, res) => {
    res.send(await db.select().from(tableName).where({id: req.params.id}));
});
router.post('/posts', [checkAuth, (req, res) => {
    res.send('Create post');
}]);
router.put('/posts/:id', [checkAuth, checkAuthorPost, async (req, res) => {
    res.send(`Update ${req.params.id} post`);
}]);
router.delete('/posts/:id', [checkAuth, checkAuthorPost, async (req, res) => {
    res.send(`Update ${req.params.id} post`);
}]);

module.exports = router;
