const router = require('express').Router();

router.get('/uploads/:path([\\w\\W]+)', (req, res) => {
    const {params: {path}} = req;
    res.sendFile('/uploads/' + path, {root: './'});
});

module.exports = router;
