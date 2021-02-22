const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/auth/register', async (req, res, next) => {
    const {email, password, name} = req.body;

    checkEmptyValue(email.trim(), 'Email value cannot be empty');
    checkEmptyValue(password.trim(), 'Password value cannot be empty');
    checkEmptyValue(name.trim(), 'Name value cannot be empty');

    const userInDb = await User.findByEmail(email.trim());

    if (userInDb.length !== 0) {
        return res.status(400).send('This email already exists');
    } else {
        try {
            await User.createUser(email, password, name);
            res.status(201).send('Registration completed successfully');
        } catch (error) {
            return next(res.status(400).send(`Registration error - ${error}`));
        }
    }
});

router.post('/auth/login', async (req, res) => {
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
            }, jwtKey, {expiresIn: 60*60*24});

            await User.updateToken(userInDb[0].id, token);
            return res.status(200).send('Authorization was successful');
        } else {
            return res.status(401).send('Passwords do not match');
        }
    }
});

function checkEmptyValue(value, ErrorText) {
    return (value) ? 1 : res.status(400).send(ErrorText);
}

module.exports = router;