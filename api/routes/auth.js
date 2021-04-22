const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validator = require('../middleware/validator');
const createJwtTokenStr = require('../services/createJwtTokenStr');
const multer = require('multer');
const fs = require('fs');
const request = require('request');
const storage = require('../services/multerDiskStorage');
const upload = multer({storage: storage});
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

router.post('/auth/register', upload.single('avatar'), validator({
    email: ['required', 'email', `unique:${User.tableName}:create`],
    password: ['required', 'min:6', 'max:60'],
    name: ['required', 'min:2', 'max:125']
}), async (req, res, next) => {
    const {email, password, name} = req.body;
    const fileExtensionStr = req.file?.originalname.split('.')[1];
    const basePathAvatar = `${req.file?.path}`;
    const avatarLink = `${basePathAvatar}.${fileExtensionStr}`;

    try {
        if (fileExtensionStr !== 'jpg' && fileExtensionStr !== 'png') {
            return next(res.status(400).send(`Registration error - an avatar can only be an image`));
        }
        if (fs.existsSync(`${basePathAvatar}`)) {
            fs.renameSync(`${basePathAvatar}`, `${avatarLink}`);
        }
    } catch (err) {
        return next(res.status(400).send(`Registration error - ${error}`));
    }

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length !== 0) {
        return res.status(400).send('This email already exists or you forgot to add a picture');
    } else {
        try {
            await User.createUser(email, password, name, `${req.file.filename}.${fileExtensionStr}`);
            res.status(201).send('Registration completed successfully');
        } catch (error) {
            return next(res.status(400).send(`Registration error - ${error}`));
        }
    }
});

router.post('/auth/social', async (req, res) => {
    const {email, name, profilePicURL} = req.body._profile;
    const idSocialToken = req.body._token.idToken;

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length === 0) {
        try {
            const pictureLink = `avatar${Date.now()}.jpg`;
            const pictureFullLink = `${__dirname}/..\\uploads\\${pictureLink}`;

            request(profilePicURL).pipe(fs.createWriteStream(pictureFullLink));

            await User.createUser(email, idSocialToken.substr(0, 80), name, pictureLink);
            const newUserInDb = await User.findByEmail(email.trim());
            const token = createJwtTokenStr(newUserInDb[0].email, newUserInDb[0].id);
            await User.updateToken(newUserInDb[0].id, token);

            return res.send({accessToken: token});
        } catch (error) {
            return next(res.status(400).send(`Registration error - ${error}`));
        }
    } else {
        const token = createJwtTokenStr(userInDb[0].email, userInDb[0].id);
        await User.updateToken(userInDb[0].id, token);

        return res.send({accessToken: token});
    }
});

router.post('/auth/login', validator({
    email: ['required'],
    password: ['required']
}), async (req, res) => {
    const {email, password} = req.body;

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length === 0) {
        return res.status(404).send('This email not found');
    } else {
        const passwordResult = bcrypt.compareSync(password, userInDb[0].password);

        if (passwordResult) {
            const token = createJwtTokenStr(userInDb[0].email, userInDb[0].id);
            await User.updateToken(userInDb[0].id, token);

            return res.send({accessToken: token});
        } else {
            return res.status(401).send('Passwords do not match');
        }
    }
});

router.post('/auth/logout', [checkAuth, validator({
    accessToken: ['required']
}), async (req, res) => {
    const {accessToken} = req.body;

    const userInDb = await User.findByToken(accessToken);

    if (!userInDb) {
        return res.status(404).send('This token not found');
    } else {
        await User.deleteToken(userInDb.id);
        return res.send(true);
    }
}]);

router.post('/auth/isCheckAccessToken', [checkAuth, validator({
    accessToken: ['required']
}), async (req, res) => {
    return res.send(true);
}]);

module.exports = router;
