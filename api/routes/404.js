const express = require('express');
const router = express.Router();

router.use(function (req, res) {
    res.send(404, 'Page not found!');
});

module.exports = router;
