const jwt = require('jsonwebtoken');

module.exports = function createJwtTokenStr(email, id) {
    const jwtKey = process.env.JwtKey;
    return jwt.sign({
        email: email,
        id: id,
    }, jwtKey, {expiresIn: 60 * 60 * 24 * 30});
};
