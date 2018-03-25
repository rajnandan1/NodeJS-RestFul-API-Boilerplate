var jwt = require('jwt-simple');
require('../config/helpers/passport')(passport);
var User = require("../app/models/user");
var exports = module.exports = {};
exports.authenticate = function() {

   return passport.authenticate('jwt', {
      session: false
   })

};
var getToken = function(headers) {

   if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
         return parted[1];
      } else {
         return null;
      }
   } else {
      return null;
   }
}
exports.authCheck = function(req, res, next) {
   var token = getToken(req.headers);
   if (token) {
      var decoded = jwt.decode(token, config.get('secret'));
      User.getFull(decoded).then(function(s) {
         res.locals.user = s;
         next();
      }, function(err) {
         next(err)
      })

   } else {
      logger.error('No token provided.');
      next({
         status: 404,
         message: "User Does not exits"
      });
   }
};