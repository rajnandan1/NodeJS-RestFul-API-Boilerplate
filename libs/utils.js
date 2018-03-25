var Utils = module.exports = {};



Utils.minLenght = function(pass, mn) {
   return pass.length >= mn;
}

Utils.makeSalt = function(pass, mn) {
   var text = "";
   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

   return text;
}


Utils.validateSignup = function(req, res, next) {
   req.checkBody("email", messages.users.post.email).notEmpty().isEmail();
   req.checkBody("password", messages.users.post.password).notEmpty().isLength({
      min: 6,
      max: 15
   });
   req.checkBody("name", messages.users.post.name).optional().isLength({
      min: 3,
      max: 50
   });

   var errors = req.validationErrors();
   if (!errors) next();
   else {
      errors.status = 422;
      next(errors);
   }
}


Utils.validateSignIn = function(req, res, next) {
   req.checkBody("email", messages.users.post.email).notEmpty().isEmail();
   req.checkBody("password", messages.users.post.password).notEmpty().isLength({
      min: 6,
      max: 15
   });

   var errors = req.validationErrors();
   if (!errors) next();
   else {
      errors.status = 422;
      next(errors);
   }
}