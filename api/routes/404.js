const router = require('express').Router();

router.use(function (req, res) {
    res.send(404, 'Page not found!');
});

module.exports = router;
