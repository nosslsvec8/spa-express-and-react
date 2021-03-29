const router = require('express').Router();
const passport = require('passport');
const Post = require('../models/post');
const checkAcl = require('../middleware/checkAcl');
const checkAuth = passport.authenticate('jwt', {session: false});
const validator = require('../middleware/validator');
const checkEmptyValue = require('../services/checkEmptyValue');
const multer = require('multer');
const fs = require('fs');
const storage = require('../services/multerDiskStorage');
const upload = multer({storage: storage});

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
    }),
    checkAuth, upload.single('postPicture'), async (req, res) => {
        console.log(req);
        const {title, text} = req.body;
        const fileExtensionStr = req.file?.originalname.split('.')[1];
        const basePathAvatar = `${req.file?.path}`;
        const avatarLink = `${basePathAvatar}.${fileExtensionStr}`;

        try {
            if (fileExtensionStr !== 'jpg' && fileExtensionStr !== 'png') {
                return next(res.status(400).send(`Create post error - an avatar can only be an image`));
            }
            if (fs.existsSync(`${basePathAvatar}`)) {
                fs.renameSync(`${basePathAvatar}`, `${avatarLink}`);
            }
        } catch (err) {
            return next(res.status(400).send(`Create post error - ${error}`));
        }

        checkEmptyValue(title.trim(), 'Title value cannot be empty');
        checkEmptyValue(text.trim(), 'Text value cannot be empty');

        try {
            await Post.createPost(title, text, `${req.file.filename}.${fileExtensionStr}`);
            res.status(201).send('Post successfully created');
        } catch (error) {
            return next(res.status(400).send(`Created error - ${error}`));
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
    res.status(201).send('Post successfully changed');
}]);
router.delete("(/post/:id|/posts/:id)", [checkAuth, checkAcl([
    {permission: "deleteAnyPost"},
    {permission: "deleteOwnPost", checkAuthor: true, table: Post.tableName, column: 'userId'}
]), async (req, res) => {
    res.send(`Delete ${req.params.id} post`);
}]);

module.exports = router;
