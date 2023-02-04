const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", function (next) {

  // this points to this document that is being saved
  const user = this;
  // console.log(user);

  // checks that this is only ran when the user firt signs up
  // Q: WHy dont we need to encrypt the updated password?
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      next(err);
    }
    user.password = hash;
    next();
  });
});

// check password
userSchema.methods.checkPassword = function (attempt, callback) {
  bcrypt.compare(attempt, this.password, (err, isMatch) => {
    // if there was an error, passes it.
    if (err) return callback(err)

    // if pw is valid, callback is called passing in null to say there is no error, and wether the pw is a match via a boolean.
    return callback(null, isMatch)
  })
};

module.exports = mongoose.model("User", userSchema);