const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
    res.send('Get all posts');
});
router.get('/posts/:id', (req, res) => {
    res.send(`Get ${req.params.id} post`);
});
router.post('/posts', (req, res) => {
    res.send('Create post');
});
router.put('/posts/:id', (req, res) => {
    res.send(`Update ${req.params.id} post`);
});
router.delete('/posts/:id', (req, res) => {
    res.send(`Delete ${req.params.id} post`);
});

module.exports = router;
