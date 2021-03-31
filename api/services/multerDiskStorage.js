const multer = require('multer');

module.exports = multer.diskStorage({
    destination: `${__dirname}/..\\uploads`,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now())
    }
});
