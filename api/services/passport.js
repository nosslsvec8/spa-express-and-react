const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = passport => {
    passport.use(
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JwtKey
        }, async (payload, done) => {
            try {
                const user = await User.findById(payload.id);

                (user) ? done(null, user) : done(null, false);
            } catch (error) {
                return done(null, false, { message: 'JwtStrategy error:', error: error });
            }
        })
    )
};
