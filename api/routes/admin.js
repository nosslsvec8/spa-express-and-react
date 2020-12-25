const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.send('Get admin');
});
router.post('/admin', (req, res) => {
    res.send('Create admin');
});
router.put('/admin', (req, res) => {
    res.send('Update admin');
});
router.delete('/admin', (req, res) => {
    res.send('Delete admin');
});

module.exports = router;
