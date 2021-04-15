const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/post');
const checkAcl = require('../middleware/checkAcl');
const checkAuth = passport.authenticate('jwt', {session: false});
const validator = require('../middleware/validator');
const checkEmptyValue = require('../services/checkEmptyValue');
const fs = require('fs');

router.get("(/post/count|/posts/count)", async (req, res) => {
    res.send(await Post.getCountPost());
});
router.get("(/post|/posts)", async (req, res) => {
    res.send(await Post.getLimitPost(req.query?.limit));
});
router.get("(/post/:id|/posts/:id)", async (req, res) => {
    res.send(await Post.findById(req.params.id));
});
router.post('(/post|/posts)', [
    validator({
        title: ['required', 'min:6', 'max:125'],
        text: ['required', 'min:10'],
        postPicture: ['required'],
    }),
    checkAuth, async (req, res) => {
        const {title, text, postPicture} = req.body;
        const fileExtensionStr = postPicture.split(";")[0].split("/")[1];
        const pictureCode = postPicture.split(",")[1];
        const pictureEncoding = postPicture.split(",")[0].split(";")[1];
        const pictureLink = `post${Date.now()}.${fileExtensionStr}`;
        const pictureFullLink = `${__dirname}/..\\uploads\\${pictureLink}`;

        fs.writeFileSync(pictureFullLink, pictureCode, pictureEncoding);

        if (fileExtensionStr !== 'jpg' && fileExtensionStr !== 'png') {
            res.status(400).send(`Create post error - an avatar can only be an image`);
        }

        checkEmptyValue(title.trim(), 'Title value cannot be empty');
        checkEmptyValue(text.trim(), 'Text value cannot be empty');

        try {
            await Post.createPost(title, text, `${pictureLink}`);
            res.status(201).send('Post successfully created');
        } catch (error) {
            res.status(400).send(`Created error - ${error}`);
        }
    }]
);
router.put("(/post/:id|/posts/:id)", [checkAuth, checkAcl([
    {permission: "updateAnyPost"},
    {permission: "updateOwnPost", checkAuthor: true, table: Post.tableName, column: 'userId'}
]), validator({
    title: ['required', 'min:6', 'max:125'],
    text: ['required', 'min:10'],
    id: ['required']
}), async (req, res) => {
    await Post.updatePostId(req.body.id, req.body);
    res.status(200).send('Post successfully changed');
}]);
router.delete("(/post/:id|/posts/:id)", [checkAuth, checkAcl([
    {permission: "deleteAnyPost"},
    {permission: "deleteOwnPost", checkAuthor: true, table: Post.tableName, column: 'userId'}
]), async (req, res) => {
    await Post.deletePost(req.body.id);
    res.status(200).send('Post successfully deleted');
}]);

module.exports = router;
