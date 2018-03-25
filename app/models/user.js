var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema = new Schema({
   email: {
      type: String,
      unique: [true, 'Email Already Exists'],
      required: [true, 'Email field is required']
   },
   password: {
      type: String,
      required: [true, 'Password field is required']
   },
   name: {
      type: String,
      required: false,
      default: "Enter your name"
   }
}, {
   timestamps: true
});
UserSchema.pre('save', function(next) {
   var user = this;
   if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function(err, salt) {
         if (err) {
            return next(err);
         }
         bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
               return next(err);
            }
            user.password = hash;
            next();
         });
      });
   } else {
      return next("Conflict");
   }
});

UserSchema.methods.comparePassword = function(passw, cb) {
   bcrypt.compare(passw, this.password, function(err, isMatch) {
      if (err) {
         return cb(err);
      }
      cb(null, isMatch);
   });
};
UserSchema.methods.toJSON = function() {
   var obj = this.toObject();
   delete obj.__v
   delete obj.password
   return obj
}

const User = mongoose.model('user', UserSchema, 'users');

module.exports = User;

User.getFull = function(id) {
   return new Promise((resolve, reject) => {
      User.findOne({
         _id: id
      }).lean().then(function(user) {
         if (!user) {
            reject({
               status: 404,
               message: messages.httpCodes(404)
            });
         } else {
            delete user.__v
            delete user.password
            resolve(user);

         }
      }, function(err) {
         reject(err)
      })
   })
}