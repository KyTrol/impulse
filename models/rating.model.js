const mongoose = require('mongoose');
const dbConnection = require('../db/db.js').get();
const User = require("./user.model.js");
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId; 

const RatingSchema = new Schema({
    review: { type: String },
    rating: { type: Number, required: true, max: 20, min: -1 },
    reviewingUser: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedUser: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
});

RatingSchema.statics.getRatingsFor = function(userId) {
    return this.find({ reviewedUser: new Object(userId) })
                    .populate('reviewingUser reviewedUser')
                    .exec();
};

RatingSchema.statics.getRatingsBy = function(userId) {
    return this.find({ reviewingUser: new Object(userId) })
                    .populate('reviewingUser reviewedUser')
                    .exec();
};

RatingSchema.statics.insertRating = function(rating) {
    
    const schema = this;
    
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
    ).populate("reviewedUser").populate("reviewingUser").exec().then(function(savedRating) {

        schema.where({ reviewedUser: savedRating.reviewedUser._id }).count().then(count => {
            const newAverage = calculateAverage(
                count, 
                savedRating.reviewedUser.avgRating, 
                savedRating.rating, 
                savedRating.reviewedUser.avgRating
            );
            
            User.update({ _id: savedRating.reviewedUser._id }, { "$set": { avgRating: newAverage }})
                .exec().then(val => {
                   console.log("Returned from user update:", val); 
                });
        });
        
       return rating; 
    });
};

function calculateActualRating(newRating, userAvarage) {
    const scale = (userAvarage - 5) * 0.06666;
    return (newRating * (1 + scale));
}

function calculateAverage(count, average, newVal, raterAverage) {
    
    average = average < 0 ? 0 : average;
    
    if (raterAverage <= 5) {
        return average + ((newVal - average)/(count + 1));
    } else if (raterAverage <= 20) {
        const scale = (newVal - 5) * 0.06666;
        return average + (((newVal * (1 + scale)) - average)/(count + 1));
    } else {
        console.error("What?");
    }
    
}


module.exports = dbConnection.model('Rating', RatingSchema);










