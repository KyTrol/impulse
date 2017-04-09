const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, required: true }
});

module.exports = mongoose.model('Rating', RatingSchema);










