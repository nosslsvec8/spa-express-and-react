const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validator = require('../middleware/validator');
const checkEmptyValue = require('../services/checkEmptyValue');
const multer = require('multer');
const fs = require('fs');
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

    checkEmptyValue(email.trim(), 'Email value cannot be empty');
    checkEmptyValue(password.trim(), 'Password value cannot be empty');
    checkEmptyValue(name.trim(), 'Name value cannot be empty');

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

router.post('/register/social', async (req, res) => {
    const {email, id, name} = req.body.profile;

    checkEmptyValue(email.trim(), 'Email value cannot be empty');
    checkEmptyValue(id.trim(), 'Password value cannot be empty');
    checkEmptyValue(name.trim(), 'Name value cannot be empty');

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length === 0) {
        try {
            await User.createUser(email, id, name);
            res.status(201).send('Registration completed successfully');
        } catch (error) {
            return next(res.status(400).send(`Registration error - ${error}`));
        }
    } else {
        return res.status(400).send('This email already exists');
    }

    res.send({body: req.body});
});

router.post('/auth/login', validator({
    email: ['required'],
    password: ['required']
}), async (req, res) => {
    const {email, password} = req.body;

    checkEmptyValue(email.trim(), 'Email value cannot be empty');
    checkEmptyValue(password.trim(), 'Password value cannot be empty');

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length === 0) {
        return res.status(404).send('This email not found');
    } else {
        const passwordResult = bcrypt.compareSync(password, userInDb[0].password);

        if (passwordResult) {
            const jwtKey = process.env.JwtKey;
            const token = jwt.sign({
                email: userInDb[0].email,
                id: userInDb[0].id,
            }, jwtKey, {expiresIn: 60 * 60 * 24 * 30});

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

    checkEmptyValue(accessToken.trim(), 'AccessToken value cannot be empty');

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
    const {accessToken} = req.body;
    checkEmptyValue(accessToken.trim(), 'AccessToken value cannot be empty');

    return res.send(true);
}]);

module.exports = router;
