var User = require("../models/user");
var randomstring = require("randomstring");
var async = require('async');


module.exports = function(router) {
   'use strict';
   // for getting a user by id, url /api/users/:user_id
   router.route('/:id')
      .get(function(req, res, next) {
         var uid = req.params.id;
         User.findOne({
            _id: uid
         }).then(function(user) {
            if (!user) {
               next({
                  status: 404,
                  message: messages.httpCodes(404)
               });
            } else {
               res.json({
                  error: user ? false : true,
                  data: user
               });
            }
         })

      });
   router.route('/')
      .get(auth.authenticate(), auth.authCheck, function(req, res, next) {
         res.json({
            error: false,
            data: res.locals.user
         });
      }).post(Utils.validateSignup, function(req, res, next) {
         var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
         });
         newUser.save(function(err) {
            try {
               if (err) {
                  err.status = 409;
                  next(err);
               } else {
                  res.status(201);
                  res.json({
                     error: false,
                     data: newUser
                  });
               }
            } catch (e) {
               console.log(e.message);
               next(e);
            };
         });
      });
};