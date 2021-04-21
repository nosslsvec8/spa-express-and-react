const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const checkAcl = require('../middleware/checkAcl');
const checkAuth = passport.authenticate('jwt', {session: false});
const validator = require('../middleware/validator');

router.post("/getUser", [checkAuth, validator({
    accessToken: ['required']
}), async (req, res) => {
    res.send(await User.findByToken(req.body.accessToken));
}]);
router.get("/user/:id", async (req, res) => {
    res.send(await User.findById(req.params.id));
});
router.get("(/user|/users)", async (req, res) => {
    res.send(await User.getAllUsers());
});
router.post('/user', [checkAuth, checkAcl([
    {permission: "createAnyUser"},
]), validator({
    email: ['required', 'email', `unique:${User.tableName}:create`],
    password: ['required', 'min:6', 'max:60'],
}), (req, res) => {
    res.send('Create user');
}]);
router.put("(/user/:id|/users/:id)", [checkAuth, checkAcl([
    {permission: "updateAnyUser"},
    {permission: "updateOwnUser", checkAuthor: true, table: User.tableName, column: 'id'}
]), validator({
    email: ['required', 'email', `unique:${User.tableName}:update`],
    name: ['required', 'min:4', 'max:60'],
}), async (req, res) => {
    const {id, email, name, phone, university} = req.body;
    const user = await User.findById(id);
    if (user.length !== 0) {
        try {
            await User.updateUser({id, email, name, phone, university});
            res.status(200).send('User password updated');
        } catch (error) {
            return res.status(400).send(`Updated error - ${error}`);
        }
    } else {
        return res.status(400).send('User with this number was not found');
    }
}]);
router.delete("(/user/:id|/users/:id)", [checkAuth, checkAcl([
    {permission: "deleteAnyUser"},
    {permission: "deleteOwnUser", checkAuthor: true, table: User.tableName, column: 'id'}
]), async (req, res) => {
    try {
        await User.deleteUser(req.body.email);
        res.status(410).send('User deleted');
    } catch (error) {
        return res.status(400).send(`Delete error - ${error}`);
    }
}]);

module.exports = router;
