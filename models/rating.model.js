const mongoose = require('mongoose');
const dbConnection = require('../db/db.js').get();
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId; 

const RatingSchema = new Schema({
    review: { type: String },
    rating: { type: Number, required: true },
    reviewingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
});

RatingSchema.statics.rate = function(rating) {
    return rating.save();
};

RatingSchema.statics.getRatingsFor = function(userId) {
    return this.find({ reviewedUser: new Object(userId) }).exec();
};

RatingSchema.statics.getRatingsBy = function(userId) {
    return this.find({ reviewingUser: new Object(userId) }).exec();
};

RatingSchema.statics.insertRating = function(rating) {
    console.log(new ObjectId(rating.reviewUser));
    return this.findOneAndUpdate({ 
            reviewedUser: new ObjectId(rating.reviewedUser), 
            reviewingUser: new ObjectId(rating.reviewingUser)
        },
        {
          '$set': {
                rating: rating.rating,
                review: rating.review
            }  
        },
        { 
            upsert: true, 
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true
        }
    ).exec();
};


module.exports = dbConnection.model('Rating', RatingSchema);










