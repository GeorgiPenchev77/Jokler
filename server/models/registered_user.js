const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegisteredUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 420,
    },
    profile_picture: {
        type: Buffer,
        required: false,
    },
    banner: {
        type: Buffer,
        required: false,
    },
    biography: {
        type: String,
        required: false,
        maxLength: 150,
    },
    followers: [{
        type: mongoose.isValidObjectId, 
        ref: 'User',
    }],
    following: [{
        type: mongoose.isValidObjectId, 
        ref: 'User',
    }],
    posts: [{
        type: mongoose.isValidObjectId,
        ref: 'Post',
    }],
});

module.exports = mongoose.model('User', RegisteredUserSchema);