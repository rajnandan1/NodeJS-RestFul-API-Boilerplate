var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../../app/models/user');
module.exports = function (passport) {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = config.get('secret');
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        User.findOne({
            id: jwt_payload.id
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};