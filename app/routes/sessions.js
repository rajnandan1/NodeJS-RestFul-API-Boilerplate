var User = require("../models/user");
var jwt = require('jwt-simple');

module.exports = function (router) {
    // This will handle the url calls for /api/sessions
    router.route('/')
        .get(function (req, res, next) {
            res.status(200).send("Will be used to get sessions");
        }).put(auth.authenticate(), auth.authCheck, function (req, res, next) {
            res.json({
                method: 'put'
            })
        }).post(Utils.validateSignIn, function (req, res, next) {
            User.findOne({
                email: req.body.email
            }).then(function (user) {
                if (!user) {
                    next({
                        status: 401,
                        message: messages.httpCodes(401)
                    })

                } else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {

                            var token = jwt.encode(user._id, config.get('secret'));
                            res.json({
                                error: false,
                                token: 'Bearer ' + token,
                                data: user
                            });
                        } else {
                            next({
                                status: 401,
                                message: messages.httpCodes(401)
                            })

                        }

                    });
                }

            }, function (err) {
                next(err)
            })

        });
}
