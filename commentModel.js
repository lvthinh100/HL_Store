const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    rating: Number,
    username: String,
});
module.exports = mongoose.model('comment', commentSchema);
