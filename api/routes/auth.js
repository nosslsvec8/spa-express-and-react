const router = require('express').Router();
const passport = require('../services/passport');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

router.post('/auth/register', async (req, res, next) => {
    const {email, password, name} = req.body;

    notEmpty(!email.trim(), 'Enter email');
    notEmpty(!password.trim(), 'Enter password');
    notEmpty(!name.trim(), 'Enter name');

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

router.post('/auth/login', (req, res) =>
    passport.authenticate(
        'local',
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (err, user, trace) => {
            if (err || !user) {
                throw new Error(trace.message || 'Authentication error');
            }

            // Generate token for user and actualize:
            user.token = uuidv4();
            await User.updateUser(user);

            res.send({ token: user.token });
        },
)(req, res),
);

function notEmpty(value, ErrorText) {
    return (!value) ? 1 : res.status(400).send(ErrorText);
}

module.exports = router;
