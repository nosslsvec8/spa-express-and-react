const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false});

router.get("/user || /users", async (req, res) => {
    res.send(await User.getAllUsers());
});
router.post('/user', (req, res) => {
    res.send('Create user');
});
router.put('/user', (req, res) => {
    res.send('Update user');
});
router.delete('/user', [checkAuth, async (req, res) => {
    try {
        await User.deleteUser(req.body.email);
        res.status(410).send('User deleted');
    } catch (error) {
        return res.status(400).send(`Delete error - ${error}`);
    }
}]);

module.exports = router;
