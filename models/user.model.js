const mongoose = require('mongoose');
const dbConnection = require('../db/db.js').get();
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 25,
    min: 2
  },
  lastName: {
    type: String,
    required: true,
    max: 35,
    min: 2
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: 40,
    min: 3
  },
  password: {
    type: String,
    required: true,
    max: 40,
    min: 8,
    select: false
  },
  avgRating: {
    type: Number,
    default: -1,
    min: -1,
    max: 10
  },
  bio: {
    type: String,
    max: 255
  },
  url: {
    type: String,
    max: 150
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  toObject: {
    transform: function(doc, ret) {
      delete ret.password;
    }
  },
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
    }
  }
});

UserSchema.statics.login = function(username, password) {
  return this.findOne({
    username: username.toLowerCase()
  }, '+password').exec().then(function(user) {
    if (user) {
      return user.comparePassword(password).then(function(isMatch) {

        return isMatch ? stripPassword(user) : null;

      });
    } else {
      return Promise.resolve(null);
    }
  });
};

UserSchema.statics.signup = function(user) {
  user.username = user.username.toLowerCase();
  return user.save().then(user => {
    const newUser = stripPassword(user);
    console.log(newUser);
    return stripPassword(newUser);
  });
};

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({
    username: username.toLowerCase()
  }).exec().then(function(user) {

    if (user) {
      return stripPassword(user);
    } else {
      //console.log('findbyUserName', user);
      return null;
    }

  });
};

UserSchema.statics.updateInfo = function(user) {

  return this.findByIdAndUpdate(user._id, {
    '$set': {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      url: user.url
    }
  }, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true
  }).exec();
};

UserSchema.statics.findByUserId = function(id) {
  return this.findOne({
    _id: id
  }).exec().then(stripPassword);
};

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


UserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

function stripPassword(user) {

  if (user) {
    //const newUser = user.toObject();
    delete user.password;
    return user;
  } else {
    return null;
  }
}

module.exports = dbConnection.model('User', UserSchema);
