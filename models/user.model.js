const mongoose = require('mongoose');
const dbConnection = require('../db/db.js').get();
const Rating = require('./rating.model');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    firstName: { type: String, required: true, max: 25, min: 2 },
    lastName: { type: String, required: true, max: 35, min: 2 },
    username: { type: String, required: true, unique: true, max: 40, min: 3 },
    password: { type: String, required: true, max: 40, min: 8 },
    avgRating: { type: Number, default: -1 },
    bio: { type: String, max: 255},
    url: { type: String, max: 150 },
    created: { type: Date, default: Date.now }
});

UserSchema.statics.login = function(username, password) {
    return this.findOne({username: username.toLowerCase()}).exec().then(function(user) {
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
    return user.save();
};

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username: username.toLowerCase() }).exec().then(function(user) {
        
        if (user) {
            return stripPassword(user);
        } else {
            //console.log('findbyUserName', user);
            return null;
        }
        
    });
};

UserSchema.statics.findById = function(id) {
    return this.findOne({ _id: id }).exec().then(stripPassword);
}

UserSchema.methods.rate = function(rating) {
    return rating.save();
};

UserSchema.methods.getRatingsFor = function() {
    return Rating.findAll({ reviewedUser: this._id }).exec();
};

UserSchema.methods.getRatingsBy = function() {
    return Rating.findAll({ reviewingUser: this._id }).exec();
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
        delete user.password;
        return user;
    } else {
        return null;
    }
}

module.exports = dbConnection.model('User', UserSchema);