const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.send('Get user');
});
router.post('/user', (req, res) => {
    res.send('Create user');
});
router.put('/user', (req, res) => {
    res.send('Update user');
});
router.delete('/user', (req, res) => {
    res.send('Delete user');
});

module.exports = router;
