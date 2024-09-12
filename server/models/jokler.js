const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: [public, private, physcopaths-only],
    },
    content: {
        type: String,
        required: false,
    },
    image: {
        type: Buffer,
        required: false,
    },
    date: Date,
    dislikes: Number,
    rejokles: Number,
    madeBy: {
        type: mongoose.isValidObjectId, 
        ref: 'User',
    }
});

module.exports = mongoose.model('Post', PostSchema);